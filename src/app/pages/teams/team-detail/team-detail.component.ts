import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

interface TeamData {
  name: string;
  image: string;
  description: string;
  members: string[];
}

// aquí hardcodeamos todos los datos
const TEAMS_DATA: Record<string, TeamData> = {
  eeglabo: {
    name: 'EEG Erika (EEG Labo)',
    image: 'assets/image1.png',
    description: `
      Laboratorio especializado en neurofeedback
      y análisis de señales EEG de alta resolución.
      Provee módulos de entrenamiento cognitivo
      personalizado y visualización en tiempo real.
    `,
    members: [
      'Cristhian Rojas', 'Alejando Montero', 'Valery Arauco',
      'Briza Contreras', 'Maria Jose Murillo', 'Liam Lopez',
      'Nicolas Aranibar', 'Maria Belen Vargas', 'Angela Montes',
      'Daniela Nava', 'Alejandra Rocha', 'Kairel Espinoza',
      'Percy Baeza', 'Maria Belen Irusta'
    ]
  },
  softwarecontrolable: {
    name: 'Software Controlable',
    image: 'assets/image2.png',
    description: `
      Plataforma de software robusta para controlar
      aplicaciones mediante señales cerebrales,
      con arquitectura modular y latencia mínima.
    `,
    members: [
      'Hans Villca', 'Alejandro Alvarez', 'Fernando Gil',
      'Diego Canedo', 'Kevin Céspedes', 'Cristhian Rojas',
      'Mateo Loayza'
    ]
  },
  hardwarecontrolable: {
    name: 'Hardware Controlable',
    image: 'assets/image3.png',
    description: `
      Desarrollo de dispositivos físicos
      de interfaz cerebro-máquina, incluyendo
      módulos de adquisición y amplificación.
    `,
    members: [
      'Sergio Lopez', 'Santiago Zambrana', 'Gabriel Cordero',
      'Isabel Arenas', 'Maria Belen Vargas', 'Alanis Yas Rojas'
    ]
  },
  robotssistemas: {
    name: 'Robots Sistemas',
    image: 'assets/image4.png',
    description: `
      Diseño e implementación de sistemas robóticos
      colaborativos y autónomos para tareas industriales
      y de investigación.
    `,
    members: ['Jheyson Cuevas', 'Alvaro Saavedra', 'Diego Canedo']
  },
  neurociencia: {
    name: 'Neurociencia',
    image: 'assets/image5.png',
    description: `
      Investigación de procesos neuronales y
      cognitivos, modelado de redes sinápticas
      y estudio de plasticidad cerebral.
    `,
    members: [
      'Valeria Gonzales', 'Juan Carlos Baya', 'Romina Alvarez',
      'Gabriel Castellón', 'Laura Rodriguez', 'Mateo Arroyo',
      'Angela Montes', 'Maria Belen Vargas', 'Briza Contreras',
      'Andres Jimenez', 'Nicolas Aranibar', 'Kessia Julian',
      'Percy Baeza', 'Maria Belen Irusta', 'Camila Vaca',
      'Liam Lopez', 'Georgina Mérida', 'Iván Heredia'
    ]
  },
  eegmicrocontrolador: {
    name: 'EEG Microcontrolador',
    image: 'assets/image6.png',
    description: `
      Integración de microcontroladores para
      adquisición y procesamiento de datos EEG
      en tiempo real, con algoritmos embebidos.
    `,
    members: [
      'Miguel Paiz', 'Marycielo Morales', 'Sharon Maygua',
      'Vivian Baldivieso', 'Jheyson Cuevas', 'Noemí Murillo',
      'Mateo Loayza', 'Erika Oporto', 'Alvaro Saavedra',
      'Alanis Yas Rojas'
    ]
  }
};

@Component({
  selector: 'app-team-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit {
  teamId!: string;
  team?: TeamData;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.teamId = this.route.snapshot.paramMap.get('id')!;
    this.team = TEAMS_DATA[this.teamId];
  }
}
