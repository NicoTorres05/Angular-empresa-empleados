import { Routes } from '@angular/router';
import { IndexComponent } from './component/index/index.component';
import {ListCompComponent} from './component/company/list-comp/list-comp.component';
import {CreateCompComponent} from './component/company/create-comp/create-comp.component';
import {DetailsCompComponent} from './component/company/details-comp/details-comp.component';
import {EditCompComponent} from './component/company/edit-comp/edit-comp.component';
import {ListEmplComponent} from './component/employee/list-empl/list-empl.component';
import {CreateEmplComponent} from './component/employee/create-empl/create-empl.component';
import {DetailsEmplComponent} from './component/employee/details-empl/details-empl.component';
import {EditEmplComponent} from './component/employee/edit-empl/edit-empl.component';



export const routes: Routes = [
  { path: "", component: IndexComponent },
  { path: "companies", component: ListCompComponent },
  { path: "create-company", component: CreateCompComponent },
  { path: "edit-company/:id", component: EditCompComponent },
  { path: "details-company/:id", component: DetailsCompComponent },
  { path: "employees", component: ListEmplComponent },
  { path: "create-employee", component: CreateEmplComponent },
  { path: "edit-employee/:id", component: EditEmplComponent },
  { path: "details-employee/:id", component: DetailsEmplComponent },
];
