
import { NavLink } from 'react-router-dom'


function Header() {



  return (
  <nav className="navbar navbar-expand-lg navbar-light bg-primary shadow-sm sticky-top px-4 py-2">
  <div className="container-fluid">
    <a className="navbar-brand fw-bold fs-2 text-white" href="/">
      Churn<span className="text-warning">Prediction</span>
    </a>

   

  </div>
</nav>
  );
}

export default Header;
