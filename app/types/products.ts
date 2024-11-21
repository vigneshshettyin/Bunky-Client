export interface LubeProduct {
    code: string;
    name: string;
    price: string;
    created_at: string;
    updated_at: string;
}

export interface LubeProductResponse {
    count: number;
    next: string;
    previous: string;
    results: LubeProduct[];
}