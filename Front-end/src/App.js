import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Home from './Pages/Home'
import { BrowserRouter,  Routes, Route, Navigate } from 'react-router-dom'
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import { useUserContext } from './Hooks/UseUserContext';

function App() {

  const { user } = useUserContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />}
            />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to='/' />}
            />
            <Route path="/login" element={!user ? <Login /> : <Navigate to='/' /> }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
