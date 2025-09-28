export type UserFormType = {
  unique_id: string;
  serial_id: string;
  role_id: string;
  sir_title_id: string;
  name: string;
  additional: {
    fname: string;
    mname: string;
    lname: string;
    name_bn: string;
  };
  type: string;
  email?: string;
  phone: string;
  password: string;
  attachments: { avatar: string | null; signature: string | null };
  status: string;
  profile: {
    father_name: string;
    husband_name: string;
    mother_name: string;
    address: {
      present: string;
      permanent: string;
      birth: string;
    };
    document: {
      insurance: string;
    };
    blood_group: string;
    nationality: string;
    religion: string;
    dob: string | any;
    mobile: string;
    gender: string;
    marital_status: string;
  };
};

export type UserProfileFormType = {
  father_name: string;
  husband_name: string;
  mother_name: string;
  address: {
    present: string;
    permanent: string;
    birth: string;
  };
  document: {
    insurance: string;
  };
  blood_group: string;
  nationality: string;
  religion: string;
  dob: string | any;
  mobile: string;
  gender: string;
  marital_status: string;
};

export type UserEmployeeFormType = {
  department_id: string;
  designation_id: string;
  level: number | any;
  grade: number | any;
  status: string;
  document: {
    card: string;
    nid: string;
    passport: string;
  };
  date: {
    appoint: string | any;
    joining: string | any;
    confirmed: string | any;
    leaved: string | any;
    leaved_cause: string | any;
  };
  probation: {
    type: string;
    value: string | any;
  };
  payment: {
    type: string;
    name: string;
    number: string;
    branch: string;
    holder: string;
    bank_name: string;
  };
  overtime: boolean;
  roster: boolean;
};

export type UserNomineeFormType = {
  name: string;
  relation: string;
  spouse: string;
  occupation: string;
  phone: string;
  document: {
    passport: string;
  };
  count: { children: string | any; dependents: string | any };
  attachments: { avatar: string | null; signature: string | null };
  status: string;
};
