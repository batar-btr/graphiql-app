import './index.scss';
import UseAuth from '../../hooks/use-auth';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const WelcomePage = () => {
  const { isAuth } = UseAuth();
  const { t } = useTranslation();

  return (
    <div className="welcome-page">
      <div className="top-bar">
        <div className="nav-bar">
          {isAuth ? (
            <NavLink to="/graphiql">{t('goToMain')}</NavLink>
          ) : (
            <>
              <NavLink to="/auth-signin">{t('signin')}</NavLink>
              <span> / </span>
              <NavLink to="/auth-signup">{t('signup')}</NavLink>
            </>
          )}
        </div>
      </div>
      <h1>{t('welcomePage')}</h1>
    </div>
  );
};

export default WelcomePage;
