import { useEffect, useState } from 'react';
import Header from '../components/Header';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { getUrlHash, getUrlQuery } from '../utils/url';
import { useAuthContext } from '../lib/AuthProvider';

function Home() {
  const navigate = useNavigate();
  const { redirectTo = '' } = getUrlQuery();
  const { error = '', error_code: errorCode = '', error_description: errorMessage = '' } = getUrlHash();
  const { session, userData, loading } = useAuthContext();

  useEffect(() => {
    if (!error) {
      if (redirectTo) {
        return navigate(redirectTo, { replace: true });
      }
    }
    if (error) {
      return navigate('/error', { replace: true, state: { error, errorCode, errorMessage } });
    }
    if (!session && !loading) {
      return navigate('/sign-in', { replace: true });
    }
  }, [redirectTo, session])

  return (
    <div className="app">
      <Header />
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src="/react.svg" className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>
        Welcome {userData?.name}
      </h1>
      <p className="read-the-docs">
        Click on the Profile Icon to Change Password and Sign Out!
      </p>
    </div>
  )
}

export default Home
