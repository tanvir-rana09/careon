export type MemberSpouseFormType = {
    unique_id: string;
    member_id: string;
    name: string;
    email: string;
    phone: string;
    additional: {
        blood_group: string;
    };
    date: {
        dob: string | any;
        anniversary: string | any;
    };
    attachments: {
        avatar: string;
        signature: string;
    };
    credit_limit: number | any;
    status: string;
};
