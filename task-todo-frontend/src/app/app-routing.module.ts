import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskEditComponent } from './components/task-edit/task-edit.component';

const routes: Routes = [
  { path: '', component: TaskListComponent },
  { path: 'nova-tarefa', component: TaskFormComponent },
  { path: 'editar-tarefa/:id', component: TaskEditComponent },
  { path: '**', redirectTo: '' } // rota padrão se digitar algo errado
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
