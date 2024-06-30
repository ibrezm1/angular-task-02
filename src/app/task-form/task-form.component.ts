import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  task: any = {};
  isNewTask: boolean = true;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isNewTask = false;
      this.loadTask(+id);
    }
  }

  loadTask(id: number): void {
    this.taskService.getTask(id).subscribe(
      (data) => {
        this.task = data;
      },
      (error) => {
        console.error('Error fetching task', error);
      }
    );
  }

  saveTask(): void {
    if (this.isNewTask) {
      this.taskService.createTask(this.task).subscribe(
        () => {
          this.router.navigate(['/tasks']);
        },
        (error) => {
          console.error('Error creating task', error);
        }
      );
    } else {
      this.taskService.updateTask(this.task.id, this.task).subscribe(
        () => {
          this.router.navigate(['/tasks']);
        },
        (error) => {
          console.error('Error updating task', error);
        }
      );
    }
  }
}