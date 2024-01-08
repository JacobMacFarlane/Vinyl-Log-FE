"use client"
import { useState } from 'react';
import Router from 'next/router';
import { useRouter } from 'next/navigation';
// import { getCookie } from "cookies-next"
import { fetchWithHeaders } from './api-server';
import { signIn } from './actions';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const [userInfo, setUserInfo] = useState("")
 const [loading, setLoading] = useState(false);


  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError('');
const response = await signIn(email, password)  
  };

  return (
    <div className="login-container">
      <form action={async () => {
        const response = await signIn(email, password)
       const {success}: any = response
        if (success) {
            return router.push("/vinyls")
        }
        }}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            className="text-gray-900 w-full border rounded px-3 py-2 mt-2 focus:outline-none focus:ring focus:border-blue-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            className="text-gray-900 w-full border rounded px-3 py-2 mt-2 focus:outline-none focus:ring focus:border-blue-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;