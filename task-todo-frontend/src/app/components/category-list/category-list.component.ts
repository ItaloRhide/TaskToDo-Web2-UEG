import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
})
export class CategoryListComponent implements OnInit, OnDestroy {

  categories: Category[] = [];
  loading = false;
  error = '';

  private _errorTimeoutId: any = null;
  private readonly ERROR_AUTO_HIDE_MS = 5000; // 5 segundos

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCategories();
  }

  ngOnDestroy(): void {
    if (this._errorTimeoutId) {
      clearTimeout(this._errorTimeoutId);
      this._errorTimeoutId = null;
    }
  }

  /** Fecha o alerta manualmente (botão X) */
  closeError(): void {
    this.error = '';
    if (this._errorTimeoutId) {
      clearTimeout(this._errorTimeoutId);
      this._errorTimeoutId = null;
    }
  }

  /** Mostra um erro temporário e fecha automaticamente */
  showTemporaryError(message: string): void {
    if (this._errorTimeoutId) {
      clearTimeout(this._errorTimeoutId);
      this._errorTimeoutId = null;
    }
    this.error = message;
    this._errorTimeoutId = setTimeout(() => {
      this.error = '';
      this._errorTimeoutId = null;
    }, this.ERROR_AUTO_HIDE_MS);
  }

  loadCategories() {
    this.loading = true;
    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories = data ?? [];
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.showTemporaryError('Erro ao carregar categorias.');
        this.loading = false;
      }
    });
  }

  create() {
    this.router.navigate(['/category/novo']);
  }

  edit(id: number) {
    this.router.navigate(['/category/editar', id]);
  }

  viewTasks(categoryId: number) {
    this.router.navigate(['/tasks'], { queryParams: { categoryId: categoryId } });
  }

  delete(id: number) {
    if (confirm('Deseja realmente excluir esta categoria?')) {
      this.categoryService.delete(id).subscribe(() => {
        this.loadCategories();
      });
    }
  }
}
