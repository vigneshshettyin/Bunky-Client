export interface LubeProduct {
    id: number;
    code: string;
    name: string;
    price: string;
    updated_at: string;
}

export interface LubeProductResponse {
    count: number;
    next: string;
    previous: string;
    results: LubeProduct[];
}