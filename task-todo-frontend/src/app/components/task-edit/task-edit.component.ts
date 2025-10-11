import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  task: Task | null = null;
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.taskService.getTaskById(this.id).subscribe({
      next: (data) => this.task = data,
      error: (err) => {
        console.error(err);
        alert('Erro ao carregar tarefa.');
      }
    });
  }

  save(): void {
    if (!this.task) return;
    this.taskService.updateTask(this.id, this.task).subscribe({
      next: () => this.router.navigate(['/tasks']),
      error: (err) => {
        console.error(err);
        alert('Erro ao atualizar tarefa.');
      }
    });
  }
}
