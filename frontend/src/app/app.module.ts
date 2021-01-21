import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { Ng2Webstorage} from 'ngx-webstorage'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { SideBarComponent } from './components/side-bar/side-bar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StudentsComponent } from './components/students/students.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
//angular material imports


import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule,ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { AddStaffComponent } from './components/add-staff/add-staff.component';
import { AddSubjectComponent } from './components/add-subject/add-subject.component';
import { AddPaymentComponent } from './components/add-payment/add-payment.component';
import { AddClassComponent } from './components/add-class/add-class.component';
import { AddAttendanceComponent } from './components/add-attendance/add-attendance.component';
import { ViewComponent } from './components/view/view.component';
import { AddTeacherComponent } from './components/add-teacher/add-teacher.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { StaffsComponent } from './components/staffs/staffs.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { TeacherDetailsComponent } from './components/teacher-details/teacher-details.component';
import { SubjectDetailsComponent } from './components/subject-details/subject-details.component';
import { StaffDetailsComponent } from './components/staff-details/staff-details.component';
import { PaymentDetailsComponent } from './components/payment-details/payment-details.component';
import { ClassesComponent } from './components/classes/classes.component';
import { AttendancesComponent } from './components/attendances/attendances.component';
import { ClassDetailsComponent } from './components/class-details/class-details.component';
import { AttendanceDetailsComponent } from './components/attendance-details/attendance-details.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
//import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './services/auth.service';
import { StudentService } from './services/student.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AdminComponent } from './components/admin/admin.component';
import { StaffPageComponent } from './components/staff-page/staff-page.component';
import { TeacherPageComponent } from './components/teacher-page/teacher-page.component';

import { MaterialModule } from './material/material.module';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';

import { SearchfilterPipe } from 'src/app/searchfilter.pipe';


import { SearchFilterExampleComponent } from './search-filter-example/search-filter-example.component';

//import { SettingsComponent } from './components/settings/settings.component';
import { TeacherService } from 'src/app/services/teacher.service';
import { FilternamePipe } from './filtername.pipe';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { SubjectService } from './services/subject.service';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    DashboardComponent,
    StudentsComponent,
    StudentDetailsComponent,
    AddStudentComponent,
    AddStaffComponent,
    AddSubjectComponent,
    AddPaymentComponent,
    AddClassComponent,
    AddAttendanceComponent,
    ViewComponent,
    AddTeacherComponent,
    TeachersComponent,
    StaffsComponent,
    SubjectsComponent,
    PaymentsComponent,
    TeacherDetailsComponent,
    SubjectDetailsComponent,
    StaffDetailsComponent,
    PaymentDetailsComponent,
    ClassesComponent,
    AttendancesComponent,
    ClassDetailsComponent,
    AttendanceDetailsComponent,
    LoginComponent,
    SignupComponent,
    AdminComponent,
    StaffPageComponent,
    TeacherPageComponent,
    ForgotpasswordComponent,

    SearchfilterPipe,

    SearchFilterExampleComponent,

    FilternamePipe,

    AboutUsComponent,

    

   
   
    //SettingsComponent

    //ProfileComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    HttpClientModule,
    //HttpModule,
    //Ng2Webstorage,
   ///FlexLayoutModule,
    MaterialModule,
    FormsModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    NgxPaginationModule
    
  ],
 
  providers: [AuthService,AuthGuard,StudentService,TeacherService,SubjectService,
  {
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
