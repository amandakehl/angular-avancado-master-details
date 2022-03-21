import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryListComponent } from './category-list/category-list.component';

const routes: Routes = [
  { path: '', component: CategoryListComponent }, // '' é categories do app-routing
  { path: 'new', component: CategoryFormComponent },
  { path: ':id/edit', component: CategoryFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CategoriesRoutingModule { }

// nomedosite.com/categories => list (master)
// nomedosite.com/categories/new => form (detail)
// nomedosite.com/categories/:id/edit => form (detail)