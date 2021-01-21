import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AddAttendanceComponent } from './components/add-attendance/add-attendance.component';
import { AddClassComponent } from './components/add-class/add-class.component';
import { AddPaymentComponent } from './components/add-payment/add-payment.component';
import { AddStaffComponent } from './components/add-staff/add-staff.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { AddSubjectComponent } from './components/add-subject/add-subject.component';
import { AddTeacherComponent } from './components/add-teacher/add-teacher.component';
import { AdminComponent } from './components/admin/admin.component';
import { AttendanceDetailsComponent } from './components/attendance-details/attendance-details.component';
import { AttendancesComponent } from './components/attendances/attendances.component';
import { ClassDetailsComponent } from './components/class-details/class-details.component';
import { ClassesComponent } from './components/classes/classes.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentDetailsComponent } from './components/payment-details/payment-details.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { SignupComponent } from './components/signup/signup.component';
import { StaffDetailsComponent } from './components/staff-details/staff-details.component';
import { StaffPageComponent } from './components/staff-page/staff-page.component';
import { StaffsComponent } from './components/staffs/staffs.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { StudentsComponent } from './components/students/students.component';
import { SubjectDetailsComponent } from './components/subject-details/subject-details.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { TeacherDetailsComponent } from './components/teacher-details/teacher-details.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';

import { ViewComponent } from './components/view/view.component';
import { AboutUsComponent } from './components/about-us/about-us.component';


const routes: Routes = [
  {path:'', component:DashboardComponent},
  
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'viewdetails',component:ViewComponent},
  
 
  {path:'students',component:StudentsComponent},
 
  {path:'teachers',component:TeachersComponent},
  {path:'staffs',component:StaffsComponent},
  {path:'subjects',component:SubjectsComponent},
  {path:'payments',component:PaymentsComponent},
  {path:'classes',component:ClassesComponent},
  {path:'attendances',component:AttendancesComponent},

  {path:'student',component:StudentDetailsComponent},
  {path:'teacher',component:TeacherDetailsComponent},
  {path:'subject',component:SubjectDetailsComponent},
  {path:'staff',component:StaffDetailsComponent},
  {path:'payment',component:PaymentDetailsComponent},
  {path:'class',component:ClassDetailsComponent},
  {path:'attendance',component:AttendanceDetailsComponent},

  
  {
    path:'add-subject',
    component:AddSubjectComponent
  },
  {
    path:'add-student',
    component:AddStudentComponent,
    
  },
  {
    path:'add-staff',
    component:AddStaffComponent,
    
  },
  {
    path:'add-teacher',
    component:AddTeacherComponent
  },
  {path:'add-payment',component:AddPaymentComponent},
  {path:'add-class',component:AddClassComponent},
  {path:'add-attendance',component:AddAttendanceComponent},

  {path:'aboutus',component:AboutUsComponent},
  {
    path:'forgotpassword',component:ForgotpasswordComponent
  },

  //for forgotpassword
  
  { //with this default opening route will be login
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./components/login/login.component').then( m => m.LoginComponent)
  },
  { // Here I changes the forgot password page path
    path: 'forgot-password',
    loadChildren: () => import('./components/forgotpassword/forgotpassword.component').then( m => m.ForgotpasswordComponent)
  },
  
 /*{
   path:'admin',
   component:AdminComponent,
   children: [
    
    {
      path:'add-subject',
      component:AddSubjectComponent
    },
    {
      path:'add-student',
      component:AddStudentComponent,
      canActivate:[AuthGuard]
    },
    {
      path:'add-staff',
      component:AddStaffComponent,
      
    },
    {
      path:'add-teacher',
      component:AddTeacherComponent
    }

   ]
  
  },
  {
    path:'staff-page',
    component:StaffPageComponent,
     children: [
      {path:'add-payment',component:AddPaymentComponent},
      {path:'add-class',component:AddClassComponent},
      {path:'add-attendance',component:AddAttendanceComponent}
    ]
  }
  //{ path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page

  */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule { }
