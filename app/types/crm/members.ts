/* eslint-disable @typescript-eslint/no-explicit-any */
export type MemberFormType = {
  unique_id: string;
  serial_id: string;
  category_id: string;
  sir_title_id: string;
  name: string;
  additional: {
    title: string;
    fname: string;
    mname: string;
    lname: string;
    father_name: string;
    mother_name: string;
    religion: string;
    gender: string;
    marital_status: string;
    children_count: number;
    blood_group: string;
    nationality: string;
    in_abroad: boolean;
    registration_date: string;
  };
  address: {
    permanent: string;
    residence: string;
    office: string;
    mailing: string;
  };
  contacts: {
    phone: {
      residence: string;
      office: string;
      mobile: string[];
    };
    fax: {
      residence: string;
      office: string;
    };
    email: string;
    website: string;
  };
  qualification: {
    academics: string[];
  };
  charges: {
    held_up: boolean;
    from_date: string | any;
    to_date: string | any;
    credit_limit: { status: boolean; value: number | any };
    service: { status: boolean; value: number | any };
    development: { status: boolean; value: number | any };
    discount: { status: boolean; value: number | any; type: string };
  };
  date: {
    dob: string | any;
    anniversary: string | any;
  };
  attachments: {
    avatar: string;
    signature: string;
  };
  status: string;
};
