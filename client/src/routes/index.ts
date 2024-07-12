import Appointments from "~/pages/Appointments/Appointment";
import Expense from "~/pages/Expense/Expense";
import Home from "~/pages/Home/Home";
import Setting from "~/pages/Setting/Setting";
import Profiles from "~/pages/Profiles/Profiles";
import Static from "~/pages/Static/Static";
import DetailProfile from "~/pages/DetailProfile/DetailProfile";

export const publicRoutes = [
  { path: '/setting', component: Setting },
  { path: '/static', component: Static },
  { path: '/expense', component: Expense },
  { path: '/profiles', component: Profiles }, // Route to Profiles list
  { path: '/appointment', component: Appointments },
  { path: '/', exact: true, component: Home },
];

export const privateRoutes = [
  // Define private routes here if needed
];
