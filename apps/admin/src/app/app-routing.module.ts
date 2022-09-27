import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent as AuthLayout } from './layouts/auth/auth.component';
import { BaseComponent as BaseLayout } from './layouts/base/base.component';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { NotFoundComponent as NotFoundPage } from './pages/not-found/not-found.component';
import { LoginComponent as LoginPage } from './pages/auth/login/login.component';
import { RegisterComponent as RegisterPage } from './pages/auth/register/register.component';
import { HomeComponent as HomePage } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [AuthenticatedGuard],
    loadComponent: () => BaseLayout,
    children: [{ path: '', pathMatch: 'full', loadComponent: () => HomePage }],
  },
  {
    path: 'auth',
    pathMatch: 'prefix',
    loadComponent: () => AuthLayout,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login', loadComponent: () => LoginPage },
      { path: 'register', loadComponent: () => RegisterPage },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    loadComponent: () => NotFoundPage,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
