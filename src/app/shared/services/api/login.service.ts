import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionStorage } from 'ngx-store';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserModel } from '../../model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  @SessionStorage() user: UserModel;
  @SessionStorage() isAuthenticated = false;
  @SessionStorage() device = 'Web Admin';
  loginUrl = '/login';

  constructor(private http: HttpClient) {
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error.status == 401 || error.status == 403 || error.status == 404){
      throwError(error);
    }
    else if(!error.ok) {
      errMsg = 'Can\'t connect to server.';
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Promise.reject(errMsg);
  }

  loginWithUserName(userName: String, password: String): Observable<any> {
    let data = this.isEmail(userName) ? 'userEmail=' : 'userPhoneNo=';
    let urlString = environment.serverBaseUrl + 'admin/signin?' + data + userName + '&password=' + password;

    return this.http.post(urlString, {})
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  isEmail(userName: String): boolean {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(String(userName).toLowerCase());
  }
}
