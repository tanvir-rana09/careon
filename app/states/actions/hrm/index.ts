import accessDepartments from "./accessDepartments";
import departments from "./departments";
import designations from "./designations";
import employeeBiography from "./employeeBiography";
import { employeeTypeApi } from "./employeeTypes";
import { employeeTitleApi } from "./employeeTitles";
import employees from "./employees";
import nominees from "./nominees";
import roles from "./roles";
import users from "./users";
import basicEmployeeBiography from "./basicEmployeeBiography";
import employeeBiographyExperience from "./employeeBiographyExperience";
import employeeBiographyTraining from "./employeeBioraphyTraninng";
import employeeBiographyQualification from "./employeeBirographyQualification";

export const hrmApiReducers = {
  [departments.reducerPath]: departments.reducer,
  [designations.reducerPath]: designations.reducer,
  [roles.reducerPath]: roles.reducer,
  [users.reducerPath]: users.reducer,
  [employees.reducerPath]: employees.reducer,
  [nominees.reducerPath]: nominees.reducer,
  [accessDepartments.reducerPath]: accessDepartments.reducer,
  [employeeBiography.reducerPath]: employeeBiography.reducer,
  [employeeTypeApi.reducerPath]: employeeTypeApi.reducer,
  [employeeTitleApi.reducerPath]: employeeTitleApi.reducer,
  [basicEmployeeBiography.reducerPath]: basicEmployeeBiography.reducer,
  [employeeBiographyExperience.reducerPath]:
    employeeBiographyExperience.reducer,
  [employeeBiographyTraining.reducerPath]: employeeBiographyTraining.reducer,
  [employeeBiographyQualification.reducerPath]:
    employeeBiographyQualification.reducer,
};
export const hrmApiMiddleWares = [
  departments.middleware,
  designations.middleware,
  roles.middleware,
  users.middleware,
  employees.middleware,
  nominees.middleware,
  accessDepartments.middleware,
  employeeBiography.middleware,
  employeeTypeApi.middleware,
  employeeTitleApi.middleware,
  basicEmployeeBiography.middleware,
  employeeBiographyExperience.middleware,
  employeeBiographyTraining.middleware,
  employeeBiographyQualification.middleware,
];
