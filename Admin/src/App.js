import { Routes, Route, BrowserRouter } from 'react-router-dom';
import AdminLayout from './layouts/Adminlayout';
import Dashboard from './pages/Dashboard';
import ManageProduct from './pages/ManageProducts';
import ManageApplications from './pages/ManageApplications';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import AdminFormFields from './pages/AdminFormFields';
import UserDetails from './pages/UserDetails';
import JobDetails from './pages/JobDetails';
import ProductDetail from './pages/ProductDetails';
import UserList from './pages/UserList';
import UserDetail from './pages/UserDetail';
import AdminOrderList from './pages/AdminOrderLists';


function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/user/:id" element={<UserDetails />} />
          <Route path="/products" element={<ManageProduct />} />
          <Route path="/admin/orders" element={<AdminOrderList />} />
          <Route path='/products/:id' element={<ProductDetail/>}/>
          <Route path="manage-applications" element={<ManageApplications />} />
          <Route path="register-form" element={<AdminFormFields />} />
          <Route path="/users" element={<UserList />} />
<Route path="/users/:id" element={<UserDetail />} />
<Route path="/jobs/:id" element={<JobDetails />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
