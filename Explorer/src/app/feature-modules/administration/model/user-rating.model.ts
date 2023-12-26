export interface UserRating {
    id?: number;
    grade: number;
    comment: string;
    dateTime: Date;
    userId: number;
    userName: string;
    profilePicture: string | null;
}
