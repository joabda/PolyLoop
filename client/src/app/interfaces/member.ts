import { Role } from '../enums/role';

export interface Member {
    fullName: string,
    pictureURL: string,
    role: Role,
    hidden: boolean
}