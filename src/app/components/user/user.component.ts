import { Component, OnInit } from '@angular/core';
import { FirebaseUserModel } from '../../models/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: FirebaseUserModel = new FirebaseUserModel()
  profileForm: FormGroup

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void{
    this.route.data.subscribe(routeData => {
      let data = routeData['data']
      if(data){
        this.user = data
        this.createForm(this.user.name)
      }
    })
  }

  createForm(name){
    this.profileForm = this.fb.group({
      name: [name, Validators.required]
    })
  }

  save(value){
    this.userService.updateCurrentUser(value)
    .then(res => {
      console.log(res)
    }, err => console.log(err))
  }

  logout(){
    this.authService.doLogout()
    .then((res) => {
      this.router.navigate(['/Login']);
    }, (error) => {
      console.log("Logout Error", error)
    })
  }

}
