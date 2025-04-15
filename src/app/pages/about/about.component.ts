import { Component } from '@angular/core';
import { OurStoryComponent } from "./sections/our-story/our-story.component";
import { SupervisorsComponent } from "./sections/supervisors/supervisors.component";

@Component({
  selector: 'app-about',
  imports: [OurStoryComponent, SupervisorsComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
