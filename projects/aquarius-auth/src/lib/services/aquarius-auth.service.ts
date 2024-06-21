import {Inject, Injectable} from '@angular/core';
import {AquariusToken} from "../core/classes";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AquariusAuthService {

  constructor(@Inject('env') private env: any) {
  }
  public logout$ = new Subject();

  public isConnected() : boolean {
    return this.getToken() != null
  }
  public getToken(): AquariusToken | null{
    const token = this.getTokenFromStorage();
    if(token == null || Date.parse(token.expiredAt) < Date.now()){
      localStorage.removeItem('token')
      return null;
    }
    return token;
  }


  private getTokenFromStorage(): AquariusToken | null {
    const token = localStorage.getItem('token');
    if(token){
      return JSON.parse(token)
    }
    return null
  }
  public setToken(accessToken: string, expiredAt:Date){
    const token = {accessToken, expiredAt}
    localStorage.setItem('token', JSON.stringify(token));
  }

  // public logout() : Observable<any>{
  //   return this.apiService.logout()
  // }

  public removeToken(){
    localStorage.removeItem('token')
  }
}
