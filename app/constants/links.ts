export const API_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_API_DEV_URL + "/api/v1/client"
    : import.meta.env.VITE_API_URL + "/api/v1/client";

export const FRONTEND_LINKS = {
  auth: {
    login: "/login",
    register: "/login",
    reset: {
      request: "/reset/request",
      verify: "/reset/verify",
      password: "/reset/password",
    },
  },
  panels: {
    dashboard: "/dashboard",
    manageProducts: {
      products: {
        list: "/manage-products/products",
        create: "/manage-products/products/create",
        edit: "/manage-products/products/:id/edit",
        show: "/manage-products/products/:id/show",
      },
      categories: {
        list: "/manage-products/categories",
        create: "/manage-products/categories/create",
        edit: "/manage-products/categories/:id/edit",
      },
      statuses: {
        list: "/manage-products/statuses",
        create: "/manage-products/statuses/create",
        edit: "/manage-products/statuses/:id/edit",
      },
      inventoryTypes: {
        list: "/manage-products/inventory-types",
        create: "/manage-products/inventory-types/create",
        edit: "/manage-products/inventory-types/:id/edit",
      },
      units: {
        list: "/manage-products/units",
        create: "/manage-products/units/create",
        edit: "/manage-products/units/:id/edit",
      },
      brands: {
        list: "/manage-products/brands",
        create: "/manage-products/brands/create",
        edit: "/manage-products/brands/:id/edit",
      },
      productMapping: {
        list: "/manage-products/product-mapping",
        create: "/manage-products/product-mapping/create",
        edit: "/manage-products/product-mapping/:id/edit",
      },
      productGroup: {
        list: "/manage-products/product-group",
      },
      productSubGroup: {
        list: "/manage-products/product-sub-group",
      },
    },
    inventory: {
      manageSuppliers: {
        suppliers: {
          list: "/inventory/suppliers",
          create: "/inventory/suppliers/create",
          edit: "/inventory/suppliers/:id/edit",
        },
        supplierTypes: {
          list: "/inventory/supplier-types",
          create: "/inventory/supplier-types/create",
          edit: "/inventory/supplier-types/:id/edit",
        },
      },
      requisitions: {
        list: "/inventory/requisitions",
        purchaseCreate: "/inventory/requisitions/purchase-create",
        create: "/inventory/requisitions/create",
        edit: "/inventory/requisitions/:id/edit",
      },
      requests: {
        list: "/inventory/requests",
        create: "/inventory/requests/create",
        edit: "/inventory/requests/:id/edit",
      },
      orders: {
        list: "/inventory/orders",
        create: "/inventory/orders/create",
        edit: "/inventory/orders/:id/edit",
      },
      receives: {
        list: "/inventory/receives",
        create: "/inventory/receives/create",
        edit: "/inventory/receives/:id/edit",
      },
      productDistribution: {
        list: "/inventory/product-distribution",
        create: "/inventory/product-distribution/create",
        edit: "/inventory/product-distribution/:id/edit",
      },
      productReturnToSupplier: {
        list: "/inventory/product-return-to-supplier",
        create: "/inventory/product-return-to-supplier/create",
      },
      damageLossReturn: {
        list: "/inventory/damage-loss-return",
        create: "/inventory/damage-loss-return/create",
      },
      productReturnToStoreFromDepartment: {
        list: "/inventory/product-return-to-store-from-department",
        create: "/inventory/product-return-to-store-from-department/create",
      },
      damageLossExpiredProductEntry: {
        list: "/inventory/damage-loss-expired-product-entry",
        create: "/inventory/damage-loss-expired-product-entry/create",
      },
      warehouse: {
        list: "/inventory/warehouse",
        create: "/inventory/warehouse/create",
        edit: "/inventory/warehouse/:id/edit",
      },
      productionReceive: {
        list: "/inventory/production-receive",
        create: "/inventory/production-receive/create",
        // edit: "/inventory/warehouse/:id/edit",
      },
      productComsumption: {
        list: "/inventory/product-consumption",
        create: "/inventory/product-consumption/create",
        // edit: "/inventory/warehouse/:id/edit",
      },
      report: {
        index: "/inventory/report",
      },
    },
    pointOfSale: {
      sales: {
        list: "/pos/sales",
        create: "/pos/sales/create",
        report: "/pos/sales/report",
        edit: "/pos/sales/:id/edit",
        kotBot: "/pos/kot-bot",
        dailyReport: "/pos/daily-report",
      },

      manageSuppliers: {
        suppliers: {
          list: "/pos/suppliers",
          create: "/pos/suppliers/create",
          edit: "/pos/suppliers/:id/edit",
        },
        supplierTypes: {
          list: "/pos/supplier-types",
          create: "/pos/supplier-types/create",
          edit: "/pos/supplier-types/:id/edit",
        },
      },
      requisitions: {
        list: "/pos/requisitions",
        create: "/pos/requisitions/create",
        edit: "/pos/requisitions/:id/edit",
      },
      requests: {
        list: "/pos/requests",
        create: "/pos/requests/create",
        edit: "/pos/requests/:id/edit",
      },
      orders: {
        list: "/pos/orders",
        create: "/pos/orders/create",
        edit: "/pos/orders/:id/edit",
      },
      receives: {
        list: "/pos/receives",
        create: "/pos/receives/create",
        edit: "/pos/receives/:id/edit",
      },
    },
    customerRelationManagement: {
      members: {
        list: "/crm/members",
        create: "/crm/members/create",
        edit: "/crm/members/:id/edit",
        show: "/crm/members/:id/show",
      },
      membersInformationView: {
        list: "/crm/members-information-view",
        report: "/crm/members/report",
      },
      membershipTransfers: {
        list: "/crm/membership-transfers",
        create: "/crm/membership-transfers/create",
        edit: "/crm/membership-transfers/:id/edit",
      },
      categories: {
        list: "/crm/categories",
        create: "/crm/categories/create",
        edit: "/crm/categories/:id/edit",
      },
      titles: {
        list: "/crm/titles",
        create: "/crm/titles/create",
        edit: "/crm/titles/:id/edit",
      },
      expireTypes: {
        list: "/crm/expire-types",
        create: "/crm/expire-types/create",
        edit: "/crm/expire-types/:id/edit",
      },
      payments: {
        list: "/crm/payments",
      },
      memberTypes: {
        list: "/crm/members-type",
        create: "/crm/members-types/create",
        edit: "/crm/members-types/:id/edit",
      },
      memberTitles: {
        list: "/crm/members-title",
        create: "/crm/members-titles/create",
        edit: "/crm/members-titles/:id/edit",
      },
    },
    humanResourceManagement: {
      employees: {
        list: "/hrm/employees",
        create: "/hrm/employees/create",
        edit: "/hrm/employees/:id/edit",
        show: "/hrm/employees/:id/show",
      },
      departments: {
        list: "/hrm/departments",
        create: "/hrm/departments/create",
        edit: "/hrm/departments/:id/edit",
      },
      designations: {
        list: "/hrm/designations",
        create: "/hrm/designations/create",
        edit: "/hrm/designations/:id/edit",
      },
      employeeBiography: {
        list: "/hrm/employee-biography",
        create: "/hrm/employee-biography/create",
        edit: "/hrm/employee-biography/:id/edit",
      },
      roles: {
        list: "/hrm/roles",
        create: "/hrm/roles/create",
        edit: "/hrm/roles/:id/edit",
      },
      employeeTypes: {
        list: "/hrm/employee-types",
        create: "/hrm/employee-types/create",
        edit: "/hrm/employee-types/:id/edit",
      },
      employeeTitles: {
        list: "/hrm/employee-titles",
        create: "/hrm/employee-titles/create",
        edit: "/hrm/employee-titles/:id/edit",
      },
    },
    accounts: {
      chartOfAccounts: {
        list: "/accounts/chart-of-accounts",
        create: "/accounts/chart-of-accounts/create",
        edit: "/accounts/chart-of-accounts/:id/edit",
      },
      expenses: {
        list: "/accounts/expenses",
      },
      memberPayments: {
        list: "/accounts/member-payments",
      },
      vouchers: {
        cash: {
          receive: "/accounts/voucher/cash-receive",
          index: "/accounts/voucher",
          edit: "/accounts/voucher/:id/edit",
          view: "/accounts/voucher/:id",
          create: "/accounts/voucher/create",
        },
        report: {
          index: "/accounts/voucher-report",
        },
        trialBalance: {
          index: "/accounts/trial-balance",
        },
        incomeStatement: {
          index: "/accounts/income-statement",
        },
        balanceSheet: {
          index: "/accounts/balance-sheet",
        },
      },
      bank: {
        receive: "/accounts/bank",
      },
    },
    hotelManagement: {
      guests: {
        list: "/hotel-management/guests",
        create: "/hotel-management/guests/create",
        edit: "/hotel-management/guests/:id/edit",
      },
      checkIn: {
        list: "/hotel-management/check-in",
        create: "/hotel-management/check-in/create",
        edit: "/hotel-management/check-in/:id/edit",
      },
      checkOut: {
        list: "/hotel-management/check-out",
        create: "/hotel-management/check-out/create",
        edit: "/hotel-management/check-out/:id/edit",
      },
      reservations: {
        list: "/hotel-management/reservations",
        create: "/hotel-management/reservations/create",
        edit: "/hotel-management/reservations/:id/edit",
      },
      transfers: {
        list: "/hotel-management/membership-transfers",
        create: "/hotel-management/membership-transfers/create",
        edit: "/hotel-management/membership-transfers/:id/edit",
      },
      salesReport: {
        list: "/hotel-management/sales-report",
      },
    },
    system: {
      voucherConfigures: "/system/voucher-configures",
      siteConfig: "/system/site-config",
      permissions: "/system/permissions",
      roles: "/system/roles",
      printers: "/system/printer-setup",
      sirTitles: {
        list: "/system/sir-titles",
      },
    },
    cashCard: {
      entries: {
        list: "/refill-smart-cards/entries",
        create: "/refill-smart-cards/entries/create",
        edit: "/refill-smart-cards/entries/:id/edit",
      },
      issue: "/refill-smart-cards/issue",
      block: "/refill-smart-cards/block",
      refill: "/refill-smart-cards/refill",
      return: "/refill-smart-cards/return",
      report: "/refill-smart-cards/report",
      virtual: "/refill-smart-cards/virtual-card",
    },
    payroll: {
      salaryMaking: {
        create: "/payroll/salary-making",
      },
      allowanceEntry: {
        create: "/payroll/allowance-entry",
      },
      deductionEntry: {
        create: "/payroll/deduction-entry",
      },
      pfLoanIssue: {
        create: "/payroll/pf-loan-issue",
      },
      pfLoanAdjustment: {
        create: "/payroll/pf-loan-adjustment",
      },
      pfLoanCategories: {
        create: "/payroll/pf-loan-categories",
      },
      pfLoanCashAdjustment: {
        create: "/payroll/pf-loan-cash-adjustment",
      },
      pfLoanAdjustDetails: {
        create: "/payroll/pf-loan-adjust-details",
      },
      clubFundLoan: {
        create: "/payroll/club-fund-loan",
      },
      clubFundLoanAdjustment: {
        create: "/payroll/club-fund-loan-adjustment",
      },
      clubFundLoanAdjustDetails: {
        create: "/payroll/club-fund-loan-adjust-details",
      },
      profidentFundGeneralLedger: {
        create: "/payroll/profident-fund-general-ledger",
      },
      profidentFundClosingEntry: {
        create: "/payroll/profident-fund-closing-entry",
      },
      payscale: {
        index: "/payroll/payscale",
      },
      overTimeEntry: {
        create: "/payroll/over-time-entry",
      },
      bonus: {
        create: "/payroll/bonus/create",
        edit: "/payroll/bonus/:id/edit",
        index: "/payroll/bonus",
      },
      typeOfAllowanceAndDeduction: {
        create: "/payroll/type-of-allowance-and-deduction",
      },
      employeeWiseBasicAllowanceDeductionSetup: {
        create: "/payroll/employee-wise-basic-allowance-deduction-setup",
      },
      providentFundLedgerInterestEntry: {
        create: "/payroll/provident-fund-ledger-interest-entry",
      },
      providentFundReport: {
        create: "/payroll/provident-fund-report",
      },
    },
    attendance: {
      employeeIdWiseManualAttendance: {
        create: "/attendance/employee-id-wise-manual-attendance",
        index: "/attendance/employee-id-wise-manual-attendance/list",
      },
      lateConsideration: {
        create: "/attendance/late-consideration",
      },
      extraPunchDelete: {
        create: "/attendance/extra-punch-delete",
      },
      holidayCalenderSetup: {
        create: "/attendance/holiday-calender-setup",
      },
      shiftSetup: {
        create: "/attendance/shift-setup",
      },
      leave: {
        leaveEntry: {
          index: "/attendance/leave/leave-entry",
          create: "/attendance/leave/leave-entry/create",
        },
        leave: {
          index: "/attendance/leave/leave-form",
          create: "/attendance/leave/leave-form/create",
        },
        leaveDetails: {
          create: "/attendance/leave/leave-details",
        },
        openingLeaveEntry: {
          create: "/attendance/leave/opening-leave-entry",
        },
        leaveReport: {
          create: "/attendance/leave/leave-report",
        },
        leaveInlieuEntry: {
          create: "/attendance/leave/leave-inlieu-entry",
        },
        leaveEncashment: {
          create: "/attendance/leave/leave-encashment",
        },
        leaveForm: {
          create: "/attendance/leave/leave-form",
        },
        leaveSetup: {
          create: "/attendance/leave/leave-setup",
        },
      },
      gracePeriodSetup: {
        create: "/attendance/grace-period-setup",
      },
      attendanceDeviceDatabaseSynchronization: {
        create: "/attendance/attendance-device-database-synchronization",
      },
      rosterSetup: {
        create: "/attendance/roster-setup",
      },
    },
  },
};
