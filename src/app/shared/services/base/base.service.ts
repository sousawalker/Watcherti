import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor( private http: HttpClient ) { }

  base() {
    return this.http.get(`/assets/base.json`);
  }
}
