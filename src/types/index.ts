interface Chapter {
  public_id: string;
  title: string;
  content: {
    id: number;
    title: string;
    pageNumber: number;
    pagesCount: number;
    sections: any[];
  };
}

export interface User {
    public_id: string
    name: string
    contact: string
}

export interface Comment {
    id: string
    user: {
        name: string
        username: string
        avatar: string
        verified?: boolean
    }
    timestamp: string
    content: string
    metrics: {
        replies: number
        likes: number
    }
}


export interface PostCardProps {
    user: {
        name: string
        username: string
        avatar: string
        verified?: boolean
    }
    timestamp: string
    video?: string
    content: string
    image?: string
    metrics: {
        replies: number
        retweets: number
        likes: number
        views?: number
    }
    usersComments: Comment[]
}

