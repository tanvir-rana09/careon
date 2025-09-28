import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { API_URL } from "~/constants/links";
import { RootState } from "~/states";

const permissionsApi = createApi({
  reducerPath: "permissionsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      headers.set("Accept", "application/json");
      const state = getState() as RootState;
      const token = state.auth.token ?? Cookies.get("authToken") ?? null;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  keepUnusedDataFor: 5,
  refetchOnReconnect: true,
  tagTypes: ["Company", "Role", "EmployeeRole", "RolePermission", "Printers"],
  endpoints: (builder) => ({
    // Permission endpoints
    fetchPermissions: builder.query({
      query: (params) => `/system/permissions?${params}`,
      transformResponse: (response: { data: any }) => response?.data,
      providesTags: ["Company"],
    }),
    fetchPermission: builder.query({
      query: (id) => `/system/permissions/${id}`,
      transformResponse: (response: { data: any }) => response?.data,
      providesTags: ["Company"],
    }),
    updatePermission: builder.mutation({
      query: (formData) => ({
        url: `/system/permissions/${formData.id}`,
        method: "PATCH",
        body: formData,
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["Company"],
    }),
    createPermission: builder.mutation({
      query: (formData) => ({
        url: `/system/permissions`,
        method: "POST",
        body: formData,
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["Company"],
    }),
    deletePermission: builder.mutation({
      query: (id) => ({
        url: `/system/permissions/${id}`,
        method: "DELETE",
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["Company"],
    }),

    // Role endpoints
    fetchRoles: builder.query({
      query: (params) => `/system/roles?${params}`,
      transformResponse: (response: { data: any }) => response?.data,
      providesTags: ["Role"],
    }),
    fetchRole: builder.query({
      query: (id) => `/system/roles/${id}`,
      transformResponse: (response: { data: any }) => response?.data,
      providesTags: ["Role"],
    }),
    createRole: builder.mutation({
      query: (formData) => ({
        url: `/system/roles`,
        method: "POST",
        body: formData,
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["Role"],
    }),
    updateRole: builder.mutation({
      query: (formData) => ({
        url: `/system/roles/${formData.id}`,
        method: "PATCH",
        body: formData,
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["Role"],
    }),
    deleteRole: builder.mutation({
      query: (id) => ({
        url: `/system/roles/${id}`,
        method: "DELETE",
      }),
      transformErrorResponse: (response) => response.data,
      invalidatesTags: ["Role"],
    }),

    // Employee Role Assignment endpoints
    fetchEmployeeRole: builder.query({
      query: (employeeId) => `/system/user/${employeeId}/role`,
      transformResponse: (response: { data: any }) => response?.data,
      providesTags: (result, error, employeeId) => [
        { type: "EmployeeRole", id: employeeId },
      ],
    }),
    fetchEmployeesRole: builder.query({
      query: (params) => `/system/users/role?${params}`,
      transformResponse: (response: { data: any }) => response?.data,
      providesTags: (result, error, employeeId) => [
        { type: "EmployeeRole", id: employeeId },
      ],
    }),
    assignRolesToEmployee: builder.mutation({
      query: (data) => ({
        url: `/system/employee/role`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { employeeId }) => [
        { type: "EmployeeRole", id: employeeId },
      ],
    }),
    updateEmployeeRoles: builder.mutation({
      query: ({ employee_id, role_id }) => ({
        url: `/system/employee/role`,
        method: "PUT",
        body: { role_id: role_id, employee_id: employee_id },
      }),
      invalidatesTags: (result, error, { employeeId }) => [
        { type: "EmployeeRole", id: employeeId },
      ],
    }),
    removeRoleFromEmployee: builder.mutation({
      query: ({ employeeId, roleId }) => ({
        url: `/system/employees/${employeeId}/roles/${roleId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { employeeId }) => [
        { type: "EmployeeRole", id: employeeId },
      ],
    }),

    // Role Permission Assignment endpoints
    fetchRolePermissions: builder.query({
      query: (roleId) => `/system/roles/${roleId}/permissions`,
      transformResponse: (response: { data: any }) => response?.data,
      providesTags: (result, error, roleId) => [
        { type: "RolePermission", id: roleId },
      ],
    }),
    assignPermissionsToRole: builder.mutation({
      query: ({ role_id, permissions }) => ({
        url: `/system/roles/${role_id}/permissions`,
        method: "POST",
        body: { permissions: permissions },
      }),
      invalidatesTags: ["Role"],
    }),
    updateRolePermissions: builder.mutation({
      query: ({ role_id, permissions }) => ({
        url: `/system/roles/${role_id}/permissions`,
        method: "PUT",
        body: { permissions: permissions },
      }),
      invalidatesTags: ["Role"],
    }),
    removePermissionFromRole: builder.mutation({
      query: ({ roleId, permissionId }) => ({
        url: `/system/roles/${roleId}/permissions/${permissionId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { roleId }) => [
        { type: "RolePermission", id: roleId },
      ],
    }),

    // printers
    addPrinter: builder.mutation({
      query: (data) => ({
        url: `/system/add-printer`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Printers"],
    }),

    getPrinters: builder.query({
      query: () => `/system/get-printer`,
      providesTags: ["Printers"],
    }),
  }),
});

export const {
  useFetchPermissionsQuery,
  useFetchPermissionQuery,
  useUpdatePermissionMutation,
  useCreatePermissionMutation,
  useDeletePermissionMutation,
  useFetchRolesQuery,
  useFetchRoleQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  // Employee Role Assignment hooks
  useFetchEmployeeRoleQuery,
  useFetchEmployeesRoleQuery,
  useAssignRolesToEmployeeMutation,
  useUpdateEmployeeRolesMutation,
  useRemoveRoleFromEmployeeMutation,
  // Role Permission Assignment hooks
  useFetchRolePermissionsQuery,
  useAssignPermissionsToRoleMutation,
  useUpdateRolePermissionsMutation,
  useRemovePermissionFromRoleMutation,
  useAddPrinterMutation,
  useGetPrintersQuery,
} = permissionsApi;

export default permissionsApi;
