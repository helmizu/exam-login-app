import * as React from 'react'
import queryString from 'query-string'
import { getUser, setUser, deleteUser } from '../utils/storage';
import { getUserData, getUserSession, loginUser, logoutUser } from './Supabase';

const AuthContext = React.createContext({
  session: null,
  userData: null,
  singining: false,
  loading: false,
  signin: () => { },
  signout: () => { },
});

export const useAuthContext = () => React.useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const qstring = window.location.search;
  const parsedQs = queryString.parse(qstring);
  const { user: initUser = null, session: initSession = null } = getUser() || {};
  const [userData, setUserData] = React.useState(initUser);
  const [session, setSession] = React.useState(initSession);
  const [singining, setSingining] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const checkingUser = async () => {
    try {
      setLoading(true);
      const { data: uData } = await getUserData();
      const { data: uSession } = await getUserSession();
      console.log({ uData, uSession })
      if (uData) setUserData(uData);
      if (uSession) setSession(uSession);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const signin = async ({ username, password, remember }) => {
    setSingining(true);
    try {
      const { data, error } = await loginUser({ username, password })
      if (error) throw error;
      if (data) {
        checkingUser();
        if (remember) setUser(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSingining(false);
    }
  };

  const signout = () => {
    logoutUser();
    setUserData(null);
    setSession(null);
    deleteUser();
  }

  const memoizedAuth = React.useMemo(() => ({
    userData,
    session,
    signin,
    signout,
    singining,
    loading,
  }), [session, userData, singining, loading])

  React.useEffect(() => {
    if (initUser) {
      checkingUser();
    } else {
      if (!parsedQs?.exec) signout();
    }
    return () => {
      console.log("called")
    }
  }, [])

  return (
    <AuthContext.Provider value={memoizedAuth}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider