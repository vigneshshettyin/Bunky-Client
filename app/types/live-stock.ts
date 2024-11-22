export interface LiveStock {
    product_id: number;
    product_name: string;
    remaining_stock: number;
    price_per_item: number;
    total_value: string;
}

export interface LiveStockResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: LiveStock[];
    total_value: string;
}