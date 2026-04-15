import { Injectable } from '@angular/core';
import { Chart } from '../model/ghrb';
import { HttpService } from './http.service';
import { Post } from '../model/blog';
import { ValidationError } from '../model/validation';

@Injectable({
  providedIn: 'root'
})
export class GhrbService {

  private chartUrl: string = 'http://localhost:8080/api/ghrb/charts';
  private variantUrl: string = 'http://localhost:8080/api/ghrb/variants';
  private chartAdminUrl: string = 'http://localhost:8080/api/admin/ghrb/charts';

  constructor(private http: HttpService) { }

  public async getAllCharts(): Promise<Chart[]> {
    const collection: Chart[] | null = await this.http.getRequestBody<Chart[]>(this.chartUrl);
    if (collection === null) return [];
    let output: Chart[] = [];
    for (let c of collection) {
      output.push(c);
    }
    return output;
  }

  public async getChart(id: number): Promise<Chart | null> {
      const output: Chart | null = await this.http.getRequestBody<Chart>(this.chartUrl + '/' + id);
      if (output === null) return null;
      return output;
  }

  public async saveChart(chart: Chart): Promise<ValidationError[] | null> {
    return this.http.postRequestBody<ValidationError[]>(this.chartAdminUrl, chart);
  }

  public async deleteChart(id: number) {
    this.http.deleteRequestBody<Chart>(this.chartAdminUrl + '/' + id);
  }

  public async countCharts(): Promise<number> {
    return await this.http.getRequestBody<number>(this.chartUrl + '/count') ?? 0;
  }

  public async countVariants(): Promise<number> {
    return await this.http.getRequestBody<number>(this.variantUrl + '/count') ?? 0;
  }

}