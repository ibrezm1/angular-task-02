import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';

import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { TaskService } from './task.service';
import { LoginComponent } from './login/login.component'; // Import your service


@NgModule({
  declarations: [
    AppComponent,
    TasksListComponent,
    TaskFormComponent,
    TaskDetailComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule, // Include HttpClientModule here
    AppRoutingModule
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
