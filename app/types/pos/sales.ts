export type ProductType = {
    pid: string;
    name: string;
    sku: string;
    price: number;
    manual_price: boolean;
    quantity: number;
    service_type: string;
    service_amount: number;
    discount_type: string;
    discount_amount: number;
    vat_type: string;
    vat_amount: number;
    supplementary_type: string;
    supplementary_amount: number;
    total: number;
};

export type MemberType = {
    name: string;
    unique_id: string;
    attachments: { avatar: string; signature: string } | null;
};

export type EmployeeType = {
    name: string;
    unique_id: string;
    attachments?: { avatar: string; signature: string } | null;
};

export type KotBotType = {
    start_page: number;
    end_page: number;
};