export interface Post {
  id: number;
  title: string;
  comments: Comment[];
}

export interface Comment {
  id: number;
  text: string;
}
