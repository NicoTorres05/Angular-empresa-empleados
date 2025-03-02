import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Employee } from '../model/Employee'

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private url = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Employee[]>(this.url);
  }

  getEmpl(id: string) {
    return this.http.get<Employee>(`${this.url}/${id}`);
  }

  addEmpl(Team: Employee) {
    return this.http.post<Employee>(this.url, Team);
  }

  updateEmpl(Team: Employee) {
    return this.http.put<Employee>(`${this.url}/${Team.id}`, Team);
  }

  deleteEmpl(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
