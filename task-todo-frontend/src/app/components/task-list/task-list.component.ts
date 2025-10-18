import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})

export class TaskListComponent implements OnInit, OnDestroy {

  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  newTask: Task = { titulo: '', descricao: '', dataVencimento: '', prioridade: 2, concluida: false };
  selectedTask: Task | null = null;

  showForm = false;
  searchTitle = '';
  filterType = 'all';
  loading = false;
  error = '';

  private _errorTimeoutId: any = null;
  private readonly ERROR_AUTO_HIDE_MS = 5000; // 5 segundos

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
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

  /** Carrega todas as tarefas */
  loadTasks(): void {
    this.loading = true;
    this.taskService.getAllTasks().subscribe({
      next: (data) => {
        this.tasks = data ?? [];
        this.filteredTasks = [...this.tasks];
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.showTemporaryError('Erro ao carregar tarefas.');
        this.loading = false;
      }
    });
  }

  /** Editar uma tarefa */
  editTask(task: Task): void {
    this.selectedTask = task;
    this.newTask = { ...task };
    this.showForm = true;
  }

  /** Criar ou atualizar uma tarefa */
  saveTask(): void {
    if (this.selectedTask && this.selectedTask.id) {
      const id = this.selectedTask.id;
      const payload = { ...this.newTask, id };
      this.taskService.updateTask(id, payload).subscribe({
        next: () => {
          this.resetForm();
          this.loadTasks();
        },
        error: (err) => {
          console.error(err);
          this.showTemporaryError('Erro ao atualizar tarefa.');
        }
      });
    } else {
      this.taskService.createTask(this.newTask).subscribe({
        next: () => {
          this.resetForm();
          this.loadTasks();
        },
        error: (err) => {
          console.error(err);
          this.showTemporaryError('Erro ao criar tarefa.');
        }
      });
    }
  }

  /** Deletar tarefa */
  deleteTask(id?: number): void {
    if (!id) return;
    if (!confirm('Tem certeza que deseja excluir esta tarefa?')) return;
    this.taskService.deleteTask(id).subscribe({
      next: () => this.loadTasks(),
      error: (err) => {
        console.error(err);
        this.showTemporaryError('Erro ao excluir tarefa.');
      }
    });
  }

  /** Resetar o formulário */
  resetForm(): void {
    this.showForm = false;
    this.selectedTask = null;
    this.newTask = { titulo: '', descricao: '', dataVencimento: '', prioridade: 2, concluida: false };
  }

  /** Buscar tarefas pelo título */
  searchByTitle(): void {
    const term = this.searchTitle?.trim().toLowerCase() || '';
    if (!term) {
      this.filteredTasks = [...this.tasks];
      return;
    }
    this.filteredTasks = this.tasks.filter(t => (t.titulo || '').toLowerCase().includes(term));
  }

  /** Aplicar filtros de status */
  applyFilter(): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    switch (this.filterType) {
      case 'pending':
        this.filteredTasks = this.tasks.filter(t => !t.concluida);
        break;
      case 'completed':
        this.filteredTasks = this.tasks.filter(t => !!t.concluida);
        break;
      case 'today':
        this.filteredTasks = this.tasks.filter(t => t.dataVencimento === today.toISOString().split('T')[0]);
        break;
      case 'overdue':
        this.filteredTasks = this.tasks.filter(t => !!t.dataVencimento && new Date(t.dataVencimento) < today && !t.concluida);
        break;
      default:
        this.filteredTasks = [...this.tasks];
    }
  }

  /** Alterna o status de concluída (checkbox) */
  toggleComplete(task: Task): void {
    const updatedTask = { ...task, concluida: !task.concluida };

    this.taskService.updateTask(task.id!, updatedTask).subscribe({
      next: () => {
        task.concluida = updatedTask.concluida; // Atualiza localmente sem reload
      },
      error: (err) => {
        console.error(err);
        this.showTemporaryError('Erro ao atualizar status da tarefa.');
      }
    });
  }

  /** Retorna o rótulo da prioridade */
  getPrioridadeLabel(prioridade: number | undefined): string {
    if (!prioridade) return 'Desconhecida';
    if (prioridade === 4) return 'Alta';
    if (prioridade === 3) return 'Média';
    if (prioridade === 2) return 'Baixa';
    return 'Muito baixa';
  }
}
