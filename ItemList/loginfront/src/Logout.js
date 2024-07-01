
import { useNavigate } from 'react-router-dom';
import './Logout.css';


const Logout = () => {

  const navigate = useNavigate();

  const handleLogout = async() => {
    try{
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        navigate('/login/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  return (
    <div className="logout-container">
      <button onClick={handleLogout}>Logout</button>
    </div>
  );

  };

  export default Logout;