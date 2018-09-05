import { Component, Input, AfterViewInit, ViewChild, ComponentFactoryResolver, OnDestroy, ChangeDetectorRef  } from '@angular/core';
import { AdItemDirective } from '../../directives/ad-item.directive';
import { AdBanner }      from '../user/weather/ad-banner';
import { Ad } from '../user/weather/ad';

@Component({
  selector: 'app-slider2',
  templateUrl: './slider2.component.html',
  styleUrls: ['./slider2.component.css']
})
export class Slider2Component implements  AfterViewInit, OnDestroy {

  @Input() ads: AdBanner[];
  currentAddIndex: number = -1;
  @ViewChild(AdItemDirective) adHost: AdItemDirective;
  interval: any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private cdr: ChangeDetectorRef) { }


    ngAfterViewInit() {
      this.loadComponent();
      this.getAds();
      this.cdr.detectChanges();
    }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  loadComponent() {
    this.currentAddIndex = (this.currentAddIndex + 1) % this.ads.length;
    const adItem = this.ads[this.currentAddIndex];

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);

    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<Ad>componentRef.instance).data = adItem.data;
  }

  getAds() {
    this.interval = setInterval(() => {
      this.loadComponent();
    }, 5000);
  }
}
