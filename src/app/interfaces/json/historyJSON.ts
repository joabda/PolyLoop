export interface HistoryJSON {
    question: string,
    features: {title: string, detail: string, icon: string}[],
    events: {date: string, title: string, text: string, more?: string, imgSrc?: string}[],
}