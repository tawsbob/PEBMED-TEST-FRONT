import {
    Link
  } from "react-router-dom";
import './index.scss';

function Template({ children }) {
  return (
    <div className="template-container">
        <div className="sidebar-container">
            <h3>Menu</h3>
            <nav>
                <Link to="/pacientes">Pacientes</Link>
                <Link to="/agendamento">Agendamentos</Link>
            </nav>
        </div>
        <div className="content-container">
            { children }
        </div>
    </div>
  );
}

export default Template;
