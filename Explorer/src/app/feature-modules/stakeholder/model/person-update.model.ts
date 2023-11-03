export interface PersonUpdate {
    id: number;
    userId: number;
    name: string;
    surname: string;
    email: string;
    profilePicture?: string;
    bio?: string;
    motto?: string;
}
