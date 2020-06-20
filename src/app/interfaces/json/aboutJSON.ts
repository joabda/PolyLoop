import { FeatureItem } from '../feature-item';

export interface AboutJSON {
    title: string,
    text: string[],
    button: string,
    comp: string,
    moreInfo: string,
    features: FeatureItem[]
}