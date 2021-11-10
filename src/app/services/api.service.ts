import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HttpClient) { }

  get(url:string) : Observable<any> {
    return this.http.get(url);
  }

  post(url:string,params:any) : Observable<any> {
    return this.http.post(url,params);
  }

}
