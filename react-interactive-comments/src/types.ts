export type CommentType = {
    id: string;
    content: string;
    createdAt: number;
    score: number;
    replyingTo: string;
    user: {
        username: string;
        image: {
            png: string;
        };
    };
    replies: CommentType[];
};
