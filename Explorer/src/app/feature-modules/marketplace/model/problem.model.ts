export interface Problem {
    id?: number;
    category: string;
    priority: string;
    description: string;
    reportedTime: Date;
    touristId?: number;
    tourId: number;
}
