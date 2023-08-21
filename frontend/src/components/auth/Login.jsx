import React, { useState } from 'react';
import { useMutation } from 'react-query';
import Cookies from 'js-cookies'
import { UserLogin } from '../../mutation/user';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { mutate, isLoading, isError, data : TokenData } = useMutation(UserLogin);

  const handleLogin = () => {
    mutate({ "password": password, "email": email });
  };

  if(TokenData){
    Cookies.setItem("session_token", TokenData)
    navigate('/')
  }

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className="auth-form">
        <h2 className='form-header'>Login</h2>
        {isError && <p className='error-text'>Error: Invalid credentials</p>}
        <div className="form-control"><hr /></div>
        <div className="form-control">
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Your email' />
        </div>
        <div className="form-control">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Your Password' />
        </div>
        <div className="form-control">
          <button onClick={handleLogin} disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
