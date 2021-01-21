import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
//import { Observable } from 'rxjs';
//import 'rxjs/add/observable/of';


/*const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};*/


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,private router:Router) { }

login(user){
  return this.http.post<any>('http://localhost:3000/user/login', user);
}
/*login(input) {
  const userToken = localStorage.getItem('token');
  let token = userToken !== null ? JSON.parse(userToken) : "abcd";
  let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
  let formData = !input ? { email: "", password: "" } : input;
  let graphqlQuery = {
    "query": "query loginUser($email: String!,$password: String!) { login_Q(email: $email, password: $password) { token message } }",
    "variables": {
      "email": formData.email,
      "password": formData.password
    }
  };
  return this.http.post('http://localhost:3000/user/login', graphqlQuery, httpOptions);
}*/

signup(user) {
  return this.http.post<any>('http://localhost:3000/user/signup',user); 
    
}

loggedIn() {
    return !!localStorage.getItem('token')
}
logoutUser() {
   localStorage.removeItem('token')
   this .
   router.navigate(['/'])
}
getToken() {
  return localStorage.getItem('token')
}
}