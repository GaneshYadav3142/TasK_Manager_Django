
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loginpage from './pages/Loginpage';
import Registerpage from './pages/Registerpage';
import Homepage from './pages/Homepage';
import Taskpage from './pages/Taskpage';
import TasksPage from './components/TasksPage';

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Loginpage />} />
        <Route path="/register" element={<Registerpage />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/tasks" element={<TasksPage />} /> 
      </Routes>
    </Router>
  );
}
