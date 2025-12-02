import { Component, OnInit } from '@angular/core';
import { Fornecedor } from '../../models/fornecedor.model';
import { FornecedorService } from '../../services/fornecedor.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fornecedor-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './fornecedor-list.component.html',
  styleUrls: ['./fornecedor-list.component.css']
})
export class FornecedorListComponent implements OnInit {
  fornecedores: Fornecedor[] = [];
  error: string | null = null;
  loading = true;

  constructor(private fornecedorService: FornecedorService) { }

  ngOnInit(): void {
    this.loadFornecedores();
  }

  loadFornecedores(): void {
    this.loading = true;
    this.fornecedorService.getAll().subscribe({
      next: (data) => {
        this.fornecedores = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Falha ao carregar fornecedores.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  deleteFornecedor(id: number): void {
    if (confirm('Tem certeza que deseja excluir este fornecedor?')) {
      this.fornecedorService.delete(id).subscribe({
        next: () => {
          this.fornecedores = this.fornecedores.filter(f => f.id !== id);
        },
        error: (err) => {
          this.error = 'Falha ao excluir fornecedor.';
          console.error(err);
        }
      });
    }
  }
}
