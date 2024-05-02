import { NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'default-button',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './default-button.component.html',
  styleUrl: './default-button.component.css'
})
export class DefaultButtonComponent {
  // Esto es para crear un boton por default el cual usara estos inputs que serviran para ser "configurado" cuando lo necesite
  @Input()
  type: 'submit' | 'button' = 'submit';
  @Input()
  text:string= 'Submit';
  @Input()
  bgColor = '#e72929'
  @Input()
  color = 'white'
  @Input()
  fontSizeRem = 1.3;
  @Input()
  widthRem = 12;
  @Output()
  onClick = new EventEmitter();
}
