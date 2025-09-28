// app/utils/auth.server.ts
import { redirect } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import type { Permission } from "~/types/permissions";

// Enhanced cookie parsing
function getPermissionsFromCookie(request: Request): Permission[] {
  const cookieHeader = request.headers.get("Cookie");
  if (!cookieHeader) return [];

  const permissionsCookie = cookieHeader
    .split("; ")
    .find((c) => c.startsWith("permissions="));
    
  if (!permissionsCookie) return [];

  try {
    const cookieValue = permissionsCookie.split("=")[1];
    return JSON.parse(decodeURIComponent(cookieValue)) as Permission[];
  } catch {
    return [];
  }
}

// Central permission check
export function checkPermissions(
  request: Request,
  requiredPermission: Permission | Permission[]
): Permission[] {
  const userPermissions = getPermissionsFromCookie(request);
  const required = Array.isArray(requiredPermission) 
    ? requiredPermission 
    : [requiredPermission];

  const hasPermission = required.some(perm => 
    userPermissions.includes(perm)
  );

  if (!hasPermission) {
    throw redirect("/unauthorized");
  }

  return userPermissions;
}

// Enhanced protected loader
export async function protectedLoader(
  { request }: LoaderFunctionArgs,
  requiredPermission: Permission | Permission[]
) {
  const permissions = checkPermissions(request, requiredPermission);
  return { permissions };
}