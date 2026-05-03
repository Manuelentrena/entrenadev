export interface Post {
    slug: string;
    title: string;
    summary: string;
    published_at: string;
    cover_image: string | null;
    body: string;
    previous_post?: Post | null;
    next_post?: Post | null;
}

export interface ContentPart {
    type: 'html' | 'code';
    content?: string;
    code?: string;
    language?: string;
}
