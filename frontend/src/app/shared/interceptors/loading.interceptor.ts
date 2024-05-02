import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { tap } from 'rxjs';

// una variable que uso mas o menos como si fuera un true/false para mostrar y ocultar la carga
var pendingRequests = 0;

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  // injecto mi LoadingService ya que en la nueva version no existe constructor en los interceptores
  const loadingService = inject(LoadingService)

  // muestro la pantalla de carga y asigno mi pendingRequests como 1
  loadingService.showLoading();
  pendingRequests = pendingRequests + 1;
  
  // creo una funcion que Basicamente cuando haya respuesta oculto la pantalla de carga
  function handleHideLoading(){
    pendingRequests = pendingRequests - 1;
    if(pendingRequests === 0)
    loadingService.hideLoading();
  }

  return next(req).pipe(
    tap({
      next:(event) => {
        if(event.type === HttpEventType.Response) {
          handleHideLoading()
        }
      }, error: (_) => {
          handleHideLoading()
      }
    })
  );
};
