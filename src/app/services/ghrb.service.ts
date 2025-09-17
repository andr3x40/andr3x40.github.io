import { Injectable } from '@angular/core';
import { Chart } from '../model/ghrb';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class GhrbService {

  private chartUrl: string = 'http://localhost:8080/api/ghrb/charts';

  constructor(private http: HttpService) { }

  public async getAllCharts(): Promise<Chart[]> {
    const collection: Chart[] | null = await this.http.getRequestBody<Chart[]>(this.chartUrl);
    if (collection === null) return [];
    let output: Chart[] = [];
    for (let c of collection) {
      output.push(Chart.clone(c));
    }
    return output;
  }

}