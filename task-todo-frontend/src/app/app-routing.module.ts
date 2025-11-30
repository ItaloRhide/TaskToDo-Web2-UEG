import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskEditComponent } from './components/task-edit/task-edit.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { CategoryListComponent } from './components/category-list/category-list.component';

const routes: Routes = [
  { path: '', component: TaskListComponent },
  { path: 'nova-tarefa', component: TaskFormComponent },
  { path: 'editar-tarefa/:id', component: TaskEditComponent },
  { path: 'category', component: CategoryListComponent },
  { path: 'category/novo', component: CategoryFormComponent },
  { path: 'category/editar/:id', component: CategoryFormComponent },
  { path: '**', redirectTo: '' } // rota padrão se digitar algo errado
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
