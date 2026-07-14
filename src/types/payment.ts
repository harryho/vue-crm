export type Payment = {
  amount: number;
  currency: string;
  provider: string;
  providerRef?: string;
  status: string;
  createdAt: string;
};
