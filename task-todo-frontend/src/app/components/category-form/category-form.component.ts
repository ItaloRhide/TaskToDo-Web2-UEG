import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
})
export class CategoryFormComponent implements OnInit, OnDestroy {

  category: Category = { nome: '', descricao: '' };
  id!: number;
  isEdit = false;
  loading = false;
  error = '';

  private _errorTimeoutId: any = null;
  private readonly ERROR_AUTO_HIDE_MS = 5000;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.isEdit = !!this.id;

    if (this.isEdit) {
      this.loading = true;
      this.categoryService.getById(this.id).subscribe({
        next: (c) => {
          this.category = c;
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.showTemporaryError('Erro ao carregar a categoria para edição.');
          this.loading = false;
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this._errorTimeoutId) {
      clearTimeout(this._errorTimeoutId);
    }
  }

  closeError(): void {
    this.error = '';
    if (this._errorTimeoutId) {
      clearTimeout(this._errorTimeoutId);
    }
  }

  showTemporaryError(message: string): void {
    this.error = message;
    if (this._errorTimeoutId) {
      clearTimeout(this._errorTimeoutId);
    }
    this._errorTimeoutId = setTimeout(() => {
      this.error = '';
    }, this.ERROR_AUTO_HIDE_MS);
  }

  save() {
    this.loading = true;
    const operation = this.isEdit
      ? this.categoryService.update(this.id, this.category)
      : this.categoryService.create(this.category);

    operation.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/category']);
      },
      error: (err) => {
        console.error(err);
        this.showTemporaryError(this.isEdit ? 'Erro ao atualizar categoria.' : 'Erro ao criar categoria.');
        this.loading = false;
      }
    });
  }
}
