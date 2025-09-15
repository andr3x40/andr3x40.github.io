import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BlogComponent } from './pages/blog/blog.component';
import { FlamyComponent } from './pages/projects/flamy/flamy.component';
import { GhrbChartsComponent } from './pages/projects/ghrb/charts/ghrb-charts.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { GhrbComponent } from './pages/projects/ghrb/ghrb.component';
import { WhoamiComponent } from './pages/whoami/whoami.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'blog', component: BlogComponent},
    {path: 'projects', component: ProjectsComponent},
    {path: 'projects/flamy', component: FlamyComponent},
    {path: 'projects/ghrb', component: GhrbComponent},
    {path: 'projects/ghrb/charts', component: GhrbChartsComponent},
    {path: 'whoami', component: WhoamiComponent}
];
