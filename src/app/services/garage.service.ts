import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { GarageItem, GarageResult } from '../models/garage-item';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class GarageService {

  baseURL: string = environment.baseURL;
  constructor(private httpClient: HttpClient, private commonService: CommonService) { }

  getAllGarages() {
    return this.httpClient.get<GarageResult>(`${this.baseURL}/getAllGarages`)
      .pipe(
        catchError(this.commonService.handleError)
      );
  }

  createGarage(model: GarageItem) {
    model.isFromAPI = false;
    return this.httpClient.post(`${this.baseURL}/createGarage`, model)
      .pipe(
        catchError(this.commonService.handleError)
      );
  }
}
