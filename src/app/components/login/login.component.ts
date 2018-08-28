import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  errorMessage: string = ''

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ){
    this.createForm()
  }

  ngOnInit() {
  }

  createForm(){
    this.loginForm = this.fb.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required]
    })
  }

  tryLogin(value){
    this.authService.doLogin(value)
    .then(res => {
      this.router.navigate(['/Profile'])
    }, err => {
      console.log(err)
      this.errorMessage = err.message
    })
  }


}
