import { User } from "src/app/infrastructure/auth/model/user.model";

export interface ProblemResolvingNotification {
    id: number;
    problemId: number;
    receiverId: number;
    senderId: number;
    sender: User;
    message: string;
    created: Date;
    hasSeen: boolean;
}
