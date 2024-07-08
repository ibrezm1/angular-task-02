import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { LoginComponent } from './login/login.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';

import { AuthGuard } from './auth.guard';

// const routes: Routes = [
//   { path: '', redirectTo: '/login', pathMatch: 'full' },
//   { path: 'login', component: LoginComponent },
//   { path: 'tasks', component: TasksListComponent, canActivate: [AuthGuard] },
//   { path: 'new-task', component: TaskFormComponent, canActivate: [AuthGuard] },
//   { path: 'task/:id', component: TaskFormComponent, canActivate: [AuthGuard] },
// ];
const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'tasks', component: TasksListComponent, canActivate: [AuthGuard] },
      { path: 'new-task', component: TaskFormComponent, canActivate: [AuthGuard] },
      { path: 'task/:id', component: TaskFormComponent, canActivate: [AuthGuard] },
    ]
  },
  { path: 'login', component: LoginComponent },
  // other routes if needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }