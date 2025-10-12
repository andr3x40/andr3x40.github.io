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
        this.time = time;
        this.tags = tags;
    }

    public static clone(post: Post): Post {
        return new Post(post.id, post.title, post.content, post.author, post.time, post.tags);
    }

    public getFormattedTags(): string[] {
        if (this.tags === undefined || this.tags === null || this.tags.length === 0) return [];
        return this.tags.split(',');
    }

    public getFormattedTime() {
        if (this.time === undefined) return null;
        let postTime: Date = new Date(this.time);
        return postTime.toLocaleString();
    }

    public getContentPreview() {
        let lines: string[] = this.content?.split('\n') ?? [];
        return lines[0];
    }

    public getTimeElapsed(): string {
        if (this.time === undefined) return "No Time";
        let postTime: Date = new Date(this.time);
        let relativeTime: Date = new Date(Date.now() - postTime.getTime());
        // check if it's in the future
        if (relativeTime.getFullYear() < 1970) return "In the future";
        let time = {
            s: relativeTime.getSeconds(),
            min: relativeTime.getMinutes(),
            h: relativeTime.getHours(),
            d: relativeTime.getDate() - 1,
            mon: relativeTime.getMonth(),
            y: relativeTime.getFullYear() - 1970
        }

        if (time.y > 0) {
            return time.y + (time.y === 1 ? " year " : " years ") + "ago";
        } else if (time.mon > 0) {
            return time.mon + (time.mon === 1 ? " month " : " months ") + "ago";
        } else if (time.d > 0) {
            return time.d + (time.d === 1 ? " day " : " days ") + "ago";
        } else if (time.h > 0) {
            return time.h + (time.h === 1 ? " hour " : " hours ") + "ago";
        } else if (time.min > 0) {
            return time.min + (time.min === 1 ? " minute " : " minutes ") + "ago";
        } else if (time.s > 0) {
            return time.s + (time.s === 1 ? " second " : " seconds ") + "ago";
        } else return "Right now";
    }

}