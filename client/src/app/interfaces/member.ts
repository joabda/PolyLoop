import { Role } from '../enums/role';

export interface Member {
    firstName: string,
    lastName: string,
    pictureURL: string,
    role: Role,
    hidden: boolean
}