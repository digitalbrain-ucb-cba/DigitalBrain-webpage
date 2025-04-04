import { Component, ChangeDetectionStrategy } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-tech-stack',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './tech-stack.component.html',
  styleUrl: './tech-stack.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TechStackComponent {

}
