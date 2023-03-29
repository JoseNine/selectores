import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //generate lazy loaded routes for paises module
  { path: 'selector', 
  loadChildren: () => import('./paises/paises.module').then(m => m.PaisesModule) 
},
{
  path: '**', redirectTo: 'selector'
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
