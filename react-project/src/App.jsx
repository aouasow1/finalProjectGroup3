import {Route, Routes} from 'react-router-dom'
import './App.css';
import {Navbar} from './components/navbar';
import {Home} from './components/pages/home';
import {About} from './components/pages/about';
import {Contact} from './components/pages/contact';


function App() {

  return (
  <div className='APP'>
    <Navbar/>
    <Routes>
      <Route path = '/' element={<Home/>} />
      <Route path = '/about' element={<About/>} />
      <Route path = '/contact' element={<Contact/>} />
    </Routes>
  </div>
  )
}

export default App
