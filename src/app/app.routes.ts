import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { AboutComponent } from './pages/about/about.component';
import { PresentationComponent } from './pages/home/sections/presentation/presentation.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: "teams",
        component: TeamsComponent,
    },
    {
        path: "about",
        component: AboutComponent,
    },
    {
        path: "presentation",
        component: PresentationComponent,
    }
];
