import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3000/api/test/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get<any>('http://localhost:3000/user');

  }
  getSingleUser(id){
    return this.http.get('http://localhost:3000/user/'+id)  
  }

}