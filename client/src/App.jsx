import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/HomePage';
import Signup from './pages/auth/Signup';
import Signin from './pages/auth/Signin';
import PageNotFound from './pages/PageNotFound';
import PrivateRoute from './components/Routes/Private';
import Profiles from './user/Profiles';
import CrushList from './user/CrushList';
import MyProfile from './user/MyProfile';

function App() {

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/profiles' element={<PrivateRoute />}>
          <Route path='' element={<Profiles />} />
          <Route path='myprofile/:username' element={<MyProfile />} />
          <Route path='crushlist' element={<CrushList />} />
        </Route>
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
