import { Component } from '@angular/core';
import { Evento } from '../../../shared/models/Eventos';
import { EventosService } from '../../../services/eventos.service';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { SearchComponent } from '../../partials/search/search.component';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { NoEncontradoComponent } from "../../partials/no-encontrado/no-encontrado.component";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [RouterModule, NgFor, NgIf, SearchComponent, RouterLink, NoEncontradoComponent, ConfirmDialogModule]
})
export class HomeComponent{
  // Creo un arreglo que va contener todos mis eventos
  eventos:Evento[] = [];
  // Creo mi constructor para llamar los metodos que necesito
  constructor(private eventosService:EventosService, activatedRoute:ActivatedRoute,private toastrService:ToastrService, private confirmationService: ConfirmationService) {
    // Creo eventosObservable de tipo observable que contendra todos mis eventos
    let eventosObervable:Observable<Evento[]>;
    // Subscribo los params y evaluo los mismos con las condiciones para realizar cada filtro segun sea el caso
    activatedRoute.params.subscribe((params) => {
      // Evalua si la busqueda es avanzada debe tener los 3 parametros de tipo y fechas
      if(params.searchTerm && params.fecha1 && params.fecha2)
        eventosObervable = this.eventosService.getAllEventosByDateAndType(params.searchTerm, params.fecha1, params.fecha2);
      else if(params.searchTerm)
        eventosObervable = this.eventosService.getAllEventsBySearchTerm(params.searchTerm);
      else if(params.fecha1 && params.fecha2)
        eventosObervable = this.eventosService.getAllEventosByDate(params.fecha1, params.fecha2);
      // finalmene si no hay filtros entonces trae todos mis eventos
      else
        eventosObervable = eventosService.getAll();

      // finalmente subscribo los eventos para mostrar los eventos segun sea el caso (si se filtro o no)
      eventosObervable.subscribe((eventosServer) => {
        this.eventos = eventosServer;
      })
    })
  }

  // Formateo las fechas para que esten en un formato mas comodo de leer con la ayuda de moment
  fechasFormat(fecha:Date) {
    return moment(fecha).format('DD-MM-YYYY');
  }

  // creo mi funcion de eliminar el evento que recibe el id del mismo
  deleteEvento(id:string){
    // Utilizo confirmationService de PrimeNg para mostrar una ventana de confirmacion
    this.confirmationService.confirm({
      message: 'Esta seguro que quiere eliminar el evento?',
      header: 'Confirmar',
      acceptLabel: 'Si',
      rejectButtonStyleClass: 'p-button-danger',
      icon: 'pi pi-info-circle',
      defaultFocus: 'reject',
      accept: () => {
        // si la respuesta es "Si" proceso a tomar el id y lo elimino
        if(this.eventosService.deleteEventos(id).subscribe(() => { })) {
          // Utilizo Toastr para mostrar una notificacion al usuario
          this.toastrService.success('El evento se ha eliminado correctamente');
          // este codigo funciona para "actualizar" los eventos al momento de la eliminarcion
          this.eventos = this.eventos.filter(item => item.id != id);
        }
      },
      reject: () => {
        // en caso que el usuario se arrepienta muestro una notificacion de informacion
        this.toastrService.warning('El evento no se ha eliminado');
      },
    });
  }
}