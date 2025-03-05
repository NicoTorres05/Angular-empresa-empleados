import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';

import {Company} from '../../../model/Company';
import {CompanyService} from '../../../service/company.service';
import {Employee} from '../../../model/Employee';
import {EmployeeService} from '../../../service/employee.service';

@Component({
  selector: 'app-edit-comp',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-comp.component.html',
  standalone: true,
  styleUrl: './edit-comp.component.css'
})
export class EditCompComponent {
  private compService: CompanyService = inject(CompanyService);
  private emplService: EmployeeService = inject(EmployeeService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  compList: Company[] = [];
  emplList: Employee[] = [];
  compId: string;

  editCompForm = new FormGroup({
    "name": new FormControl("", Validators.required),
    "lat": new FormControl("", Validators.required),
    "lon": new FormControl("", Validators.required),
    "isActive": new FormControl(false, Validators.required),
  });


  constructor() {
    const routeParams = this.route.snapshot.paramMap;
    this.compId = routeParams.get('id')!;

    this.compService.getAll().subscribe(c => this.compList = c);
    this.emplService.getAll().subscribe(e => {
      this.emplList = e.filter(e => !e.companyId || e.companyId === this.compId);
    });

    this.compService.getCompany(this.compId).subscribe(c => {
      this.editCompForm.patchValue({
        "name": c.name,
        "lat": c.coords.lat.toString(),
        "lon": c.coords.lon.toString(),
        "isActive": Boolean(c.isActive)
      })
    })
  }

  editCompany() {
    if (this.editCompForm.valid) {
      const newCompany: Company = {
        id: this.compId,
        name: this.editCompForm.value.name!,
        numEmpl: this.emplList.length,
        coords: {
          lat: Number.parseFloat(this.editCompForm.value.lat!),
          lon: Number.parseFloat(this.editCompForm.value.lon!),
        },
        isActive: this.editCompForm.value.isActive === true,
      }
      this.compService.updateCompany(newCompany).subscribe();
      this.router.navigate(['/companies']);
    }
  }
}
