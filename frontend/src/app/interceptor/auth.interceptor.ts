import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor( private cookieService: CookieService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    debugger
    const token = this.cookieService.get("access_token");

    const cookieOptions = {
      domain: "localhost",
      maxAge: 24 * 60 * 60 * 1000,
      // httpOnly: true,
      sameSite: "none",
      secure: true
  }

    const authReq = req.clone({
      headers: req.headers.set('Cookie', `access_token=${token};${cookieOptions}`),
      withCredentials: true,
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}