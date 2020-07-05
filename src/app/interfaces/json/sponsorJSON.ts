import { Sponsor } from '../sponsor';

export interface SponsorJSON {
    title: string,
    text: string[],
    sponsors: {class: string, elements: Sponsor[]}[]
}