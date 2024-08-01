import Appointments from "~/pages/Appointments/Appointment";
import DetailProfile from "~/pages/DetailProfile/DetailProfile";
import Expense from "~/pages/Expense/Expense";
import Home from "~/pages/Home/Home";
import ProfilesList from "~/pages/ProfilesList/ProfilesList";
import Revenue from "~/pages/Revenue/Revenue";
import Services from "~/pages/Services/Services";
import Store from '~/pages/Store/Store';

export const publicRoutes = [
  { path: '/services', component: Services },
  { path: '/expense', component: Expense },
  { path: '/revenue', component: Revenue},
  { path: '/store', component: Store},
  { path: '/profiles', component: ProfilesList }, // Route to Profiles list
  { path: '/profiles/:id', component: DetailProfile}, // Route to Profile detail
  { path: '/appointment', component: Appointments },
  { path: '/', exact: true, component: Home },
];

export const privateRoutes = [
  // Define private routes here if needed
];
