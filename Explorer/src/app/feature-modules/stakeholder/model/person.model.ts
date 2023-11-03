import { User } from "src/app/infrastructure/auth/model/user.model";

export interface Person {
    id: number;
    userId: number;
    user: User;
    name: string;
    surname: string;
    email: string;
    bio?: string;
    motto?: string;
}
