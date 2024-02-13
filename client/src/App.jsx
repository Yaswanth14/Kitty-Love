import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from './Components/Card';
import Signin from './Components/Signin';

function App() {

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Card />} />
        <Route path='/signin' element={<Signin />} />
      </Routes>
    </>
  )
}

export default App
