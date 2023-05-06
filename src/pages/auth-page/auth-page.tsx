import { useEffect } from 'react';
import AuthForm from '../../components/auth-form/auth-form';
import useAuth from '../../hooks/use-auth';
import { useNavigate } from 'react-router-dom';

interface AuthPageProps {
  mode: 'sign-in' | 'sign-up';
}

const AuthPage = ({ mode }: AuthPageProps) => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate('/graphiql');
    }
  }, [isAuth, navigate]);

  return (
    <>
      <h1>
        Auth Page - <span>{mode === 'sign-in' ? 'SIGN-IN' : 'SIGN-UP'}</span>
      </h1>
      <AuthForm mode={mode} />
    </>
  );
};

export default AuthPage;
