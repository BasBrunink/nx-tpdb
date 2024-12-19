import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserJwtResponse, UserLoginDto, UserRegistrationDto } from '@nx-tpdb/shared';
import { Observable, tap } from 'rxjs';
import { User } from '../../model/user.entity';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private readonly http:HttpClient,
  ) { }


  register(registerDto: UserRegistrationDto): Observable<User> {
    return this.http.post<User>('http://localhost:3001/auth/register', {
      username: registerDto.username,
      password: registerDto.password
    })
  }
  login(loginData: UserLoginDto): Observable<UserJwtResponse> {

    return this.http.post<UserJwtResponse>('http://localhost:3001/api/auth/login', {
      username: loginData.username,
      password: loginData.password
    }).pipe(
      tap(
        (res:UserJwtResponse) => {
          localStorage.setItem('token', res.accessToken);
          const user: User = new User()
          user.id = res.user.username;
          user.username = res.user.username;
          user.role = res.user.role;
          localStorage.setItem('currentUser', JSON.stringify(user));

        }
      )
    )
  }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('currentUser')
  }
}
