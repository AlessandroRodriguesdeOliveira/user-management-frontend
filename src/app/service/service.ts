import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../domain/User';

@Injectable({
  providedIn: 'root',
})
export class Service {

  http = inject(HttpClient);

  listAll(): Observable<User[]> {
    return this.http.get<User[]>("http://localhost:8080/users/findAll");
  }

  listUser(id: number): Observable<User> {
    return this.http.get<User>("http://localhost:8080/users/get/" + id);
  }

  createUser(user: User): Observable<User> {
    return this.http.post("http://localhost:8080/users/create", user);
  }

  updateComplete(id: number, user: User): Observable<User> {
    return this.http.put<User>("http://localhost:8080/users/update/" + id, user);
  }

  updatePartial(id: number, user: User): Observable<User> {
    return this.http.patch<User>("http://localhost:8080/users/patch/" + id, user);

  }

  delete(id: number) {
    return this.http.delete("http://localhost:8080/users/delete" + id);
  }



}
