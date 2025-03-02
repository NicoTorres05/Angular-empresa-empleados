import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Map, tileLayer } from 'leaflet';

import {Company} from '../../../model/Company';
import {CompanyService} from '../../../service/company.service';
import {Employee} from '../../../model/Employee';
import {EmployeeService} from '../../../service/employee.service';

@Component({
  selector: 'app-details-comp',
  imports: [],
  templateUrl: './details-comp.component.html',
  styleUrl: './details-comp.component.css'
})
export class DetailsCompComponent {
  private compService: CompanyService = inject(CompanyService);
  private emplService: EmployeeService = inject(EmployeeService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  id: string;
  comp: Company | undefined;
  emplList: Employee[] = [];

  constructor() {
    const routeParams = this.route.snapshot.paramMap;
    this.id = routeParams.get('id')!;

    this.compService.getCompany(this.id).subscribe(c => this.comp = c);
    this.emplService.getAll().subscribe(e => {
      this.emplList = e.filter(e => e.companyId === this.id);
    });
  }
}
