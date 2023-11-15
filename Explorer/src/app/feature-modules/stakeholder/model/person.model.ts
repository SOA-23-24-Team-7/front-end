import { User } from "src/app/infrastructure/auth/model/user.model";

export interface Person {
    id: number;
    userId: number;
    name: string;
    surname: string;
    email: string;
    profilePicture: string;
    bio: string;
    moto: string;
    user: User;
}
