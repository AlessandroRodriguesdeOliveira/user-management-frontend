import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserPage } from '../dto/UserPageDTO';
import { UserResponseDTO } from '../dto/UserResponseDTO';
import { UserRequestDTO } from '../dto/UserRequestDTO';


@Injectable({
  providedIn: 'root',
})
export class Service {

  http = inject(HttpClient);

  listAll(page: number, size: number):Observable<UserPage<UserResponseDTO>> {
    return this.http.get<UserPage<UserResponseDTO>>("http://localhost:8081/users/findAll?page=" + page + "&size=" + size);
  }

  listUser(id: number): Observable<UserResponseDTO> {
    return this.http.get<UserResponseDTO>("http://localhost:8081/users/get/" + id);
  }

  createUser(user: UserRequestDTO): Observable<UserResponseDTO> {
    return this.http.post<UserResponseDTO>("http://localhost:8081/users/create", user);
  }

  updateComplete(id: number, user: UserRequestDTO): Observable<UserResponseDTO> {
    return this.http.put<UserResponseDTO>("http://localhost:8081/users/update/" + id, user);
  }

  updatePartial(id: number, user: Partial<UserRequestDTO>): Observable<UserResponseDTO> {
    return this.http.patch<UserResponseDTO>("http://localhost:8081/users/patch/" + id, user);

  }

  delete(id: number) {
    return this.http.delete("http://localhost:8081/users/delete/" + id);
  }



}
