import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  /**
   * Sends a HTTP GET request to the given URL.
   * The request includes the credentials of the current user for authentication and
   * returns the raw HTTP response.
   * @param url the URL to send the request to
   * @returns a promise that resolves to the raw HTTP response
   */
  public async getRequest<T>(url: string): Promise<HttpResponse<T>> {
    let response: Observable<HttpResponse<T>> = this.http.get<T>(url, {observe: 'response', withCredentials: true});
    let result: HttpResponse<T> = await lastValueFrom(response);
    return result;
  }

  /**
   * Sends a HTTP POST request to the given URL.
   * The request includes the credentials of the current user for authentication and
   * returns the raw HTTP response.
   * @param url the URL to send the request to
   * @param body the body of the request
   * @returns a promise that resolves to the raw HTTP response
   */
  public async postRequest<T>(url: string, body: any): Promise<HttpResponse<T>> {
    let response: Observable<HttpResponse<T>> = this.http.post<T>(url, body, {observe: 'response', withCredentials: true});
    let result: HttpResponse<T> = await lastValueFrom(response);
    return result;
  }

  /**
   * Sends a HTTP DELETE request to the given URL.
   * The request includes the credentials of the current user for authentication and
   * returns the raw HTTP response.
   * @param url the URL to send the request to
   * @returns a promise that resolves to the raw HTTP response
   */
  public async deleteRequest<T>(url: string): Promise<HttpResponse<T>> {
    let response: Observable<HttpResponse<T>> = this.http.delete<T>(url, {observe: 'response', withCredentials: true});
    let result: HttpResponse<T> = await lastValueFrom(response);
    return result;
  }

  /**
   * Sends a HTTP GET request to the given URL.
   * The request includes the credentials of the current user for authentication.
   * @param url the URL to send the request to
   * @returns a promise that resolves to the response body
   */
  public async getRequestBody<T>(url: string): Promise<T | null> {
    let response: HttpResponse<T> = await this.getRequest(url);
    return response.body;
  }

  /**
   * Sends a HTTP POST request to the given URL.
   * The request includes the credentials of the current user for authentication.
   * @param url the URL to send the request to
   * @param body the body of the request
   * @returns a promise that resolves to the response body
   */
  public async postRequestBody<T>(url: string, body: any): Promise<T | null> {
    let response: HttpResponse<T> = await this.postRequest(url, body);
    return response.body;
  }

  /**
   * Sends a HTTP DELETE request to the given URL.
   * The request includes the credentials of the current user for authentication.
   * @param url the URL to send the request to
   * @returns a promise that resolves to the response body
   */
  public async deleteRequestBody<T>(url: string): Promise<T | null> {
    let response: HttpResponse<T> = await this.deleteRequest(url);
    return response.body;
  }

}