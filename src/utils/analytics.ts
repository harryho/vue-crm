import type { Order, Product, User } from '@/types';

const STATUS_ORDER = ['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled'];
const LOW_STOCK_THRESHOLD = 10;

export type DashboardAnalytics = {
  totalRevenue: number;
  totalOrders: number;
  activeUsers: number;
  lowStockCount: number;
  ordersByStatus: { categories: string[]; series: number[] };
  revenueByCategory: { categories: string[]; series: number[] };
  stockByCategory: { categories: string[]; totalStock: number[]; lowStock: number[] };
  ordersByMonth: { categories: string[]; series: number[] };
  topProductsByRevenue: { label: string; total: number }[];
  recentStatusChanges: { id: string; type: string; title: string; time: string }[];
};

const TIMELINE_TYPE_BY_STATUS: Record<string, string> = {
  pending: 'order1',
  paid: 'order2',
  processing: 'order2',
  shipped: 'order3',
  delivered: 'order4',
  cancelled: 'order5',
};

export function computeDashboardAnalytics(orders: Order[], products: Product[], users: User[]): DashboardAnalytics {
  const variantToProduct = new Map<number, Product>();
  for (const product of products) {
    for (const variant of product.variants) {
      variantToProduct.set(variant.variantId, product);
    }
  }

  const totalRevenue = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.grandTotal, 0);

  const activeUsers = users.filter((u) => u.isActive).length;

  const allVariants = products.flatMap((p) => p.variants);
  const lowStockCount = allVariants.filter((v) => v.quantityOnHand < LOW_STOCK_THRESHOLD).length;

  const statusCounts = new Map<string, number>();
  for (const order of orders) {
    statusCounts.set(order.status, (statusCounts.get(order.status) ?? 0) + 1);
  }
  const presentStatuses = STATUS_ORDER.filter((s) => statusCounts.has(s));
  const ordersByStatus = {
    categories: presentStatuses.map((s) => s.toUpperCase()),
    series: presentStatuses.map((s) => statusCounts.get(s) ?? 0),
  };

  const revenueByCategoryId = new Map<number, number>();
  for (const order of orders) {
    if (order.status === 'cancelled') continue;
    for (const item of order.items) {
      const product = variantToProduct.get(item.variantId);
      if (!product) continue;
      revenueByCategoryId.set(product.categoryId, (revenueByCategoryId.get(product.categoryId) ?? 0) + item.lineTotal);
    }
  }
  const categoryNameById = new Map(products.map((p) => [p.categoryId, p.categoryName]));
  const revenueByCategoryEntries = [...revenueByCategoryId.entries()].sort((a, b) => b[1] - a[1]);
  const revenueByCategory = {
    categories: revenueByCategoryEntries.map(([id]) => categoryNameById.get(id) ?? `Category ${id}`),
    series: revenueByCategoryEntries.map(([, total]) => Math.round(total * 100) / 100),
  };

  const stockByCategoryMap = new Map<string, { totalStock: number; lowStock: number }>();
  for (const product of products) {
    const entry = stockByCategoryMap.get(product.categoryName) ?? { totalStock: 0, lowStock: 0 };
    for (const variant of product.variants) {
      entry.totalStock += variant.quantityOnHand;
      if (variant.quantityOnHand < LOW_STOCK_THRESHOLD) entry.lowStock += 1;
    }
    stockByCategoryMap.set(product.categoryName, entry);
  }
  const stockByCategoryEntries = [...stockByCategoryMap.entries()];
  const stockByCategory = {
    categories: stockByCategoryEntries.map(([name]) => name),
    totalStock: stockByCategoryEntries.map(([, v]) => v.totalStock),
    lowStock: stockByCategoryEntries.map(([, v]) => v.lowStock),
  };

  const ordersByMonthMap = new Map<string, number>();
  for (const order of orders) {
    const monthKey = order.orderedAt.slice(0, 7);
    ordersByMonthMap.set(monthKey, (ordersByMonthMap.get(monthKey) ?? 0) + 1);
  }
  const sortedMonths = [...ordersByMonthMap.keys()].sort();
  const ordersByMonth = {
    categories: sortedMonths,
    series: sortedMonths.map((m) => ordersByMonthMap.get(m) ?? 0),
  };

  const revenueByProductId = new Map<number, number>();
  for (const order of orders) {
    if (order.status === 'cancelled') continue;
    for (const item of order.items) {
      const product = variantToProduct.get(item.variantId);
      if (!product) continue;
      revenueByProductId.set(product.productId, (revenueByProductId.get(product.productId) ?? 0) + item.lineTotal);
    }
  }
  const productNameById = new Map(products.map((p) => [p.productId, p.name]));
  const topProductsByRevenue = [...revenueByProductId.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([id, total]) => ({ label: productNameById.get(id) ?? `Product ${id}`, total: Math.round(total * 100) / 100 }));

  const recentStatusChanges = orders
    .flatMap((order) => order.statusHistory.map((h) => ({ order, h })))
    .sort((a, b) => new Date(b.h.changedAt).getTime() - new Date(a.h.changedAt).getTime())
    .slice(0, 6)
    .map(({ order, h }, index) => ({
      id: `${order.orderId}-${index}`,
      type: TIMELINE_TYPE_BY_STATUS[h.status] ?? 'order1',
      title: `${order.orderNumber} - ${h.status.toUpperCase()}`,
      time: h.changedAt,
    }));

  return {
    totalRevenue: Math.round(totalRevenue * 100) / 100,
    totalOrders: orders.length,
    activeUsers,
    lowStockCount,
    ordersByStatus,
    revenueByCategory,
    stockByCategory,
    ordersByMonth,
    topProductsByRevenue,
    recentStatusChanges,
  };
}
