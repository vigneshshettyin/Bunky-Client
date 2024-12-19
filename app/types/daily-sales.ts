export interface DailySalesRequest {
  startDate: string;
  endDate: string;
  page: number;
  pageSize: number;
  product?: number;
}

export interface DailySales {
  id: number;
  product: number;
  product_name: string;
  product_price: string;
  quantity: number;
  total_price: number;
  date: string;
  created_at: string;
  updated_at: string;
}

export interface DailySalesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: DailySales[];
}
