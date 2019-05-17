import { Injectable, NgModule } from '@angular/core';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { LoadingBarService } from '@ngx-loading-bar/core';

@Injectable()

export class HttpsRequestInterceptor implements HttpInterceptor {

  constructor( private loadingBarService: LoadingBarService ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let dupReq;

    dupReq = req.clone({
      headers: req.headers.set('Content-Type', 'application/json')
    });

    return next.handle(dupReq).pipe(map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        if (event.status === 200) {
          this.loadingBarService.stop();

          console.log("Requisição completada com sucesso.");
        }
      }

      return event;
    })).pipe(catchError((error: HttpErrorResponse) => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 0) {
          this.loadingBarService.stop();

          console.log("Houve um erro ao conectar no servidor, verifique sua conexão com a internet.");
        }
      }

      return throwError(error);
    }));
  }
}

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsRequestInterceptor,
      multi: true
    }
  ]
})

export class Interceptor {}
