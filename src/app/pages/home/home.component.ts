import { Component } from '@angular/core';
import { BannerComponent } from './sections/banner/banner.component';
import { TechStackComponent } from './sections/tech-stack/tech-stack.component';
import { PresentationComponent } from "./sections/presentation/presentation.component";
import { TeamsComponent } from '../teams/teams.component';
@Component({
  selector: 'app-home',
  imports: [
    BannerComponent,
    TechStackComponent,
    PresentationComponent,
    TeamsComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
