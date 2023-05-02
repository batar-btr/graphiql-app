interface AuthPageProps {
  mode: 'sign-in' | 'sign-up';
}

const AuthPage = ({ mode }: AuthPageProps) => {
  return (
    <h1>
      Auth Page - <span>{mode === 'sign-in' ? 'SIGN-IN' : 'SIGN-UP'}</span>
    </h1>
  );
};

export default AuthPage;
