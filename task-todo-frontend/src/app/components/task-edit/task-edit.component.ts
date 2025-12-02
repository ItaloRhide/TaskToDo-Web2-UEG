import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { CategoryService } from '../../services/category.service';
import { FornecedorService } from '../../services/fornecedor.service';
import { Task } from '../../models/task.model';
import { Category } from '../../models/category.model';
import { Fornecedor } from '../../models/fornecedor.model';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  task: Task | null = null;
  id!: number;
  categories: Category[] = [];
  fornecedores: Fornecedor[] = [];
  selectedCategoryId: number | null = null;
  selectedFornecedorIds: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private categoryService: CategoryService,
    private fornecedorService: FornecedorService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    // Load categories
    this.categoryService.getAll().subscribe(data => {
      this.categories = data;
    });

    // Load suppliers
    this.fornecedorService.getAll().subscribe(data => {
      this.fornecedores = data;
    });

    // Load task data
    this.taskService.getTaskById(this.id).subscribe({
      next: (data) => {
        this.task = data;
        if (this.task.categoria) {
          this.selectedCategoryId = this.task.categoria.id!;
        }
        if (this.task.fornecedores) {
          this.selectedFornecedorIds = this.task.fornecedores.map(f => f.id!);
        }
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao carregar tarefa.');
      }
    });
  }

  save(): void {
    if (!this.task) return;

    if (this.selectedCategoryId) {
      const selectedCategory = this.categories.find(c => c.id === +this.selectedCategoryId!);
      if (selectedCategory) {
        this.task.categoria = { id: selectedCategory.id, nome: selectedCategory.nome, descricao: selectedCategory.descricao };
      } else {
        this.task.categoria = undefined; // Or throw an error if category is mandatory
      }
    } else {
      this.task.categoria = undefined;
    }

    if (this.selectedFornecedorIds && this.selectedFornecedorIds.length > 0) {
      this.task.fornecedores = this.selectedFornecedorIds.map(id => ({ id: id, nome: '', cnpj: '' }));
    } else {
      this.task.fornecedores = [];
    }

    this.taskService.updateTask(this.id, this.task).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        console.error(err);
        alert('Erro ao atualizar tarefa. Verifique os campos obrigatórios.');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
