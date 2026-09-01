import { Component, Input } from '@angular/core';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-team-card',
  standalone: true,
  imports: [
    RouterLink
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
