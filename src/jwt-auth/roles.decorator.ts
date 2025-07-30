import { SetMetadata } from "@nestjs/common";

export const role_keys='roles'
export const Roles=(...roles:string[])=>SetMetadata(role_keys,roles)