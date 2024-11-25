import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://dummyjson.com/users'; // URL base da API

  constructor(private http: HttpClient) {}

  // Listar usuários
  getUsers(): Observable<{ users: User[] }> {
    return this.http.get<{ users: User[] }>(`${this.apiUrl}`);
  }

  // Criar usuário
  createUser(user: Partial<User>): Observable<User> {
    return this.http.post<User>(this.apiUrl, {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  }

  // Atualizar usuário
  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  }

  // Deletar usuário
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
