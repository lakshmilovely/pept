import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../Core/_providers/api-service/api.service';
import * as alertify from 'alertifyjs'
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  forgotpwdForm: FormGroup;
  loginForm: FormGroup;
  submitted = false;
  tagid: any = 0;
  uid: any;
  U_ID: string;
  S_Id: any = 221
  username: string;
  password: string;
  rememberme: any = false;
  check: any = false;
  newCheck: any;
  isDisabled: Boolean = false;
  constructor(private fB: FormBuilder, private router: Router, private apiSrvc: ApiService) {
    this.forgotpwdForm = this.fB.group({
      forgotemail: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.logincheck();
    this.loginForm = this.fB.group({
      loginemail: ['', Validators.required],
      pwd: ['', [Validators.required, Validators.minLength(4)]]
    });
    if (localStorage.getItem('username') != null && localStorage.getItem('password') != null) {
      this.username = localStorage.getItem('username')
      this.password = localStorage.getItem('password');
      // this.check = true;
    } else {
      this.loginForm.reset();
    }

  }
  onChange(e) {
    this.check = e.target.checked;
    localStorage.setItem('check', this.check)
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return false;
    }
    this.isDisabled = true
    // setTimeout(() => {
      const Obj = {
        "Email": this.loginForm.value.loginemail,
        "Password": this.loginForm.value.pwd
      }
      this.apiSrvc.postmethod('authenticate/signin', Obj).subscribe((res: any) => {
        res.response
        console.log(res.response);
        if (res.status == 200) {
          console.log(res.response.U_ID);
          sessionStorage.setItem("SeesionUser", this.S_Id);
          localStorage.setItem('key', res.response.U_ID)
          localStorage.setItem('DES_ID', res.response.U_DESIGNATION_ID)
          if (this.check == true) {
            localStorage.setItem('username', Obj.Email)
            localStorage.setItem('password', Obj.Password)
            this.router.navigate(['userdashboard']);
            alertify.success('Logged in successfully');
          } else {
            this.router.navigate(['userdashboard']);
            alertify.success('Logged in successfully');
          }
        }
        else if (res.message == "error") {
          this.isDisabled = false;
          console.log(res);
          alertify.error(res.error)
        }
      })
    // }, 100);
  }

  OnSubmitforgot() {
    this.submitted = true;
    if (this.forgotpwdForm.invalid) {
      return
    }
  }
  onKeypress(event) {

    if (this.username.includes('@spyhre.com')) {
      this.username = this.username + ""
    }
    else {
      this.username = this.username + "@spyhre.com";
    }
  }

  logincheck() {
    if (localStorage.getItem('check') == 'true') {
      this.check = true;
      const x = localStorage.getItem('key')
      if (x != null) {
        this.router.navigateByUrl('userdashboard')
      }
      else {
        this.router.navigateByUrl('')
      }
    }
    else {
      this.check = false;
      localStorage.removeItem('username');
    }
  }
}

