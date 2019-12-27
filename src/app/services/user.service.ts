import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http:HttpClient
  ) { }


  addUser(data):Observable<any>{
    return this.http.post<any>(environment.newUser,data).pipe(tap(res=>{
      console.log(res);
    }));
  }
}
