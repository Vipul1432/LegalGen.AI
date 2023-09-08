import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}
  registerUser(data: any): Observable<any> {
    debugger
    return this.http.post("https://localhost:44330/api/user/register", data)
  }

  // login(data: any) {
  //   this.http.post("https://localhost:44330/api/user/login",data).subscribe((result:any)=>{
  //   console.warn(result);
  //   localStorage.setItem("token",result.token);
  //   // this.router.navigate('/path');
  //   }
  //   )
  // }
  login(logindata: any): Observable<any> {
    debugger
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`https://localhost:44330/api/user/login`, logindata, { headers });
  }
  
  logout(token: string | null) : Observable<any> {

    return this.http.get<any>(`https://localhost:44330/api/user/logout?token=${token}`);
  }
}
