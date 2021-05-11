import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { StudentListService } from 'src/app/shared/student-list.service';
import { StudentDetails, StudentList } from '../shared/student-list.model';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: []
})
export class StudentComponent implements OnInit {

  constructor(public service:StudentListService,
    private toastr:ToastrService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(selectedRecord:StudentDetails){
    this.service.formdata=Object.assign({},selectedRecord);
  }

  onSubmit(form:NgForm){
      if(this.service.formdata.code==0)
        this.insertFn(form)
      else
        this.updateFn(form)
  }

  insertFn(form:NgForm){
    this.service.postStudent().subscribe(
      res=>{
        this.resetForm(form);
        this.toastr.success('Submitted successfully','Student Detail')
      },
      err=>{console.log(err);}
    );
  }

  updateFn(form:NgForm){
    this.service.putStudent().subscribe(
      res=>{
        this.resetForm(form);
        this.toastr.success('Updated successfully','Student Detail')
      },
      err=>{console.log(err);}
    );
  }

  onDelete(code:number){
    if(confirm('Are you sure to delete this record?')){
    this.service.deleteStudent(code).subscribe(
      res=>{
        this.service.refreshList();
        this.toastr.error('Deleted successfully','Student Detail')
      },
      err=>{console.log(err);}
    );
    }
  }

  resetForm(form: NgForm){
      form.form.reset();
      this.service.formdata=new StudentList();
      this.service.refreshList();
  }
  

}



