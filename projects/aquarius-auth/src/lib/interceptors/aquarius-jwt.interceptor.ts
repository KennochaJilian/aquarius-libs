import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {AquariusAuthService} from "../services";
import {Observable} from "rxjs";

@Injectable()
export class AquariusJwtInterceptor implements HttpInterceptor {

  constructor(public authService: AquariusAuthService) {
  }

  private continueRequest(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let headers = new HttpHeaders();

    const accessToken = this.authService.getToken()?.accessToken
    if(accessToken){
      headers = headers.append('Authorization', `Bearer ${accessToken}`)
    }
    headers = headers.append('Current-culture', navigator.language);
    headers = headers.append('Current-tz-offset', new Date().getTimezoneOffset().toString());
    headers = headers.append('Current-tz-timezone', Intl.DateTimeFormat().resolvedOptions().timeZone);
    req = req.clone({headers: headers, withCredentials: true});
    return next.handle(req);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.continueRequest(req, next)
  }

}
