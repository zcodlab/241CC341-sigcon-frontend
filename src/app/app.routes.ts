import { PrincipalComponent } from './component/principal/principal.component';
import { Routes } from '@angular/router';
import { RegistrarPersonaComponent } from './component/registrar-persona/registrar-persona.component';

export const routes: Routes = [
  { path: '', redirectTo: '/principal', pathMatch: 'full' },
  { path: 'principal', component: PrincipalComponent },
  { path: 'registrar-persona', component: RegistrarPersonaComponent },
];
