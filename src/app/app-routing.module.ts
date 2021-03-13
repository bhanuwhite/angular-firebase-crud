import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'user-info' },
  {
    path: 'user-info',
    loadChildren: () =>
      import('./modules/user-info/user-info.module').then(
        (m) => m.UserInfoModule
      ),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
