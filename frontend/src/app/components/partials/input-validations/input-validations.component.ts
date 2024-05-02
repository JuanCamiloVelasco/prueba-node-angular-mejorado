import { NgFor, NgIf } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

// mis mensajes de error personalizados
const VALIDATORS_MESSAGES:any = {
  required: 'No puede ser vacio',
  minlength: 'Campo muy corto',
}
@Component({
  selector: 'input-validations',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './input-validations.component.html',
  styleUrl: './input-validations.component.css'
})
export class InputValidationsComponent {
  // mis inputs que validaran los errores a travez del formcontrol en registration
  @Input()
  control!:AbstractControl;
  // la condicion y el arreglo de errores
  @Input()
  showErrosWhen:boolean = true;
  errorMessages:string[] = []

  // cada vez que algo cambie en mi input seguira evaluando las condiciones
  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidation();
  }


  ngOnInit(): void {
    this.control.statusChanges.subscribe(() => {
      this.checkValidation();
    });
    this.control.valueChanges.subscribe(() => {
      this.checkValidation();
    })
  }

  checkValidation(){
    const errors = this.control.errors;
    if(!errors){
      this.errorMessages = [];
      return;
    }

    // convierto mis errores en un arreglo para poder mapearlo y asignarlo a mi lista de errores
    const errorKeys = Object.keys(errors);
    this.errorMessages = errorKeys.map(key => VALIDATORS_MESSAGES[key]);
  }
}
