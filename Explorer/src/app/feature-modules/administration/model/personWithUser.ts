import { User } from "src/app/infrastructure/auth/model/user.model";

export interface PersonUser {
    id: number;
    userId: number;
    name: string;
    surname: string;
    email: string;
    user: User;
    bio: string;
    moto: string;
}
