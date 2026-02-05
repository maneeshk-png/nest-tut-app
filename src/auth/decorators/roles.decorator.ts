import { SetMetadata } from "@nestjs/common";
import { metadata } from "reflect-metadata/no-conflict";

export const Roles=(...roles:string[])=>SetMetadata('roles',roles);

