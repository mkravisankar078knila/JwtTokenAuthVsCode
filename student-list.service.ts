import { Injectable } from '@angular/core';
import { StudentDetails, StudentList } from './student-list.model';
import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class StudentListService {

  constructor(private http:HttpClient) { }

readonly baseurl='https://localhost:44360/api/Student';
formdata:StudentList=new StudentList()
list: StudentDetails[];

postStudent(){
  return this.http.post(this.baseurl,this.formdata);
}

putStudent(){
  return this.http.put(this.baseurl,this.formdata);
}

deleteStudent(code:number){
  return this.http.delete(`${this.baseurl}/${code}`);
}

refreshList(){
  this.http.get(this.baseurl + "/GetAllStudents")
  .toPromise()
  .then(res => this.list = res as StudentDetails[]);
}

}
