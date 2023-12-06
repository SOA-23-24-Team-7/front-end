export interface UpdateBlog {
    id: number;
    title: string;
    description: string;
    date: string;
    status: number;
    authorId: number;
    visibilityPolicy: number;
}
