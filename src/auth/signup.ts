import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

const signUp = async (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      console.log(errorCode, errorMessage);
    });
};

export default signUp;
