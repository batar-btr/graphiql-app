import './index.scss';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header>
    <nav>
      <NavLink to="/">Wellcome</NavLink>
      <NavLink to="/graphiql">GraphiQL</NavLink>
    </nav>
    <div className="lang">
      <span>EN</span>
    </div>
    <div className="auth-btns">
      <NavLink to="/auth-signin">SignIn</NavLink>
      <span> / </span>
      <NavLink to="/auth-signup">SignUp</NavLink>
    </div>
  </header>
);

export default Header;
