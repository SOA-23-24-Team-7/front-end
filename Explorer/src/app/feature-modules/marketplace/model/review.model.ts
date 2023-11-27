import { User } from "src/app/infrastructure/auth/model/user.model";

export interface Review {
    id?: number;
    rating: number;
    comment: string;
    touristId?: number;
    tourVisitDate: Date;
    commentDate?: Date;
    tourId: number;
    images: Array<string>;
    tourist?: User;
    showMore?: boolean;
}
