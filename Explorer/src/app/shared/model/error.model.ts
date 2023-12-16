export class xpError {
    status: number;
    title: string;
    message: string;

    constructor(error: any) {
        this.status = error.error.status;
        this.title = error.error.title;
        this.message = xpError.getErrorMessage(error);
    }

    static getErrorMessage(error: any): string {
        console.log(error);
        if (!error.error || !error.error.detail)
            return "Unknown error (anlaki back-end, ne salje error kako treba 😔 )";
        const detail = error.error.detail;
        return detail.slice(detail.lastIndexOf("Message='") + 9, -3);
    }
}
