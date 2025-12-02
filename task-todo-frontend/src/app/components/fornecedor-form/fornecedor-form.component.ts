import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FornecedorService } from '../../services/fornecedor.service';
import { Fornecedor } from '../../models/fornecedor.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fornecedor-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './fornecedor-form.component.html',
  styleUrls: ['./fornecedor-form.component.css']
})
export class FornecedorFormComponent implements OnInit {
  fornecedorForm: FormGroup;
  isEditMode = false;
  fornecedorId?: number;
  error: string | null = null;
  pageTitle = 'Novo Fornecedor';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private fornecedorService: FornecedorService
  ) {
    this.fornecedorForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      cnpj: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14), Validators.pattern('^[0-9]*$')]]
    });
  }

  ngOnInit(): void {
    this.fornecedorId = this.route.snapshot.params['id'];
    if (this.fornecedorId) {
      this.isEditMode = true;
      this.pageTitle = 'Editar Fornecedor';
      this.fornecedorService.getById(this.fornecedorId).subscribe({
        next: (data) => this.fornecedorForm.patchValue(data),
        error: (err) => {
          this.error = 'Fornecedor não encontrado.';
          console.error(err);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.fornecedorForm.invalid) {
      // Marca campos como 'touched' para exibir erros de validação
      this.fornecedorForm.markAllAsTouched();
      return;
    }

    // Cria uma cópia dos dados para não alterar o formulário
    const fornecedorData: Fornecedor = { ...this.fornecedorForm.value };
    
    // Limpa o CNPJ antes de enviar
    fornecedorData.cnpj = fornecedorData.cnpj.replace(/\D/g, '');

    if (this.isEditMode && this.fornecedorId) {
      this.fornecedorService.update(this.fornecedorId, fornecedorData).subscribe({
        next: () => this.router.navigate(['/fornecedores']),
        error: (err) => {
          this.error = 'Falha ao atualizar o fornecedor. Verifique se o CNPJ já está em uso.';
          console.error(err);
        }
      });
    } else {
      this.fornecedorService.create(fornecedorData).subscribe({
        next: () => this.router.navigate(['/fornecedores']),
        error: (err) => {
          this.error = 'Falha ao criar o fornecedor. Verifique se o CNPJ já está em uso.';
          console.error(err);
        }
      });
    }
  }

  // Novo método para limpar CNPJ em tempo real
  onCnpjInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const originalValue = input.value;
    const cleanedValue = originalValue.replace(/\D/g, '');
    
    if (originalValue !== cleanedValue) {
      this.fornecedorForm.get('cnpj')?.setValue(cleanedValue, { emitEvent: false });
    }
  }

  goBack(): void {
    this.router.navigate(['/fornecedores']);
  }
}
