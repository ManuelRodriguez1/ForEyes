import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.css']
})
export class HolidayComponent implements OnInit {
  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

}
