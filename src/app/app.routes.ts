import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { ServicesComponent } from './pages/services/services.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { BlogNewsComponent } from './pages/blog-news/blog-news.component';

export const routes: Routes = [

  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent, title: 'Home | COMPUTECH' },
      { path: 'about', component: AboutComponent, title: 'About | COMPUTECH' },
      { path: 'courses', component: CoursesComponent, title: 'Courses | COMPUTECH' },
      { path: 'training', redirectTo: 'courses' },
      { path: 'gallery', component: GalleryComponent, title: 'Gallery | COMPUTECH' },
      { path: 'blog-news', component: BlogNewsComponent, title: 'Blog & News | COMPUTECH' },
      {
        path: 'sales',
        loadComponent: () => import('./pages/sales/sales.component').then(module => module.SalesComponent),
        title: 'Sales | COMPUTECH'
      },
      { path: 'services', component: ServicesComponent, title: 'Services | COMPUTECH' },
      { path: 'registration', component: RegistrationComponent, title: 'Registration | COMPUTECH' },
      {
        path: 'contact',
        loadComponent: () => import('./pages/contact/contact.component').then(module => module.ContactComponent),
        title: 'Contact | COMPUTECH'
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
