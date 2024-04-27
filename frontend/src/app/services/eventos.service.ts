import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Evento } from '../shared/models/Eventos';
import { EVENTLOGS_BY_ID_URL, EVENTLOGS_URL, EVENTOS_DELETE_URL, EVENTOS_SEARCH_FECHA_URL, EVENTOS_SEARCH_TIPO_URL, EVENTO_REGISTER_URL, EVENTO_UPDATE_URL } from '../shared/constants/urls';
import { IEventoRegister } from '../shared/interfaces/IEventoRegister';
import { ToastrService } from 'ngx-toastr';


const EVENTO_KEY = 'Evento'
@Injectable({
  providedIn: 'root'
})
export class EventosService {

  constructor(private http:HttpClient, private toastrService:ToastrService) { }

  getAll(): Observable<Evento[]>{
    return this.http.get<Evento[]>(EVENTLOGS_URL);
  }

  getAllEventsBySearchTerm(searchTerm:string){
    return this.http.get<Evento[]>(EVENTOS_SEARCH_TIPO_URL + searchTerm);
  }

  getAllEventosByDate(fecha1:string, fecha2:string): Observable <Evento[]>{
    return this.http.get<Evento[]>(EVENTOS_SEARCH_FECHA_URL + fecha1 + "/" + fecha2);
  }

  getEventoById(eventoId:string): Observable <Evento>{
    return this.http.get<Evento>(EVENTLOGS_BY_ID_URL + eventoId);
  }

  deleteEventos(eventoId:string): Observable <Evento>{
    return this.http.delete<Evento>(EVENTOS_DELETE_URL + eventoId);
  }

  register(eventoRegister:IEventoRegister): Observable<Evento>{
    return this.http.post<Evento>(EVENTO_REGISTER_URL, eventoRegister).pipe(
      tap({
        next: (evento) => {
          this.toastrService.success(
            `Se ha registrado el evento ${evento.nombre} correctamente`,
            'Registro exitoso'
          )
        }, error: (errorResponse) => {
          console.log(errorResponse);
          this.toastrService.error('Registro fallido')
        }
      })
    );
  }

  update(eventoId:string,eventoRegister:IEventoRegister): Observable<Evento>{
    return this.http.put<Evento>(EVENTO_UPDATE_URL + eventoId, eventoRegister).pipe(
      tap({
        next: (evento) => {
          this.toastrService.success(
            `Se ha actualizado el ${evento.nombre} correctamente`,
            'Actualizacion exitosa'
          )
        }, error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Actualizacion fallida')
        }
      })
    );
  }
}
