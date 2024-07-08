import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {
  tasks: any[] = [];
  currentPage = 1;
  totalPages = 1;
  limit = 10;
  search = '';

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks(this.currentPage, this.limit, this.search).subscribe(
      (data: any) => {
        this.tasks = data.tasks;
        this.totalPages = Math.ceil(data.totalCount / this.limit);
      },
      (error) => {
        console.error('Error fetching tasks', error);
      }
    );
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadTasks();
    }
  }

  onSearchChange(event: Event): void {
    this.search = (event.target as HTMLInputElement).value;
    this.currentPage = 1;
    this.loadTasks();
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(
      () => {
        this.tasks = this.tasks.filter(task => task.id !== id);
      },
      (error) => {
        console.error('Error deleting task', error);
      }
    );
  }
}
