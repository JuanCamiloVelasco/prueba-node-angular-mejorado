import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { EventosService } from 'src/app/services/eventos.service';
import { TextInputComponent } from "../../partials/text-input/text-input.component";
import { DefaultButtonComponent } from "../../partials/default-button/default-button.component";
import { tipos } from 'src/app/shared/constants/tipos';

@Component({
    selector: 'app-update-event',
    standalone: true,
    templateUrl: './update-event.component.html',
    styleUrl: './update-event.component.css',
    imports: [ReactiveFormsModule, FormsModule, NgIf, NgFor, TextInputComponent, DefaultButtonComponent]
})
export class UpdateEventComponent implements OnInit{
  
  // mi variable que tendra el id de mi evento
  eventoId!: any;
  // mi variable que tendra los valores del evento
  evento!: any;
  // mi variable que tendra las fechas formateadas con moment
  fecha!: any;
  // mi arreglo de errores que se llenara en caso que haya alguno
  errors: any = [];
  // mi url de retorno
  returnUrl = '';

  // lista de los tipos
  tipo = tipos

  constructor(private activatedRoute: ActivatedRoute, private eventoService:EventosService, private router:Router) {}
  ngOnInit(): void {
    // obtengo y almaceno el id con ayuda de params
    this.eventoId = this.activatedRoute.snapshot.paramMap.get('id'); 
    // llamo el metodo de getEventoById y obtendo mi evento
    this.eventoService.getEventoById(this.eventoId).subscribe(res => {
      // almaceno los valores entontrados en mi variable evento
      this.evento = res;
      // almaceno mi fecha formateada
      this.fecha = this.fechasFormat(res.fecha);
    });

    // retorno la url
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
    
  }

  // funcion para formatear fechas
  fechasFormat(fecha:Date) {
    return moment(fecha).format('YYYY-MM-DD');
  }

  actualizar() {
    // almaceno los datos nuevos en inputData
    var inputData = {
      nombre: this.evento.nombre,
      fecha: this.fecha,
      descripcion: this.evento.descripcion,
      tipo: this.evento.tipo.name,
    }

    console.log(inputData);

    // llamo mi metodo de actualizar y paso el id del evento y los valores a actualizar
    this.eventoService.update(this.eventoId, inputData).subscribe({
      next: res => {
        console.log(res);
        this.router.navigateByUrl(this.returnUrl);
      }, error: err => {
        // Utilizo el status 400 enviado desde el backend con el arreglo de errores para almacenarlos en la lista "errors"
        this.errors = err.error.controlErrores;
        console.log(this.errors);
      }
    });
  }
}
