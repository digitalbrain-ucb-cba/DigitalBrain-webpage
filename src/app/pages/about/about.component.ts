import { Component } from '@angular/core';
import { OurStoryComponent } from "./sections/our-story/our-story.component";

@Component({
  selector: 'app-about',
  imports: [OurStoryComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
