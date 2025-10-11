import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  task: Task = { titulo: '', descricao: '', dataVencimento: '', prioridade: 2, concluida: false };

  constructor(private taskService: TaskService, private router: Router) {}

  save(): void {
    this.taskService.createTask(this.task).subscribe({
      next: () => this.router.navigate(['/tasks']),
      error: (err) => {
        console.error(err);
        alert('Erro ao criar tarefa.');
      }
    });
  }
}
