import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-fall',
  templateUrl: './fall.component.html',
  styleUrls: ['./fall.component.css']
})
export class FallComponent implements OnInit {
  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

}
