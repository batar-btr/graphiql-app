import './index.scss';
import { NavLink } from 'react-router-dom';
import UseAuth from '../../hooks/use-auth';
import { signOut, getAuth } from '@firebase/auth';
import LanguageSelector from '../../public/languageSelector/LanguageSelector';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const auth = getAuth();
  const { isAuth } = UseAuth();
  const { t } = useTranslation();

  return (
    <header>
      <nav>
        <NavLink to="/">{t('wellcome')}</NavLink>
        <NavLink to="/graphiql">{t('graphiql')}</NavLink>
      </nav>
      <LanguageSelector />
      {isAuth ? (
        <a onClick={() => signOut(auth)}>{t('signout')}</a>
      ) : (
        <div className="auth-btns">
          <NavLink to="/auth-signin">{t('signin')}</NavLink>
          <span> / </span>
          <NavLink to="/auth-signup">{t('signup')}</NavLink>
        </div>
      )}
    </header>
  );
};

export default Header;
