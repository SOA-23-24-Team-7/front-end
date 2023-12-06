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
        return error.error.detail.slice(20, -3);
    }
}
