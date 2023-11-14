export interface Message {
    id: number;
    senderId: number;
    reciverId: number;
    // senderUsername: string;
    //reciverUsername: string;
    text: string;
    statusOfMessage: number;
}

export interface MessageUsernames {
    id: number;
    userSenderId: number;
    userReciverId: number;
    senderUsername: string;
    reciverUsername: string;
    text: string;
    statusOfMessage: number;
}
