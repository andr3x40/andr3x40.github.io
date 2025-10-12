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
import { LoginSuccessComponent } from './pages/login/loginsuccess.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './services/guard/auth.guard';
import { FourOhFourComponent } from './pages/404/404.component';
import { adminGuard } from './services/guard/admin.guard';
import { AdminConsoleComponent } from './pages/admin/admin-console/admin-console.component';
import { BlogEditPostComponent } from './pages/admin/blog/blog-edit-post/blog-edit-post.component';
import { GhrbEditChartComponent } from './pages/admin/ghrb/ghrb-edit-chart/ghrb-edit-chart.component';

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

    {path: 'login/success', component: LoginSuccessComponent},

    {path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]},

    // admin pages
    {path: 'admin', canActivateChild: [adminGuard], children: [
        {path: 'console', component: AdminConsoleComponent},
        {path: 'blog/new', component: BlogEditPostComponent},
        {path: 'blog/edit/:id', component: BlogEditPostComponent},
        {path: 'projects/ghrb/charts/new', component: GhrbEditChartComponent},
        {path: 'projects/ghrb/charts/edit/:id', component: GhrbEditChartComponent}
    ]},

    // add 404 page
    {path: '**', component: FourOhFourComponent}
];
