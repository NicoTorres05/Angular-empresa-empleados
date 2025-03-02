import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Employee } from '../../../model/Employee';
import { EmployeeService } from '../../../service/employee.service';
import { Company } from '../../../model/Company';
import { CompanyService } from '../../../service/company.service';



@Component({
  selector: 'app-details-empl',
  imports: [CommonModule],
  templateUrl: './details-empl.component.html',
  styleUrl: './details-empl.component.css'
})
export class DetailsEmplComponent {
  private emplService: EmployeeService = inject(EmployeeService);
  private compService: CompanyService = inject(CompanyService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  id: string;
  empl: Employee | undefined;
  compList: Company[] = [];

  constructor() {
    const routeParams = this.route.snapshot.paramMap;
    this.id = routeParams.get('id')!;

    this.emplService.getEmpl(this.id).subscribe(e => this.empl = e);
    this.compService.getAll().subscribe(c => this.compList = c);
  }
}
