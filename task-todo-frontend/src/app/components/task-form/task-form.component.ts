import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { CategoryService } from '../../services/category.service';
import { Task } from '../../models/task.model';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  task: Task = {
    titulo: '',
    descricao: '',
    dataVencimento: '',
    prioridade: 2,
    concluida: false,
    categoria: undefined
  };
  categories: Category[] = [];
  selectedCategoryId: number | null = null;

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(data => {
      this.categories = data;
    });
  }

  save(): void {
    if (this.selectedCategoryId) {
      const selectedCategory = this.categories.find(c => c.id === +this.selectedCategoryId!);
      if (selectedCategory) {
        this.task.categoria = selectedCategory;
      }
    }

    this.taskService.createTask(this.task).subscribe({
      next: () => this.router.navigate(['']),
      error: (err) => {
        console.error(err);
        alert('Erro ao criar tarefa. Verifique se a categoria foi selecionada.');
      }
    });
  }
}
