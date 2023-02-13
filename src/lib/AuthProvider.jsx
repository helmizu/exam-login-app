import * as React from 'react'
import { getUser, setUser, deleteUser } from '../utils/storage';

const AuthContext = React.createContext({
  auth: null,
  singining: false,
  signin: () => { },
  signout: () => { },
});

export const useAuthContext = () => React.useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const initUser = getUser();
  const [auth, setAuth] = React.useState(initUser);
  const [singining, setSingining] = React.useState(false);

  const signin = async ({ email, password }) => {
    setSingining(true);
    try {
      // const userCredential = await signInWithEmailAndPassword(authRef, email, password)
      // if (userCredential?.user) {
      //   setAuth(userCredential?.user);
      //   setUser(userCredential?.user);
      // }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log({ errorCode, errorMessage })
    } finally {
      setSingining(false)
    }
  };

  const signout = () => {
    // signOut(authRef);
    setAuth(null);
    // deleteUser();
  }

  const memoizedAuth = React.useMemo(() => ({
    auth,
    signin,
    signout,
    singining,
  }), [auth, singining])

  return (
    <AuthContext.Provider value={memoizedAuth}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider