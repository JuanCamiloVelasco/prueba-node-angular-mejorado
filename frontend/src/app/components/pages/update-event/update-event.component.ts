import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { EventosService } from 'src/app/services/eventos.service';
import { TextInputComponent } from "../../partials/text-input/text-input.component";
import { DefaultButtonComponent } from "../../partials/default-button/default-button.component";
import { tipos } from 'src/app/shared/constants/tipos';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-update-event',
    standalone: true,
    templateUrl: './update-event.component.html',
    styleUrl: './update-event.component.css',
    imports: [ReactiveFormsModule, FormsModule, NgIf, NgFor, TextInputComponent, DefaultButtonComponent]
})
export class UpdateEventComponent implements OnInit{
  
  eventoId!: any;
  evento!: any;
  fecha!: any;

  returnUrl = '';

  isLoading: boolean = false;

  tipo = tipos

  constructor(private activatedRoute: ActivatedRoute, private eventoService:EventosService, private router:Router, private toastrService:ToastrService) {}
  ngOnInit(): void {
    this.eventoId = this.activatedRoute.snapshot.paramMap.get('id');    
    this.eventoService.getEventoById(this.eventoId).subscribe(res => {
      this.evento = res;
      this.fecha = this.fechasFormat(res.fecha);
    });
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
    
  }

  

  fechasFormat(fecha:Date) {
    return moment(fecha).format('YYYY-MM-DD');
  }

  actualizar() {
    var inputData = {
      nombre: this.evento.nombre,
      fecha: this.evento.fecha,
      descripcion: this.evento.descripcion,
      tipo: this.evento.tipo.name,
    }

    if(inputData.nombre === "" || inputData.descripcion == "") {
      this.toastrService.error(
        'Todos los campos son obligatorios'
      )
      return;
    }
    if (inputData.nombre.length < 5 || inputData.descripcion.length < 5) {
      this.toastrService.error(
        'Campos muy cortos'
      )
      return;
    }

    console.log(inputData);

    this.eventoService.update(this.eventoId, inputData).subscribe({
      next: res => {
        console.log(res);
        this.router.navigateByUrl(this.returnUrl);
      }, error: err => {
        console.log(inputData);
      }
    });
  }
}
