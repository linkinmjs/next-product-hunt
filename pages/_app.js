import '../styles/globals.css'
import firebase, { FirebaseContext, firebaseContext } from '../firebase';
import useAutenticacion from '../hooks/useAutenticacion';

function MyApp({ Component, pageProps }) {

  const usuario = useAutenticacion();
  console.log(usuario);

  return (
    <FirebaseContext.Provider
      value={{
        firebase,
        usuario
      }}
    >
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  )
}

export default MyApp
