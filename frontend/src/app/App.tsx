import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import '../App.css'
import DefaultLayout from '../layouts/DefaultLayout'
import { publicRoutes } from '../routes'
function App() {
  return (
    <Router>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Layout = DefaultLayout
          const Page = route.component
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page/>
                </Layout>
              }
            />
          )
        })}
      </Routes>
    </Router>
)
}

export default App
