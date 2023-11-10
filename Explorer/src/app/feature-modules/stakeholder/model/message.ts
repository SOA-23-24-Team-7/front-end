export interface Message {
    id: number;
    senderId: number;
    reciverId: number;
    senderUsername: string;
    reciverUsername: string;
    text: string;
    status: string;
}
