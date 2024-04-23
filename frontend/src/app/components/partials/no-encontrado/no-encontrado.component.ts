import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-no-encontrado',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './no-encontrado.component.html',
  styleUrl: './no-encontrado.component.css'
})
export class NoEncontradoComponent {
  @Input()
  visible = false;

  @Input()
  mensajeNoEncontrado = "Sin resultados!";

  @Input()
  resetLinkText = "Reset";

  @Input()
  resetLinkRoute = "/";
}
