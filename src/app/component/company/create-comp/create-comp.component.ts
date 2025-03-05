import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import {Company} from '../../../model/Company';
import {CompanyService} from '../../../service/company.service';
import {Employee} from '../../../model/Employee';
import {EmployeeService} from '../../../service/employee.service';

@Component({
  selector: 'app-create-comp',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-comp.component.html',
  standalone: true,
  styleUrl: './create-comp.component.css'
})
export class CreateCompComponent {
  private compService: CompanyService = inject(CompanyService);
  private emplService: EmployeeService = inject(EmployeeService);
  private router: Router = inject(Router);

  compList: Company[] = [];
  emplList: Employee[] = [];

  constructor() {
    this.compService.getAll().subscribe(c => this.compList = c);
    this.emplService.getAll().subscribe(e => {
      this.emplList = e.filter(e => !e.companyId);
    });
  }

  createCompForm = new FormGroup({
    "name": new FormControl("", Validators.required),
    "lat": new FormControl("", Validators.required),
    "lon": new FormControl("", Validators.required),
    "isActive": new FormControl(false, Validators.required),
  });

  createCompany() {
    if (this.createCompForm.valid) {
      const newCompany: Company = {
        id: (Number.parseInt(this.compList[this.compList.length - 1].id) + 1).toString(),
        name: this.createCompForm.value.name!,
        numEmpl: this.emplList.length,
        coords: {
          lat: Number.parseFloat(this.createCompForm.value.lat!),
          lon: Number.parseFloat(this.createCompForm.value.lon!),
        },
        isActive: this.createCompForm.value.isActive === true,
      }
      this.compService.addCompany(newCompany).subscribe(() => this.compList.push(newCompany));

      this.createCompForm.reset();
      this.router.navigate(['/companies']);
    }
  }
}
