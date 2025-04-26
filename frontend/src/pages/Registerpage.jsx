import { FaArrowLeft } from 'react-icons/fa';
import RegisterForm from '../components/RegisterForm';

import { useNavigate, Link } from 'react-router-dom';

export default function Registerpage() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 px-4 relative">
 <button
           onClick={() => navigate('/')}
           className="text-xl text-white hover:text-slate  top-4 left-4 absolute"
         >
           <FaArrowLeft  size={30}/>
         </button>
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
  
     
        <RegisterForm />

        <p className="mt-4 text-center text-sm text-gray-600">
          Already a user?{' '}
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            login here
          </Link>
        </p>
      </div>
    </div>
  );
}
