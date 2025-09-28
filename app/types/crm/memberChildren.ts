export type MemberChildFormType = {
    unique_id: string;
    member_id: string;
    name: string;
    email: string;
    phone: string;
    additional: {
        blood_group: string;
        gender: string;
        dob: string | any;
    };
    attachments: {
        avatar: string;
        signature: string;
    };
    credit_limit: number | any;
    status: string;
};
