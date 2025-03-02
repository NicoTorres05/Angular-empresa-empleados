import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CompanyService } from '../../../service/company.service';
import { Company } from '../../../model/Company';
import { EmployeeService } from '../../../service/employee.service';
import { Employee } from '../../../model/Employee';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-list-empl',
  imports: [RouterLink, FormsModule],
  templateUrl: './list-empl.component.html',
  styleUrl: './list-empl.component.css'
})
export class ListEmplComponent {
  private compService: CompanyService = inject(CompanyService);
  private emplService: EmployeeService = inject(EmployeeService);

  compList: Company[] = [];
  emplList: Employee[] = [];
  compId: String = "";

  deleteEmpl(id:string) {
    if (confirm("¿Estás seguro de que deseas eliminarlo?")) {
      this.emplService.deleteEmpl(id).subscribe(() => {
        this.emplService.getAll().subscribe(e => this.emplList = e);
      });
    }
  }

  constructor() {
    this.emplService.getAll().subscribe(e => this.emplList = e);
    this.compService.getAll().subscribe(c => this.compList = c);
  }

}
