import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  readonly baseurl='https://localhost:44360/api/User';
  // formdata:StudentList=new StudentList()
  // list: StudentDetails[];

  PostLogin(formdata: any){
    return this.http.post(this.baseurl + "/postLogin",formdata);
  }


}
