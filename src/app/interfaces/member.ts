import { Role } from '../enums/role';

export interface Member {
    name: string,
    pictureURL: string,
    role: Role,
    linkedIn: string
}