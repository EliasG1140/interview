import 'antd/dist/reset.css';
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';

function App() {
  axios.defaults.baseURL = 'http://localhost:3000/api/v1/'

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='*' element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
