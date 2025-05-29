import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { 
    //Get the logged user from the authentication service
    const loggedUser = this.authService.getLoggedUser();

    //If there is a logged user, clone the request and add the user's email to the header
    if (loggedUser) {
      const clonedRequest = req.clone({
        setHeaders: {
        'X-User-Email': loggedUser.email,
        }
      });

      //Send the cloned request with the added header
      console.log('Intercepted HTTP call', clonedRequest);
      return next.handle(clonedRequest);
    }

    //If there is no logged user, proceed with the original request
    console.log('Intercepted HTTP call without user', req);
    return next.handle(req);
  }
}


