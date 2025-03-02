import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Company } from '../model/Company'

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private url = 'http://localhost:3001/companies';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Company[]>(this.url);
  }

  getCompany(id: string) {
    return this.http.get<Company>(`${this.url}/${id}`);
  }

  addCompany(Team: Company) {
    return this.http.post<Company>(this.url, Team);
  }

  updateCompany(Team: Company) {
    return this.http.put<Company>(`${this.url}/${Team.id}`, Team);
  }

  deleteCompany(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
