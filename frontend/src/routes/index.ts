import Appointments from "../pages/Appointments/Appointment";
import Expense from "../pages/Expense/Expense";
import Home from "../pages/Home/Home";
import Material from "../pages/Material/Material";
import Profiles from "../pages/Profiles/Profiles";
import Revenue from "../pages/Revenue/Renevue";
export const publicRoutes = [
    {path: '/expense', component: Expense},
    {path: '/material', component: Material},
    {path: '/profiles', component: Profiles},
    {path: '/revenue', component: Revenue},
    {path: '/schedule', component: Appointments},
    {path: '/', component: Home},
    
]

export const privateRoutes = []
