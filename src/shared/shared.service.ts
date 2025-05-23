import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private homeUrl = 'assets/mockData.json'; // Path to the JSON file

  constructor(private http:HttpClient) { }

  getMockData(): Observable<any>{
   return this.http.get<any>(this.homeUrl)
  }
}
