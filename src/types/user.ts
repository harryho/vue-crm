export type Address = {
  label: string;
  line1: string;
  line2?: string;
  city: string;
  region?: string | null;
  postalCode?: string;
  countryCode: string;
  isDefaultShipping: boolean;
  isDefaultBilling: boolean;
};

export type User = {
  userId: number;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  companyName?: string;
  phone?: string;
  avatarUrl?: string;
  isActive: boolean;
  addresses: Address[];
};
