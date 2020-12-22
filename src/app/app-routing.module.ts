import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowDetailComponent } from './show-detail/show-detail.component';
import { ShowErrorComponent } from './show-error/show-error.component';
import { ShowListComponent } from './show-list/show-list.component';
import { ShowMoreListComponent } from './show-more-list/show-more-list.component';

const routes: Routes = [
  { path: 'showList', component: ShowListComponent },
  { path: '', redirectTo: 'showList', pathMatch: 'full' },
  { path: 'showDetails/:id', component: ShowDetailComponent },
  { path: 'showMoreList/:genre', component: ShowMoreListComponent },
  { path: '**', component: ShowErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
