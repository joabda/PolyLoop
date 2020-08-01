import { Member } from '../member';

export interface TeamJSON {
    subTeamName: string,
    description: string,
    members: Member[]
}