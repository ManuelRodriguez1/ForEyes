import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Data } from '../../models/user.model';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  list: any[]

  constructor(private afb: AngularFireDatabase) {}

  ngOnInit() {
    return this.afb.list('Images').snapshotChanges()
    .subscribe((data: any)=>{
      this.list = []
      data.forEach((data: any) => {
        let x = data.payload.toJSON()
        x["$key"] = data.key
        this.list.push(x as Data)
      });
    })
  }
  

}
