import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthJWTService } from '../AuthJWT/auth-jwt.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private authJWTService: AuthJWTService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authJWTService.getToken()}`
      }
    });

    return next.handle(req).pipe(
      tap(
        event => this.handleResponse(req, event),
        error => this.handleError(req, error)
      )
    )
  }

  //actually kani nga part no need ran i nimo buhaton, pero gamit ni sya if, maghimo kag katong pareha sa sendai ba, like if unauthorized, mogawas ang modal ari nimo pagawson sample lang
  handleResponse(req: HttpRequest<any>, event: any) {
    //if success ang response wa nakay buhaton pero depende nimo magamit ra ghapon ni nimo soon.
  }

  handleError(req: HttpRequest<any>, event: any) {
    if(event.status ===  401) {
      //401, unauthorized
      //pgawson nimo ang modal dri
    }
  }
}
