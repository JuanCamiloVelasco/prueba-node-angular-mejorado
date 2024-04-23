import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { RegistroEventComponent } from './components/pages/registro-event/registro-event.component';
import { PaginaEventosComponent } from './components/pages/pagina-eventos/pagina-eventos.component';

export const routes: Routes = [
    {path:'', component:HomeComponent},
    {path:'buscar/:searchTerm', component:HomeComponent},
    {path:'fecha/:fecha1/:fecha2', component:HomeComponent},
    {path:'register', component:RegistroEventComponent},
    {path:'evento/:id', component:PaginaEventosComponent},
];
