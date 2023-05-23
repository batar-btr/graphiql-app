import { useEffect } from 'react';
import AuthForm from '../../components/auth-form/auth-form';
import useAuth from '../../hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
interface AuthPageProps {
  mode: 'sign-in' | 'sign-up';
}

const AuthPage = ({ mode }: AuthPageProps) => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (isAuth) {
      navigate('/graphiql');
    }
  }, [isAuth, navigate]);

  return (
    <>
      <h1>
        {t('authpage')} - <span>{mode === 'sign-in' ? t('signinCamel') : t('signupCamel')}</span>
      </h1>
      <AuthForm mode={mode} />
    </>
  );
};

export default AuthPage;
