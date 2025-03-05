import { Component, AfterViewInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Map, tileLayer, marker } from 'leaflet';

import { Company } from '../../../model/Company';
import { CompanyService } from '../../../service/company.service';
import { Employee } from '../../../model/Employee';
import { EmployeeService } from '../../../service/employee.service';

@Component({
  selector: 'app-details-comp',
  templateUrl: './details-comp.component.html',
  standalone: true,
  styleUrl: './details-comp.component.css'
})
export class DetailsCompComponent implements AfterViewInit {
  private compService: CompanyService = inject(CompanyService);
  private emplService: EmployeeService = inject(EmployeeService);
  private route: ActivatedRoute = inject(ActivatedRoute);

  id: string;
  comp: Company | undefined;
  emplList: Employee[] = [];
  private map!: Map;

  constructor() {
    const routeParams = this.route.snapshot.paramMap;
    this.id = routeParams.get('id')!;

    this.compService.getCompany(this.id).subscribe(c => {
      this.comp = c;
      if (this.comp.coords.lat && this.comp.coords.lon) {
        this.initMap(this.comp.coords.lat, this.comp.coords.lon);
      }
    });

    this.emplService.getAll().subscribe(e => {
      this.emplList = e.filter(e => e.companyId === this.id);
    });
  }

  ngAfterViewInit(): void {
    if (this.comp?.coords.lat && this.comp?.coords.lon) {
      this.initMap(this.comp.coords.lat, this.comp.coords.lon);
    }
  }

  private initMap(lat: number, lng: number): void {
    this.map = new Map('map').setView([lat, lng], 13);

    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    marker([lat, lng]).addTo(this.map)
      .bindPopup(`<b>${this.comp?.name}</b><br>Ubicación de la empresa`)
      .openPopup();
  }
}
