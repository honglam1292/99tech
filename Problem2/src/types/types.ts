export type PriceItem = {
  currency: string;
  date: string;
  price: number;
};

export interface CountryType {
  code: string;
  label: string;
  img?: string;
}
