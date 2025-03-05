import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from '@angular/router';

import {EmployeeService} from '../../../service/employee.service';
import {Employee} from '../../../model/Employee';
import {CompanyService} from '../../../service/company.service';
import {Company} from '../../../model/Company';

@Component({
  selector: 'app-create-empl',
  imports: [ReactiveFormsModule],
  templateUrl: './create-empl.component.html',
  standalone: true,
  styleUrl: './create-empl.component.css'
})
export class CreateEmplComponent {
  private emplService: EmployeeService = inject(EmployeeService);
  private compService: CompanyService = inject(CompanyService);
  private router: Router = inject(Router);

  emplList: Employee[] = [];
  compList: Company[] = [];

  constructor() {
    this.emplService.getAll().subscribe(e => this.emplList = e);
    this.compService.getAll().subscribe(c => this.compList = c);
  }

  createEmplForm = new FormGroup({
    "name": new FormControl("", Validators.required),
    "age": new FormControl("", [Validators.required, Validators.min(18)]),
    "position": new FormControl("", Validators.required),
    "salary": new FormControl("", [Validators.required, Validators.min(1000)]),
    "companyId": new FormControl(""),
    "isActive": new FormControl(),
  });

  createEmpl() {
    if (this.createEmplForm.valid) {
      const newEmpl: Employee = {
        id: (Number.parseInt(this.emplList[this.emplList.length - 1].id) + 1).toString(),
        name: this.createEmplForm.value.name!,
        age: Number.parseInt(this.createEmplForm.value.age!),
        position: this.createEmplForm.value.position!,
        salary: Number.parseInt(this.createEmplForm.value.salary!),
        companyId: this.createEmplForm.value.companyId!,
        isActive: this.createEmplForm.value.isActive ?? false!
      }
      this.emplService.addEmpl(newEmpl).subscribe(() => this.emplList.push(newEmpl));
      this.createEmplForm.reset();
      this.router.navigate(['/employees']);
    }
  }
}
