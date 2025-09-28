export type SupplierContactFormType = {
    unique_id: string;
    supplier_id: string;
    name: string;
    phone: string;
    email: string;
    additional: {
        designation: string;
    };
    description: string;
    status: string;
};
