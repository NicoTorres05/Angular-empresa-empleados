import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

import { Company } from '../../../model/Company';
import { Employee } from '../../../model/Employee';
import { CompanyService } from '../../../service/company.service';
import { EmployeeService } from '../../../service/employee.service';


@Component({
  selector: 'app-edit-empl',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-empl.component.html',
  styleUrl: './edit-empl.component.css'
})
export class EditEmplComponent {
  private emplService: EmployeeService = inject(EmployeeService);
  private compService: CompanyService = inject(CompanyService);

  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);

  emplList: Employee[] = [];
  comList: Company[] = [];

  emplId: string;

  editEmplForm = new FormGroup({
    "name": new FormControl("", Validators.required),
    "age": new FormControl("", [Validators.required, Validators.min(18)]),
    "position": new FormControl("", Validators.required),
    "salary": new FormControl("", [Validators.required, Validators.min(1000)]),
    "companyId": new FormControl(""),
    "isActive": new FormControl()
  })

  constructor() {
    this.emplService.getAll().subscribe(e => this.emplList = e);
    this.compService.getAll().subscribe(c => this.comList = c);

    const routeParams = this.route.snapshot.paramMap;
    this.emplId = routeParams.get('id')!;

    this.emplService.getEmpl(this.emplId).subscribe(e => {
      this.editEmplForm.patchValue({
        "name": e.name,
        "age": e.age.toString(),
        "position": e.position,
        "salary": e.salary.toString(),
        "companyId": e.companyId,
        "isActive": e.isActive,

      })
    })
  }

  editEmpl() {
    if(this.editEmplForm.valid) {
      const newEmpl: Employee = {
        id: this.emplId,
        name: this.editEmplForm.value.name!,
        age: Number.parseInt(this.editEmplForm.value.age!),
        position: this.editEmplForm.value.position!,
        salary: Number.parseInt(this.editEmplForm.value.salary!),
        companyId: this.editEmplForm.value.companyId!,
        isActive: this.editEmplForm.value.isActive ?? false
      }
      this.emplService.updateEmpl(newEmpl).subscribe();
      this.router.navigate(['/employees'])

    }
  }
}
