import { describe, expect, it } from 'vitest';

import type { Order, Product, User } from '@/types';
import { computeDashboardAnalytics } from './analytics';

function buildProduct(overrides: Partial<Product> & Pick<Product, 'productId' | 'categoryId' | 'categoryName'>): Product {
  return {
    name: `Product ${overrides.productId}`,
    slug: `product-${overrides.productId}`,
    isActive: true,
    images: [],
    variants: [],
    ...overrides,
  };
}

function buildOrder(overrides: Partial<Order> & Pick<Order, 'orderId' | 'status' | 'items'>): Order {
  return {
    orderNumber: `ORD-${overrides.orderId}`,
    userId: 1,
    currency: 'USD',
    subtotal: 0,
    discountTotal: 0,
    shippingTotal: 0,
    grandTotal: 0,
    shipTo: {},
    orderedAt: '2024-01-01T00:00:00Z',
    statusHistory: [{ status: overrides.status, changedAt: '2024-01-01T00:00:00Z' }],
    ...overrides,
  };
}

function buildUser(overrides: Partial<User> & Pick<User, 'userId' | 'isActive'>): User {
  return {
    email: `user${overrides.userId}@example.com`,
    passwordHash: 'hash',
    firstName: 'Test',
    lastName: `User${overrides.userId}`,
    addresses: [],
    ...overrides,
  };
}

const products: Product[] = [
  buildProduct({
    productId: 1,
    categoryId: 10,
    categoryName: 'Beverages',
    variants: [
      { variantId: 100, sku: 'SKU-100', name: 'Default', price: 20, currency: 'USD', isActive: true, quantityOnHand: 5 },
    ],
  }),
  buildProduct({
    productId: 2,
    categoryId: 20,
    categoryName: 'Snacks',
    variants: [
      { variantId: 200, sku: 'SKU-200', name: 'Default', price: 10, currency: 'USD', isActive: true, quantityOnHand: 50 },
    ],
  }),
];

const users: User[] = [buildUser({ userId: 1, isActive: true }), buildUser({ userId: 2, isActive: false })];

describe('computeDashboardAnalytics', () => {
  it('excludes cancelled orders from total revenue and category revenue', () => {
    const orders: Order[] = [
      buildOrder({
        orderId: 1,
        status: 'delivered',
        grandTotal: 100,
        items: [{ variantId: 100, productName: 'Product 1', sku: 'SKU-100', unitPrice: 20, qty: 5, discount: 0, lineTotal: 100 }],
      }),
      buildOrder({
        orderId: 2,
        status: 'cancelled',
        grandTotal: 999,
        items: [{ variantId: 200, productName: 'Product 2', sku: 'SKU-200', unitPrice: 10, qty: 10, discount: 0, lineTotal: 999 }],
      }),
    ];

    const result = computeDashboardAnalytics(orders, products, users);

    expect(result.totalRevenue).toBe(100);
    expect(result.totalOrders).toBe(2);
    expect(result.revenueByCategory.categories).toEqual(['Beverages']);
    expect(result.revenueByCategory.series).toEqual([100]);
  });

  it('counts active users and low-stock SKUs', () => {
    const result = computeDashboardAnalytics([], products, users);

    expect(result.activeUsers).toBe(1);
    // product 1's variant has quantityOnHand 5, below the 10-unit threshold
    expect(result.lowStockCount).toBe(1);
  });

  it('ranks top products by revenue across multiple orders', () => {
    const orders: Order[] = [
      buildOrder({
        orderId: 1,
        status: 'paid',
        items: [{ variantId: 200, productName: 'Product 2', sku: 'SKU-200', unitPrice: 10, qty: 3, discount: 0, lineTotal: 30 }],
      }),
      buildOrder({
        orderId: 2,
        status: 'paid',
        items: [{ variantId: 100, productName: 'Product 1', sku: 'SKU-100', unitPrice: 20, qty: 5, discount: 0, lineTotal: 100 }],
      }),
    ];

    const result = computeDashboardAnalytics(orders, products, users);

    expect(result.topProductsByRevenue[0]).toEqual({ label: 'Product 1', total: 100 });
    expect(result.topProductsByRevenue[1]).toEqual({ label: 'Product 2', total: 30 });
  });

  it('sorts recent status changes newest first', () => {
    const orders: Order[] = [
      {
        ...buildOrder({ orderId: 1, status: 'delivered', items: [] }),
        statusHistory: [
          { status: 'pending', changedAt: '2024-01-01T00:00:00Z' },
          { status: 'delivered', changedAt: '2024-01-05T00:00:00Z' },
        ],
      },
    ];

    const result = computeDashboardAnalytics(orders, products, users);

    expect(result.recentStatusChanges[0].title).toContain('DELIVERED');
    expect(result.recentStatusChanges[1].title).toContain('PENDING');
  });
});
