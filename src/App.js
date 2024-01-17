import './App.css';
import Step1Form from './component/Registration';
import Step2Form from './component/RegistrationPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
      <Route exact path='/' element={<Step1Form />} />
      <Route exact path='/step2' element={<Step2Form />} />
     </Routes>
    </Router>
  );
}

export default App;
