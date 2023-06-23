import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from './user';

interface UserResponse {
  _embedded: {
    users: UserDTO[];
  };
}

interface UserDTO {
  name: string;
  _links: {
    self: {
      href: string;
    };
  };
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) { }

getUsers(): Observable<User[]> {
  return this.http.get<UserResponse>(this.apiUrl)
    .pipe(
      map(response => {
        return response._embedded.users.map(dto => {
          const idMatch = dto._links.self.href.match(/\/(\d+)$/);
          const id = idMatch ? +idMatch[1] : 0;
          return { id, name: dto.name };
        });
      })
    );
}

addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
  
}