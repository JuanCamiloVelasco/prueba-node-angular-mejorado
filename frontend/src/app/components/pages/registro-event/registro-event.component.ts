import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventosService } from '../../../services/eventos.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { IEventoRegister } from '../../../shared/interfaces/IEventoRegister';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { DefaultButtonComponent } from "../../partials/default-button/default-button.component";
import { NgFor } from '@angular/common';
import { tipos } from 'src/app/shared/constants/tipos';
import { InputValidationsComponent } from "../../partials/input-validations/input-validations.component";

@Component({
    selector: 'app-registro-event',
    standalone: true,
    templateUrl: './registro-event.component.html',
    styleUrl: './registro-event.component.css',
    imports: [ReactiveFormsModule, TextInputComponent, DefaultButtonComponent, RouterLink, NgFor, FormsModule, NgFor, InputValidationsComponent]
})
export class RegistroEventComponent implements OnInit{

  // creo mi fromGroup para almacenar los datos a registrar
  registerForm!:FormGroup;
  // Esta variable es para ayudar con la validacion de errores mediante el front
  isSubmited = false;
  // mi url de retorno
  returnUrl = '';

  // lista de los tipos de eventos
  tipo = tipos

  // mi constructor con los metodos a utilizar
  constructor( private formBuilder:FormBuilder, private eventoService:EventosService, private activatedRoute:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    // creo mi registerForm con las validaciones de cada campo para poder ser evaluadas en el front
    this.registerForm = this.formBuilder.group({
      nombre:['', [Validators.required, Validators.minLength(5)]],
      fecha: [Date, Validators.required],
      descripcion:['', [Validators.required, Validators.minLength(5)]],
      tipo:['', [Validators.required]]
    });

    // mi url de retorno
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  // creo mi getter llamado fc para poder ser usada en el "[control]" html
  get fc() {
    return this.registerForm.controls;
  }

  submit() {
    // cambio mi isSubmited a true para que evalue los errores en "showErrorsWhen" del html
    this.isSubmited = true;

    // obtengo los valores del registerform
    const fv = this.registerForm.value;

    // asigno cada valor de mi registerform en cada valor de mi interfaz de evento
    const evento : IEventoRegister = {
      nombre: fv.nombre,
      fecha: fv.fecha,
      descripcion: fv.descripcion,
      tipo: fv.tipo
    };

    // finalmene paso los valor a mi metodo de registrar y registro el usuario y lo llevo al inicio
    this.eventoService.register(evento).subscribe(_ => {
      this.router.navigateByUrl(this.returnUrl);
    })
  }
}

