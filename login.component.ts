import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formModel={
    Email:'',
    Password:''
  }
  constructor(private service:UserService,private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
  }

    onSubmit(form:NgForm){
      this.service.PostLogin(form.value).subscribe(
      (res:any)=>{
        localStorage.setItem('token',res.token);
        this.router.navigateByUrl('/student');
      },
      err=>{
        if(err.status==400)
        this.toastr.error('Incorrect Username or Password!','Authentication failed.');
        else
        console.log(err);
      }
      );
    }

  }


