import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BlogComponent } from './pages/blog/blog.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'blog', component: BlogComponent}
];
