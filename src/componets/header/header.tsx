import './index.scss';
import { NavLink } from 'react-router-dom';
import UseAuth from '../../hooks/use-auth';
import { signOut, getAuth } from '@firebase/auth';

const Header = () => {
  const auth = getAuth();
  const { isAuth } = UseAuth();

  return (
    <header>
      <nav>
        <NavLink to="/">Wellcome</NavLink>
        <NavLink to="/graphiql">GraphiQL</NavLink>
      </nav>
      <div className="lang">
        <span>EN</span>
      </div>
      {isAuth ? (
        <a onClick={() => signOut(auth)}>SignOut</a>
      ) : (
        <div className="auth-btns">
          <NavLink to="/auth-signin">SignIn</NavLink>
          <span> / </span>
          <NavLink to="/auth-signup">SignUp</NavLink>
        </div>
      )}
    </header>
  );
};

export default Header;
