import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Post } from '../model/blog';
import { ValidationError } from '../model/validation';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

    private postUrl: string = 'http://localhost:8080/api/blog/posts'
    private postAdminUrl: string = 'http://localhost:8080/api/admin/blog/posts'

    constructor(private http: HttpService) { }

    /**
     * Retrieves all blog posts.
     * @returns a promise that resolves to an array of Post objects, or an empty array if the response is null or does not contain the expected data.
     */
    public async getAllPosts(): Promise<Post[]> {
        // get posts ordered by date
        const collection: Post[] | null = await this.http.getRequestBody<Post[]>(this.postUrl + "?orderByDate=true");
        if (collection === null) return [];
        let output: Post[] = [];
        for (let c of collection) {
            output.push(Post.clone(c));
        }
        return output;
    }

    /**
     * Retrieves a single blog post by its ID.
     * @param id the ID of the post to retrieve
     * @returns a promise that resolves to the Post object, or null if the post is not found
     */
    public async getPost(id: number): Promise<Post | null> {
        const output: Post | null = await this.http.getRequestBody<Post>(this.postUrl + '/' + id);
        if (output === null) return null;
        return Post.clone(output);
    }

    /**
     * Checks if a post exists with a certain ID.
     * @param id the ID of the post to check
     * @returns `true` if it exists, `false` otherwise
     */
    public async existsPost(id: number): Promise<boolean> {
        let p: Post | null = await this.getPost(id);
        let output: boolean = (p !== null);
        return output;
    }

    public async savePost(post: Post): Promise<ValidationError[] | null> {
        return this.http.postRequestBody<ValidationError[]>(this.postAdminUrl, post);
    }

    public async deletePost(id: number) {
        this.http.deleteRequestBody<Post>(this.postAdminUrl + '/' + id);
    }

}