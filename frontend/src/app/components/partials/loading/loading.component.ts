import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { LoadingService } from '../../../services/loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [NgIf],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {

  // Componente que mostrara el logo de "cargando cuando sea necesario"
  isLoading!: boolean;
  constructor(loadingService: LoadingService) {
    loadingService.isLoading.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
    
  }
}
