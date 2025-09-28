export type ProductBasicFormType = {
    unique_id: string;
    name: string;
    additional: {
        name_bn: string;
    };
    description: string;
    sku: string;
    size: string;
    is_bundle: boolean;
    has_recipe: boolean;
    held_up: boolean;
    product_type: boolean;
    barcode: {
        software: string;
        product: string;
    };
    price: {
        wholesale: string | number;
        cost: string | number;
        retail: string | number;
        retail_manual: boolean;
    };
    discount: {
        type: string;
        amount: string | number;
    };
    service: {
        type: string;
        amount: string | number;
    };
    warranty: {
        status: boolean;
        date: string | any;
    };
    expiry: {
        status: boolean;
        date: string | any;
    };
    charges: {
        vat: {
            type: string;
            amount: string | number;
        };
        commission: {
            type: string;
            amount: string | number;
        };
        supplementary: {
            type: string;
            amount: string | number;
        };
    };
    status: string;
};

export type ProductDependencyFormType = {
    category_id: string;
    brand_id: string;
    status_id: string;
    inventory_type_id: string;
    progress_id: string;
    consumption_id: string;
    purchase_unit_id: string;
    sale_unit_id: string;
    unit_amount: {
        sale: string | number;
        purchase: string | number;
    };
    order_level: {
        max: string | number;
        min: string | number;
        reload: string | number;
        max_allow: string | number;
    };
    fixed_asset: {
        depreciation_rate: string | number;
        salvage: string | number;
        lead_time: string | number;
        life_time: string | number;
        value_add: boolean;
        date: string | any;
    };
};

export type GroupProductFormType = {
    unique_id: string;
    base_product_id: string;
    product_id: string;
    quantity: string | number;
    amount: string | number;
    status: string;
};

export type RecipeProductFormType = {
    unique_id: string;
    base_product_id: string;
    product_id: string;
    quantity: string | number;
    amount: string | number;
    status: string;
};
