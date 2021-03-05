import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }

  register($data:any)
  {
    return this.http.post("http://localhost:5000"+"/api/auth/register", $data)
      .pipe((response)=>{
        return response;
    })
  }

 login($data:any)
  {
    return this.http.post("http://localhost:5000"+"/api/auth/login", $data)
    .pipe((response)=>{
      return response;
    })
  }

  update($data:any)
  {
    return this.http.post("http://localhost:5000"+"/api/auth/update", $data)
    .pipe((response)=>{
      return response;
    })
  }

  
}
