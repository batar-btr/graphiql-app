import './index.scss';
import UseAuth from '../../hooks/use-auth';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import batarbtr from './img/batar-btr.jpg';
import kornienkokostia from './img/kornienkokostia.jpg';
import aleksander1802 from './img/aleksander1802.jpg';

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
      <div className="welcome-page-wrapper">
        <div className="welcome-page-wrapper-description">
          <h1>{t('welcomePage')}</h1>
          <p>
            {t('to')} <span>GraphiQL !</span>
          </p>
          <p>
            <span>GraphiQL</span> {t('playground')} <br /> <span>GraphiQL</span> {t('final')}{' '}
            <span>{t('react')}</span>.
          </p>
          <ol className="welcome-page-wrapper-description-rectangle">
            {t('course')}
            <li>
              <span>JavaScript</span>{' '}
            </li>
            <li>
              <span>TypeScript</span>{' '}
            </li>
            <li>
              {' '}
              <span>
                Git, GitHub (clone, add, commit, push, pull, merge, rebase, pull request flow)
              </span>
            </li>
            <li>
              <span>NPM, Webpack</span>{' '}
            </li>
            <li>
              {' '}
              <span>CSS3 / HTML5</span>
            </li>
            <li>
              <span>Chrome DevTools, Figma</span>
            </li>
            <li>
              <span>{t('understanding')}</span>
            </li>
          </ol>
        </div>
        <h2>{t('team')}</h2>
        <div className="welcome-page-wrapper-about">
          <div className="welcome-page-wrapper-about-item">
            <div className="welcome-page-wrapper-about-image">
              <img className="welcome-page-wrapper-about-image" src={batarbtr} alt="batarbtr" />
            </div>
            <div className="welcome-page-wrapper-about-name">
              <span>{t('Illia')}</span> <em>aka</em> <strong>batar-btr</strong>
            </div>
          </div>
          <div className="welcome-page-wrapper-about-item">
            <div className="welcome-page-wrapper-about-image">
              <img
                className="welcome-page-wrapper-about-image"
                src={kornienkokostia}
                alt="kornienkokostia"
              />
            </div>
            <div className="welcome-page-wrapper-about-name">
              <span>{t('Kostiantyn')}</span> <em>aka</em> <strong>kornienkokostia</strong>
            </div>
          </div>
          <div className="welcome-page-wrapper-about-item">
            <div className="welcome-page-wrapper-about-image">
              <img src={aleksander1802} alt="aleksander1802" />
            </div>
            <div className="welcome-page-wrapper-about-name">
              <span>{t('Aleksandr')}</span> <em>aka</em> <strong>aleksander1802</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
