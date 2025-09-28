export type MemberProfessionFormType = {
    member_id: string;
    profession: string;
    company: string;
    address: {
        street: string;
        city: string;
    };
    status: string;
};
