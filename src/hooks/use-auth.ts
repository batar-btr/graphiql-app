import { useAppSelector } from './redux-hooks';

const UseAuth = () => {
  const { uid, email, token } = useAppSelector((state) => state.user);

  return {
    isAuth: !!uid,
    uid: uid,
    email: email,
    token: token,
  };
};

export default UseAuth;
