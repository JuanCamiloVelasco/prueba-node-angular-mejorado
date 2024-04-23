import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputContainerComponent } from '../input-container/input-container.component';
import { InputValidationsComponent } from '../input-validations/input-validations.component';

@Component({
  selector: 'text-input',
  standalone: true,
  imports: [InputContainerComponent, InputValidationsComponent, ReactiveFormsModule],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.css'
})
export class TextInputComponent {
  @Input()
  control!:AbstractControl;
  @Input()
  showErrorsWhen:boolean = true;
  @Input()
  label!:string;
  @Input()
  select!:string;
  @Input()
  type: 'text' | 'date' | 'text' | 'text' = 'text';

  get formControl() {
    return this.control as FormControl
  }
}
