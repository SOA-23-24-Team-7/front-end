import { User } from "src/app/infrastructure/auth/model/user.model";

export interface ProblemUser {
    id?: number;
    category: string;
    priority: string;
    description: string;
    reportedTime: Date;
    touristId?: number;
    tourist: User;
    tourId: number;
    tourName: string;
}
