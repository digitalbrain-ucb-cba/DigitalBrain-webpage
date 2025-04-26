import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-team-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink       // ← así el template reconoce [routerLink]
  ],
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.css']
})
export class TeamCardComponent {
  @Input() id = '';
  @Input() title = '';
  @Input() image = '';
  @Input() visitLabel = '';
}
