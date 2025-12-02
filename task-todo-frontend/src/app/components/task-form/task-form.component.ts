import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { CategoryService } from '../../services/category.service';
import { FornecedorService } from '../../services/fornecedor.service';
import { Task } from '../../models/task.model';
import { Category } from '../../models/category.model';
import { Fornecedor } from '../../models/fornecedor.model';

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
    categoria: undefined,
    fornecedores: []
  };
  categories: Category[] = [];
  fornecedores: Fornecedor[] = [];
  selectedCategoryId: number | null = null;
  selectedFornecedorIds: number[] = [];

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService,
    private fornecedorService: FornecedorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(data => {
      this.categories = data;
    });
    this.fornecedorService.getAll().subscribe(data => {
      this.fornecedores = data;
    });
  }

  save(): void {
    if (this.selectedCategoryId) {
      const selectedCategory = this.categories.find(c => c.id === +this.selectedCategoryId!);
      if (selectedCategory) {
        this.task.categoria = { id: selectedCategory.id, nome: selectedCategory.nome, descricao: selectedCategory.descricao };
      }
    }

    if (this.selectedFornecedorIds && this.selectedFornecedorIds.length > 0) {
      this.task.fornecedores = this.selectedFornecedorIds.map(id => ({ id: id, nome: '', cnpj: '' }));
    } else {
      this.task.fornecedores = [];
    }

    this.taskService.createTask(this.task).subscribe({
      next: () => this.router.navigate(['']),
      error: (err) => {
        console.error(err);
        alert('Erro ao criar tarefa. Verifique os campos obrigatórios.');
      }
    });
  }
}
