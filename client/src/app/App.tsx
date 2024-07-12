import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import '../App.css';
import { publicRoutes } from '../routes';
import DashBoard from '~/layouts/DashBoard/DashBoard';

function App() {
  return (
    <Router>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Layout = DashBoard;
          const MainDashboard = route.component;

          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <MainDashboard />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
