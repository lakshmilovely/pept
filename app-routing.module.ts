import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './Features/dashboard/dashboard.component';
import { AuthGuard } from './Core/_guards/auth.guard';
import { PagenotfoundComponent } from '../app/Layout/pagenotfound/pagenotfound.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./Authentication/login/login.module').then(m => m.LoginModule) },
  {
    path: 'userdashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'userdashboard', loadChildren: () => import('./Features/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard] },
  { path: 'departments', loadChildren: () => import('./Features/department/department.module').then(m => m.DepartmentModule), canActivate: [AuthGuard] },
  { path: 'ourteam', loadChildren: () => import('./Features/ourteam/ourteam.module').then(m => m.OurteamModule), canActivate: [AuthGuard] },
  { path: 'userprofile', loadChildren: () => import('./Features/profile/profile.module').then(m => m.ProfileModule), canActivate: [AuthGuard] },
  { path: 'designations-edit', loadChildren: () => import('./Features/designations/designations.module').then(m => m.DesignationsModule), canActivate: [AuthGuard] },
  { path: 'locations', loadChildren: () => import('./Features/locations/locations.module').then(m => m.LocationsModule), canActivate: [AuthGuard] },
  { path: 'vacationtypes', loadChildren: () => import('./Features/vacationtype/vacationtype.module').then(m => m.VacationtypeModule), canActivate: [AuthGuard] },
  { path: 'projectworktypes', loadChildren: () => import('./Features/worktype/worktype.module').then(m => m.WorktypeModule), canActivate: [AuthGuard] },
  { path: 'requesttypes', loadChildren: () => import('./Features/requesttypes/requesttypes.module').then(m => m.RequesttypesModule), canActivate: [AuthGuard] },
  { path: 'urltypes', loadChildren: () => import('./Features/urltypes/urltypes.module').then(m => m.UrltypesModule), canActivate: [AuthGuard] },
  { path: 'supportrequesttypes', loadChildren: () => import('./Features/supportrequestypes/supportrequestypes.module').then(m => m.SupportrequestypesModule), canActivate: [AuthGuard] },
  { path: 'companyholidays', loadChildren: () => import('./Features/company-holidays/company-holidays.module').then(m => m.CompanyHolidaysModule), canActivate: [AuthGuard] },
  { path: 'users', loadChildren: () => import('./Features/profile/grid-users/grid-users.module').then(m => m.GridUsersModule), canActivate: [AuthGuard] },
  { path: 'SupportRequest', loadChildren: () => import('./Features/support-request/support-request.module').then(m => m.SupportRequestModule), canActivate: [AuthGuard] },
  { path: 'relievingletter', loadChildren: () => import('./Features/relieving-letter/relieving-letter.module').then(m => m.RelievingLetterModule), canActivate: [AuthGuard] },
  { path: 'vacationrequest', loadChildren: () => import('./Features/vacations/vacations.module').then(m => m.VacationsModule), canActivate: [AuthGuard] },
  { path: 'vacationapproval', loadChildren: () => import('./Features/vacation-admin/vacation-admin.module').then(m => m.VacationAdminModule), canActivate: [AuthGuard] },
  { path: 'companyemployees', loadChildren: () => import('./Features/company-employees/company-employees.module').then(m => m.CompanyEmployeesModule), canActivate: [AuthGuard] },
  { path: 'calendar', loadChildren: () => import('./Features/calendar/calendar.module').then(m => m.CalendarModule), canActivate: [AuthGuard] },
  { path: 'spyhrepayslip', loadChildren: () => import('./Features/payslip/payslip.module').then(m => m.PayslipModule), canActivate: [AuthGuard] },
  { path: 'designations', loadChildren: () => import('./Features/designations/designations-grid/designations-grid.module').then(m => m.DesignationsGridModule), canActivate: [AuthGuard] },
  { path: 'favorites', loadChildren: () => import('./Features/favorites/favorites.module').then(m => m.FavoritesModule) },
  {
    path: '**',
    // redirectTo: 'userdashboard',
    pathMatch: 'full',
    component: PagenotfoundComponent
  },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
