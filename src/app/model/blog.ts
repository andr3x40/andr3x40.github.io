export class Post {

    public id!: number | undefined;
    public title?: string;
    public content?: string;

    public author?: string;
    public time?: string;

    public tags?: string;

    public constructor(id?: number, title?: string, content?: string, author?: string, time?: string, tags?: string) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
        this.time = time + "Z"; // add Z to indicate it's UTC time
        this.tags = tags;
    }

    public static clone(post: Post): Post {
        return new Post(post.id, post.title, post.content, post.author, post.time, post.tags);
    }

}