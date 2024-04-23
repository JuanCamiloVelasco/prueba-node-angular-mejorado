import { NgFor, NgIf } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

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
  @Input()
  control!:AbstractControl;
  @Input()
  showErrosWhen:boolean = true;
  errorMessages:string[] = []

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


    const errorKeys = Object.keys(errors);
    this.errorMessages = errorKeys.map(key => VALIDATORS_MESSAGES[key]);
  }
}
