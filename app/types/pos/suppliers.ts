export type SupplierFormType = {
    unique_id: string;
    type_id: string;
    name: string;
    address: {
        street: string;
        city: string;
        country: string;
        region: string;
        zip_code: string;
    };
    email: string;
    phone: string;
    additional: {
        alternate_phone: string[];
        website: string;
        fax: string;
    };
    description: string;
    payment_type: string;
    status: string;
};
