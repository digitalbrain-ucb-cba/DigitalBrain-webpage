import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamCardComponent } from './team-card/team-card.component';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [ CommonModule, TeamCardComponent ],
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent {
  cards = [
    {
      id: 'eeglabo',
      title: 'EEG Erika (EEG Labo)',
      image: 'assets/image1.png',
      visitLabel: 'Visitar'
    },
    {
      id: 'softwarecontrolable',
      title: 'Software Controlable',
      image: 'assets/image2.png',
      visitLabel: 'Visitar'
    },
    {
      id: 'hardwarecontrolable',
      title: 'Hardware Controlable',
      image: 'assets/image3.png',
      visitLabel: 'Visitar'
    },
    {
      id: 'robotssistemas',
      title: 'Robots Sistemas',
      image: 'assets/image4.png',
      visitLabel: 'Visitar'
    },
    {
      id: 'neurociencia',
      title: 'Neurociencia',
      image: 'assets/image5.png',
      visitLabel: 'Visitar'
    },
    {
      id: 'eegmicrocontrolador',
      title: 'EEG Microcontrolador',
      image: 'assets/image6.png',
      visitLabel: 'Visitar'
    },
  ];
}

