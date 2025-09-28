export const RegularStatuses = [
    { title: "Active", value: "active" },
    { title: "Inactive", value: "inactive" },
];
export const BooleanStatuses = [
    { title: "Yes", value: true },
    { title: "No", value: false },
];
export const ChartOfAccountTypes = [
    { title: "Credit", value: "credit" },
    { title: "Debit", value: "debit" },
];

export const AmountTypes = [
    { title: "Percentage", value: "percentage" },
    { title: "Flat", value: "flat" },
];

export const AcademicQualifications = [
    { title: "PSC", value: "psc" },
    { title: "JSC", value: "jsc" },
    { title: "SSC", value: "ssc" },
    { title: "HSC", value: "hsc" },
    { title: "BSC", value: "bsc" },
    { title: "BBA", value: "bba" },
    { title: "BA", value: "ba" },
    { title: "MSC", value: "msc" },
    { title: "MBA", value: "mba" },
    { title: "MA", value: "ma" },
];

export const UserTitles = [
    { title: "Dr", value: "dr" },
    { title: "Engr.", value: "engr." },
    { title: "Md", value: "md" },
    { title: "Miss", value: "miss" },
    { title: "Mr", value: "mr" },
    { title: "Mrs", value: "mrs" },
    { title: "Ms", value: "ms" },
];

export const UserTypes = [
    { title: "General Staff", value: "general" },
    { title: "Management Staff", value: "management" },
];

export const Genders = [
    { title: "Male", value: "male" },
    { title: "Female", value: "female" },
    { title: "Other", value: "other" },
];

export const Religions = [
    { title: "Islam", value: "islam" },
    { title: "Hindu", value: "hindu" },
    { title: "Christian", value: "christian" },
    { title: "Buddhist", value: "buddhist" },
    { title: "Other", value: "other" },
];

export const BloodGroups = [
    { title: "A+", value: "a+" },
    { title: "AB+", value: "ab+" },
    { title: "AB-", value: "ab-" },
    { title: "B+", value: "b+" },
    { title: "B-", value: "b-" },
    { title: "O+", value: "o+" },
    { title: "O-", value: "o-" },
];

export const MaritalStatuses = [
    { title: "Single", value: "single" },
    { title: "Married", value: "married" },
];

export const OfficeWorkingStatuses = [
    { title: "Casual", value: "casual" },
    { title: "Contractual", value: "contractual" },
    { title: "Held Up", value: "held_up" },
    { title: "Honorary", value: "honorary" },
    { title: "Internee", value: "internee" },
    { title: "Other", value: "other" },
    { title: "Permanent", value: "permanent" },
    { title: "Provisional", value: "provisional" },
    { title: "Resign", value: "resign" },
    { title: "Suspension", value: "suspension" },
    { title: "Temporary", value: "temporary" },
    { title: "Termination", value: "termination" },
];

export const PaymentTypes = [
    { title: "Cash", value: "cash" },
    { title: "Cheque", value: "cheque" },
    { title: "Bank Transfer", value: "bank" },
    { title: "Mobile Banking", value: "mfs" },
];

export const SupplierPayments = [
    { title: "Cash", value: "cash" },
    { title: "After Sale", value: "sale" },
    { title: "Credit", value: "credit" },
    { title: "Bill to Bill", value: "bill" },
    { title: "Service", value: "service" },
    { title: "Other", value: "other" },
];

export const CashVoucherPurposes = [
    { title: "Subscription Charge", value: "subscription" },
];

export const permissions = [
    {
        id: "view_dashboard",
        name: "View Dashboard",
    },
    {
        id: "manage_products",
        name: "Manage Products",
    },
    {
        id: "pos",
        name: "POS",
    },
    {
        id: "crm",
        name: "CRM",
    },
    {
        id: "hrm",
        name: "HRM",
    },
    {
        id: "accounts",
        name: "Accounts",
    },
    {
        id: "hotel_management",
        name: "Hotel Management",
    },
    {
        id: "refill_smart_cash_card",
        name: "Refill Smart Cash Card",
    },
    {
        id: "inventory",
        name: "Inventory",
    },
    {
        id: "payroll",
        name: "Payroll",
    },
    {
        id: "attendance",
        name: "Attendance",
    },
    {
        id: "settings",
        name: "Settings",
    },
];


export const leaveSetupFields = [
  { value: 'sick_leave', label: 'Sick Leave' },
  { value: 'casual_leave', label: 'Casual Leave' },
  { value: 'maternity_leave', label: 'Maternity Leave' },
  { value: 'special_leave', label: 'Special Leave' },
  { value: 'annual_earn_leave', label: 'Annual Earn Leave' },
  { value: 'paternity_leave', label: 'Paternity Leave' },
  { value: 'replacement_leave', label: 'Replacement Leave' },
];


export const reportTypes = [
    {
        label: "Date Wise Sales Summary with Mode of Payment",
        value: "date-wise-sales-summary-with-mode-of-payment",
    },
    {
        label: "Department & Product Wise Sales Report",
        value: "department-product-wise-sales-report",
    },
    {
        label: "Department Wise Sales Report",
        value: "department-wise-sales-report",
    },
    {
        label: "Employees & Product Wise Sales Report",
        value: "employees-product-wise-sales-report",
    },
    {
        label: "Invoice Wise Sales Details",
        value: "invoice-wise-sales-details",
    },
    {
        label: "Invoice Wise Sales Summary",
        value: "invoice-wise-sales-summary",
    },
    {
        label: "Invoice Wise Sales Summary Employee",
        value: "invoice-wise-sales-summary-employee",
    },
    {
        label: "Mode of Payment, Invoice and Department Wise Sales Report",
        value: "mode-of-payment-invoice-department-wise-sales-report",
    },
    {
        label: "Mode of Payment, Invoice and Department Wise Sales Report With Member",
        value: "mode-of-payment-invoice-department-wise-sales-report-with-member",
    },
    {
        label: "Product Wise Sales Details",
        value: "product-wise-sales-details",
    },
    { label: "Product Wise Sales Report", value: "product-wise-sales-report" },
    {
        label: "Sales Statement for Department",
        value: "sales-statement-for-department",
    },
    {
        label: "Sales Statement For Department Staff wise",
        value: "sales-statement-for-department-staff-wise",
    },
];