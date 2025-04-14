import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-banner',
  imports: [MatButtonModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {
  constructor(private readonly viewportScroller: ViewportScroller) {}

  scrollToPresentation() {
    this.viewportScroller.scrollToAnchor('presentation');
  }
}
