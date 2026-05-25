import { Routes } from '@angular/router';
import { UserDashboardComponent } from './Pages/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './Pages/admin-dashboard/admin-dashboard.component';
import { LoginPageComponent } from './Pages/login-page/login-page.component';
import { RegisterPageComponent } from './Pages/register-page/register-page.component';
import { TrackingOfficerComponent } from './Pages/tracking-officer/tracking-officer.component';
import { TrackingCustomerComponent } from './Pages/tracking-customer/tracking-customer.component';
import { SchedulePickupComponent } from './Pages/schedule-pickup/schedule-pickup.component';
import { CustomerSupportPageComponent } from './Pages/customer-support-page/customer-support-page.component';
import { CustomerBookingHistoryComponent } from './Pages/customer-booking-history/customer-booking-history.component';
import { OfficerBookingServicePageComponent } from './Pages/officer-booking-service-page/officer-booking-service-page.component';
import { UserBookingServicePageComponent } from './Pages/user-booking-service-page/user-booking-service-page.component';
import { UpdateStatusComponent } from './Pages/update-status/update-status.component';
import { OfficerBookingHistoryComponent } from './Pages/officer-booking-history/officer-booking-history.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'appComponent',
        pathMatch:'full'
    },
    {
        path:'userDashboard',
        component:UserDashboardComponent
    },
    {
        path:'adminDashboard',
        component:AdminDashboardComponent
    },
    {
        path:'loginPage',
        component:LoginPageComponent
    },
    {
        path:'registerUser',
        component:RegisterPageComponent
    },
    {   path: 'officer',
        component: TrackingOfficerComponent 
    },
    {   
        path: 'customerTracking', 
        component: TrackingCustomerComponent
    },
    { 
        path:'schedule-pickup',
        component:SchedulePickupComponent
    
    },
    {
        path:'customerSupport',
        component:CustomerSupportPageComponent
    },
    {
        path: 'customer-booking-history',
        component: CustomerBookingHistoryComponent
    },
    {   path: 'officerBookingService',
        component: OfficerBookingServicePageComponent 
    },
    {
        path:'userBookingService',
        component:UserBookingServicePageComponent
    },
    {
        path:'updatestatus',
        component:UpdateStatusComponent
    },
    {
        path:'previousOfficerBooking',
        component:OfficerBookingHistoryComponent
    }
];
