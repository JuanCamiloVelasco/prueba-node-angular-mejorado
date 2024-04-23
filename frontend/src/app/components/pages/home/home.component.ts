import { Component, OnInit } from '@angular/core';
import { Evento } from '../../../shared/models/Eventos';
import { EventosService } from '../../../services/eventos.service';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { SearchComponent } from '../../partials/search/search.component';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { NoEncontradoComponent } from "../../partials/no-encontrado/no-encontrado.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [RouterModule, NgFor, NgIf, SearchComponent, RouterLink, NoEncontradoComponent]
})
export class HomeComponent{
  fechas: any;
  eventos:Evento[] = [];
  constructor(private eventosService:EventosService, activatedRoute:ActivatedRoute,private toastrService:ToastrService, private router:Router) {
    let eventosObervable:Observable<Evento[]>;
    activatedRoute.params.subscribe((params) => {
      if(params.searchTerm)
        eventosObervable = this.eventosService.getAllEventsBySearchTerm(params.searchTerm);
      else if(params.fecha1 && params.fecha2)
        eventosObervable = this.eventosService.getAllEventosByDate(params.fecha1, params.fecha2);
      else
        eventosObervable = eventosService.getAll();

        eventosObervable.subscribe((eventosServer) => {
          this.eventos = eventosServer;
        })
    })
  }
  fechasFormat(fecha:Date) {
    return moment(fecha).format('DD-MM-YYYY');
  }
  deleteEvento(id:string){
    if(this.eventosService.deleteEventos(id).subscribe(() => { })) {
      this.toastrService.success('El evento se ha eliminado correctamente');
      this.eventos = this.eventos.filter(item => item.id != id);
    }
  }
}
