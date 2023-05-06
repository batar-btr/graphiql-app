import './index.scss';
import UseAuth from '../../hooks/use-auth';
import { NavLink } from 'react-router-dom';

const WelcomePage = () => {
  const { isAuth } = UseAuth();
  return (
    <div className="welcome-page">
      <div className="top-bar">
        <div className="nav-bar">
          {isAuth ? (
            <NavLink to="/graphiql">Go to Main Page</NavLink>
          ) : (
            <>
              <NavLink to="/auth-signin">SignIn</NavLink>
              <span> / </span>
              <NavLink to="/auth-signup">SignUp</NavLink>
            </>
          )}
        </div>
      </div>
      <h1>Welcome Page</h1>
    </div>
  );
};

export default WelcomePage;
