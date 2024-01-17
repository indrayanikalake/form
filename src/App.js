import './App.css';
import Step1Form from './component/Registration';
import Step2Form from './component/RegistrationPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import person from './assets/person.svg'

function App() {
  return (
    <Router >
     
      <img className='image ' src={person} alt='person' />
    
      <Routes>
      <Route exact path='/' element={<Step1Form />} />
      <Route exact path='/step2' element={<Step2Form />} />
     </Routes>
    
    </Router>
  );
}

export default App;
