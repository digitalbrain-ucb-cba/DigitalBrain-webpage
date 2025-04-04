import { Component } from '@angular/core';
import { BannerComponent } from './sections/banner/banner.component';
import { TechStackComponent } from './sections/tech-stack/tech-stack.component';
@Component({
  selector: 'app-home',
  imports: [
    BannerComponent,
    TechStackComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
