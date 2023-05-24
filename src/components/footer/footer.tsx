import './index.scss';
import { GithubIcon } from './github.tsx';
import { RSSchoolIcon } from './rsschool.tsx';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <div className="footer-rsschool">
        <a className="footer-rsschool-svg" href="https://rs.school/react/" target="_blanket">
          <RSSchoolIcon />
        </a>
      </div>
      <div className="footer-creation">
        <h2>{t('footer')}</h2>
      </div>
      <div className="footer-github">
        <a className="footer-github-svg" href="https://github.com/batar-btr" target="_blanket">
          <GithubIcon />
        </a>
        <a
          className="footer-github-svg"
          href="https://github.com/kornienkokostia"
          target="_blanket"
        >
          <GithubIcon />
        </a>
        <a className="footer-github-svg" href="https://github.com/aleksander1802" target="_blanket">
          <GithubIcon />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
