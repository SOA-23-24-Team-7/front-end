export interface FacilityNotification {
    description: string;
    created: Date;
    isAccepted: boolean;
    comment?: string;
    senderPicture: string;
    senderName: string;
    header: string;
}
