import {Route, Routes} from 'react-router-dom'
import './App.css';
import {Navbar, Footer} from './components/navbar';
import {Home} from './components/pages/homes';
import {Courses} from './components/pages/course';


function App() {

  return (
  <div className='APP'>
    <Navbar/>
    <Routes>
      <Route path = '/' element={<Home/>} />
      <Route path = '/course' element={<Courses/>} />
    </Routes>
    <Footer/>
  </div>
  )
}

export default App
