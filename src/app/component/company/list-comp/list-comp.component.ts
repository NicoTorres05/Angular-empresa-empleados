import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import {CompanyService} from '../../../service/company.service';
import {Company} from '../../../model/Company';
import {EmployeeService} from '../../../service/employee.service';
import {Employee} from '../../../model/Employee';

@Component({
  selector: 'app-list-comp',
  imports: [RouterLink],
  templateUrl: './list-comp.component.html',
  styleUrl: './list-comp.component.css'
})
export class ListCompComponent {
  private compService: CompanyService = inject(CompanyService);
  private emplService: EmployeeService = inject(EmployeeService);

  compList: Company[] = [];
  emplList: Employee[] = [];

  constructor() {
    this.compService.getAll().subscribe(c => this.compList = c);
    this.emplService.getAll().subscribe(e => this.emplList = e);
  }

  deleteCompany(id: string) {
    if (this.emplList.find(e => e.companyId === id)) {
      alert("No se puede borrar una empresa con empleados asignados")
    }
    else if (confirm("¿Seguro de que deseas eliminarlo?")) {
      this.compService.deleteCompany(id).subscribe(() => this.compService.getAll().subscribe(c => this.compList = c));
    }
  }
}
