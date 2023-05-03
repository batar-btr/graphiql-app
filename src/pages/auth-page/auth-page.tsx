import AuthForm from '../../componets/auth-form/auth-form';

interface AuthPageProps {
  mode: 'sign-in' | 'sign-up';
}

const AuthPage = ({ mode }: AuthPageProps) => {
  return (
    <>
      <h1>
        Auth Page - <span>{mode === 'sign-in' ? 'SIGN-IN' : 'SIGN-UP'}</span>
      </h1>
      <AuthForm />
    </>
  );
};

export default AuthPage;
