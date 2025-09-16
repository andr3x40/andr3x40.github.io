export class Post {

    public id!: number;
    public title!: string;
    public content!: string;

    public author!: string;
    public time!: string;

    public tags!: string[];

    public constructor(id: number, title?: string, content?: string, author?: string, time?: string, tags?: string[]) {
        this.id = id;
        this.title = title !== undefined ? title : "New Post";
        this.content = content !== undefined ? content : "";
        this.author = author !== undefined ? author : "Unknown Author";
        this.time = time !== undefined ? time : "1970-01-01T00:00:00";
        this.tags = tags !== undefined ? tags : [];
    }

    public getFormattedTime() {
        let postTime: Date = new Date(this.time);
        return postTime.toLocaleString();
    }

    public getTimeElapsed(): string {
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