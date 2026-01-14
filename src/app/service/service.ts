import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserPage } from '../dto/UserPageDTO';
import { UserRequestDTO } from '../dto/UserRequestDTO';

@Injectable({
  providedIn: 'root',
})
export class Service {

  http = inject(HttpClient);

  listAll(page: number, size: number):Observable<UserPage<UserRequestDTO>> {
    return this.http.get<UserPage<UserRequestDTO>>("http://localhost:8081/users/findAll?page=" + page + "&size=" + size);
  }

  /*listUser(id: number): Observable<User> {
    return this.http.get<User>("http://localhost:8081/users/get/" + id);
  }

  createUser(user: User): Observable<User> {
    return this.http.post("http://localhost:8081/users/create", user);
  }

  updateComplete(id: number, user: User): Observable<User> {
    return this.http.put<User>("http://localhost:8081/users/update/" + id, user);
  }

  updatePartial(id: number, user: User): Observable<User> {
    return this.http.patch<User>("http://localhost:8081/users/patch/" + id, user);

  }

  delete(id: number) {
    return this.http.delete("http://localhost:8081/users/delete/" + id);
  }*/



}
