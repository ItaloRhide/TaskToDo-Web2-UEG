import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { Observable, catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  // --- Estado do Componente ---
  public tasks: Task[] = []; // Lista mestra de tarefas (fonte da verdade)
  public filteredTasks: Task[] = []; // Lista exibida na tela
  public loading = true;
  public error: string | null = null;
  public pageTitle = 'Atividades';

  // --- Filtros ---
  public searchTitle = '';
  public filterType = 'all';

  private categoryId: number | null = null;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.categoryId = params['categoryId'] ? +params['categoryId'] : null;
      this.pageTitle = this.categoryId ? 'Atividades da Categoria' : 'Todas as Atividades';
      this.loadData();
    });
  }

  /**
   * Ponto de entrada central para carregar dados.
   * Decide qual fonte de tarefas usar (todas ou por categoria) e lida com o estado de loading/erro.
   */
  private loadData(): void {
    this.loading = true;
    this.error = null;

    const tasksObservable: Observable<Task[]> = this.categoryId
      ? this.taskService.getByCategoryId(this.categoryId)
      : this.taskService.getAllTasks();

    tasksObservable.pipe(
      tap(data => {
        this.tasks = data ?? [];
        this.applyFilters(); // Aplica os filtros aos dados recém-carregados
        this.loading = false;
      }),
      catchError(err => {
        console.error(err);
        this.error = this.categoryId
          ? 'Erro ao carregar tarefas da categoria.'
          : 'Erro ao carregar tarefas.';
        this.tasks = [];
        this.filteredTasks = [];
        this.loading = false;
        return of([]); // Retorna um observable vazio para completar o fluxo
      })
    ).subscribe();
  }

  /**
   * Aplica os filtros de status e busca sobre a lista mestra `tasks`.
   * Este é o único método que deve modificar `filteredTasks`.
   */
  public applyFilters(): void {
    let tempTasks = [...this.tasks];

    // 1. Filtro por status
    if (this.filterType !== 'all') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      switch (this.filterType) {
        case 'pending':
          tempTasks = tempTasks.filter(t => !t.concluida);
          break;
        case 'completed':
          tempTasks = tempTasks.filter(t => t.concluida);
          break;
        case 'today':
          tempTasks = tempTasks.filter(t => t.dataVencimento === this.formatDate(today));
          break;
        case 'overdue':
          tempTasks = tempTasks.filter(t =>
            t.dataVencimento && new Date(t.dataVencimento) < today && !t.concluida
          );
          break;
      }
    }

    // 2. Filtro por título
    const searchTerm = this.searchTitle.trim().toLowerCase();
    if (searchTerm) {
      tempTasks = tempTasks.filter(t => t.titulo.toLowerCase().includes(searchTerm));
    }

    this.filteredTasks = tempTasks;
  }

  /**
   * Exclui uma tarefa e recarrega os dados.
   */
  public deleteTask(id?: number): void {
    if (!id || !confirm('Tem certeza que deseja excluir esta tarefa?')) {
      return;
    }

    this.taskService.deleteTask(id).subscribe({
      next: () => this.loadData(), // Recarrega os dados mantendo o contexto (categoria)
      error: (err) => {
        console.error(err);
        this.showTemporaryError('Erro ao excluir tarefa.');
      }
    });
  }

  /**
   * Alterna o status de conclusão de uma tarefa.
   */
  public toggleComplete(task: Task): void {
    if (!task.id) return;

    const updatedTask = { ...task, concluida: !task.concluida };
    this.taskService.updateTask(task.id, updatedTask).subscribe({
      next: (response) => {
        // Atualiza a tarefa na lista mestra para refletir a mudança
        const index = this.tasks.findIndex(t => t.id === response.id);
        if (index > -1) {
          this.tasks[index] = response;
          this.applyFilters(); // Re-aplica os filtros para atualizar a UI
        }
      },
      error: (err) => {
        console.error(err);
        this.showTemporaryError('Erro ao atualizar status da tarefa.');
      }
    });
  }

  // --- Funções Auxiliares ---

  public getPrioridadeLabel(prioridade: number): string {
    switch (prioridade) {
      case 4: return 'Alta';
      case 3: return 'Média';
      case 2: return 'Baixa';
      case 1: return 'Muito baixa';
      default: return 'Desconhecida';
    }
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  private showTemporaryError(message: string): void {
    this.error = message;
    setTimeout(() => this.error = null, 5000);
  }
}
