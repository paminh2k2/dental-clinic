import Appointments from "~/pages/Appointments/Appointment";
import DetailProfile from "~/pages/DetailProfile/DetailProfile";
import Expense from "~/pages/Expense/Expense";
import Home from "~/pages/Home/Home";
import ProfilesList from "~/pages/ProfilesList/ProfilesList";
import Setting from "~/pages/Setting/Setting";
import Static from "~/pages/Static/Static";

export const publicRoutes = [
  { path: '/setting', component: Setting },
  { path: '/static', component: Static },
  { path: '/expense', component: Expense },
  { path: '/profiles', component: ProfilesList }, // Route to Profiles list
  { path: '/profiles/:id', component: DetailProfile}, // Route to Profile detail
  { path: '/appointment', component: Appointments },
  { path: '/', exact: true, component: Home },
];

export const privateRoutes = [
  // Define private routes here if needed
];
