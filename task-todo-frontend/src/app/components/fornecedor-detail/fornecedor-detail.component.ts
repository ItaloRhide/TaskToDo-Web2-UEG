import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FornecedorService } from '../../services/fornecedor.service';
import { Fornecedor } from '../../models/fornecedor.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fornecedor-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './fornecedor-detail.component.html',
  styleUrls: ['./fornecedor-detail.component.css']
})
export class FornecedorDetailComponent implements OnInit {
  fornecedor: Fornecedor | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private fornecedorService: FornecedorService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fornecedorService.getById(+id).subscribe({
        next: (data) => {
          this.fornecedor = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Falha ao carregar detalhes do fornecedor.';
          this.loading = false;
          console.error(err);
        }
      });
    }
  }
}
