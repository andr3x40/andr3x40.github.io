import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BlogComponent } from './pages/blog/blog.component';
import { FlamyComponent } from './pages/projects/flamy/flamy.component';
import { GhrbChartsComponent } from './pages/projects/ghrb/charts/ghrb-charts.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { GhrbComponent } from './pages/projects/ghrb/ghrb.component';
import { WhoamiComponent } from './pages/whoami/whoami.component';
import { BlogPostComponent } from './pages/blog/blog-post/blog-post.component';
import { LoginComponent } from './pages/login/login.component';
import { TermsComponent } from './pages/legal/terms/terms.component';
import { PrivacyComponent } from './pages/legal/privacy/privacy.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'blog', component: BlogComponent},
    {path: 'blog/:id', component: BlogPostComponent},
    {path: 'projects', component: ProjectsComponent},
    {path: 'projects/flamy', component: FlamyComponent},
    {path: 'projects/ghrb', component: GhrbComponent},
    {path: 'projects/ghrb/charts', component: GhrbChartsComponent},
    {path: 'whoami', component: WhoamiComponent},

    {path: 'login', component: LoginComponent},
    {path: 'legal/terms', component: TermsComponent},
    {path: 'legal/privacy', component: PrivacyComponent},
];
