import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Evento } from '../shared/models/Eventos';
import { EVENTLOGS_BY_ID_URL, EVENTLOGS_URL, EVENTOS_DELETE_URL, EVENTOS_SEARCH_FECHA_URL, EVENTOS_SEARCH_TIPO_FECHA_URL, EVENTOS_SEARCH_TIPO_URL, EVENTO_REGISTER_URL, EVENTO_UPDATE_URL } from '../shared/constants/urls';
import { IEventoRegister } from '../shared/interfaces/IEventoRegister';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  constructor(private http:HttpClient, private toastrService:ToastrService) { }

  // CRUD
  // Obtener todos los eventos
  getAll(): Observable<Evento[]>{
    return this.http.get<Evento[]>(EVENTLOGS_URL);
  }
  // Obtener eventos por ID
  getEventoById(eventoId:string): Observable <Evento>{
    return this.http.get<Evento>(EVENTLOGS_BY_ID_URL + eventoId);
  }
  // Eliminar eventos por ID
  deleteEventos(eventoId:string): Observable <Evento>{
    return this.http.delete<Evento>(EVENTOS_DELETE_URL + eventoId);
  }
  // Registrar eventos
  register(eventoRegister:IEventoRegister): Observable<Evento>{
    return this.http.post<Evento>(EVENTO_REGISTER_URL, eventoRegister).pipe(
      tap({
        next: (evento) => {
          this.toastrService.success(
            `Se ha registrado el evento "${evento.nombre}" correctamente`,
            'Registro exitoso'
          )
        }, error: (errorResponse) => {
          // Extraigo y envio los errores desde el backend para mostrarlos en el front
          errorResponse.error.mensaje.forEach((x: string | undefined) => this.toastrService.error(x));
        }
      })
    );
  }
  // Actualizar eventos
  update(eventoId:string,eventoRegister:IEventoRegister): Observable<Evento>{
    return this.http.put<Evento>(EVENTO_UPDATE_URL + eventoId, eventoRegister).pipe(
      tap({
        next: (evento) => {
          this.toastrService.success(
            `Se ha actualizado el evento "${evento.nombre}" correctamente`,
            'Actualizacion exitosa'
          )
        }, error: (errorResponse) => {
          console.log(errorResponse);
          // Extraigo y envio los errores desde el backend para mostrarlos en el front
          errorResponse.error.mensaje.forEach((x: string | undefined) => this.toastrService.error(x));
        }
      })
    );
  }

  // FILTROS

  // Filtro de eventos por tipo
  getAllEventsBySearchTerm(searchTerm:string){
    return this.http.get<Evento[]>(EVENTOS_SEARCH_TIPO_URL + searchTerm);
  }
  // Filtro de eventos por fecha
  getAllEventosByDate(fecha1:string, fecha2:string): Observable <Evento[]>{
    return this.http.get<Evento[]>(EVENTOS_SEARCH_FECHA_URL + fecha1 + "/" + fecha2);
  }
  // Filtro de eventos por tipo y fecha
  getAllEventosByDateAndType(searchTerm:string, fecha1:string, fecha2:string): Observable <Evento[]>{
    return this.http.get<Evento[]>(EVENTOS_SEARCH_TIPO_FECHA_URL + searchTerm + "/" + fecha1 + "/" + fecha2);
  }
}
