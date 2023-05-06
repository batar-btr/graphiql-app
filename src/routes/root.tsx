import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import { Outlet, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { useEffect } from 'react';
import { useAppDispatch } from '../hooks/redux-hooks';
import { setUser } from '../store/userSlice';

const Root = () => {
  const auth = getAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubsribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { uid, email } = user;
        const token = await user.getIdToken();
        dispatch(setUser({ uid, email, token }));
      } else {
        dispatch(
          setUser({
            uid: null,
            email: null,
            token: null,
          })
        );
        navigate('/');
      }
    });
    return () => {
      unsubsribe();
    };
  }, [auth, dispatch, navigate]);

  return (
    <>
      <div className="wrapper">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Root;
