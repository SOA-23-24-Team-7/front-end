export interface CreateBlog {
    title: string;
    description: string;
    date: string;
    status: number;
    authorId: number;
    visibilityPolicy: number;
    clubId?: number;
}
