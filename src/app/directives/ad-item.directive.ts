import { Directive, ViewContainerRef } from '@angular/core';

//Directiva para slider publicidad
@Directive({
  selector: '[appAdItem]'
})
export class AdItemDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }


}
