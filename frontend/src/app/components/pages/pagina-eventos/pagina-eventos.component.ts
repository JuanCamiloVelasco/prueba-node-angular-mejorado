import { Component } from '@angular/core';
import { Evento } from '../../../shared/models/Eventos';
import { EventosService } from '../../../services/eventos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import moment from 'moment';
import { NoEncontradoComponent } from "../../partials/no-encontrado/no-encontrado.component";

@Component({
    selector: 'app-pagina-eventos',
    standalone: true,
    templateUrl: './pagina-eventos.component.html',
    styleUrl: './pagina-eventos.component.css',
    imports: [NgIf, NoEncontradoComponent]
})
export class PaginaEventosComponent {
  // creo mi variable de evento
  evento!: Evento;
  constructor(activatedRoute:ActivatedRoute, eventosService:EventosService, private router: Router) {
    activatedRoute.params.subscribe((params) => {
      // obtengo mi evento por id para mostrar su infromacion
      if(params.id)
        eventosService.getEventoById(params.id).subscribe(eventoServer => {
          this.evento = eventoServer
        });
    })
  }

  // Formateo la fechaspara que sean mas faciles de leer con la ayuda de moment
  fechasFormat(fecha:Date) {
    return moment(fecha).format('DD-MM-YYYY');
  }
}
