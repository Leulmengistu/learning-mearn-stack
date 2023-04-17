import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router,  Routes , Route } from 'react-router-dom';

import Navbar from './components/navbar.component'
import ExerciseList from './components/exercises-list.component'
import EditExercise from './components/edit-exercises.component'
import CreateExercise from './components/create-exercises.component'
import CreateUser from './components/create-user.component'
function App() {
  return (
    <Router>
      <Navbar />
      <br/>
      <Routes>
      <Route path='/' exact element={<ExerciseList/>} />
      <Route path='/edit/:id' element={<EditExercise />} />
      <Route path='/create'  element={<CreateExercise />} />
      <Route path='/user'  element={<CreateUser />} />
      </Routes>
    </Router>
  );
}

export default App;
