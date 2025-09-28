export type MembershipFormType = {
  member_id: string;
  type_id: string;
  club_name: string;
  club_address: {
    street: string;
    city: string;
    country: string;
  };
  position: string;
  membership_date: string | any;
  start_at: string | any;
  end_at: string | any;
  additional: {
    other_club: string;
    institute: string;
    in_abroad: boolean;
  };
};
