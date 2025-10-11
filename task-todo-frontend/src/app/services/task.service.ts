import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8080/api/tasks';

  constructor(private http: HttpClient) { }

  // CRUD Básico
  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Endpoints Adicionais
  completeTask(id: number): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}/concluir`, {});
  }

  getTasksByStatus(concluida: boolean): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/status/${concluida}`);
  }

  getTasksByPriority(prioridade: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/prioridade/${prioridade}`);
  }

  searchTasksByTitle(titulo: string): Observable<Task[]> {
    const params = new HttpParams().set('titulo', titulo);
    return this.http.get<Task[]>(`${this.apiUrl}/buscar`, { params });
  }

  getTasksDueToday(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/vencimento/hoje`);
  }

  getOverdueTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/vencidas`);
  }

  getPendingTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/pendentes`);
  }

  getTasksByPeriod(dataInicio: string, dataFim: string): Observable<Task[]> {
    const params = new HttpParams()
      .set('dataInicio', dataInicio)
      .set('dataFim', dataFim);
    return this.http.get<Task[]>(`${this.apiUrl}/periodo`, { params });
  }
}
