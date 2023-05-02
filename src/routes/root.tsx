import Header from '../componets/header/header';
import Footer from '../componets/footer/footer';
import { Outlet } from 'react-router-dom';

const Root = () => (
  <>
    <div className="wrapper">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  </>
);

export default Root;
