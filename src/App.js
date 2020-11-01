import { Home, Pacientes, Paciente, Agendamentos } from './pages'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './all.scss';
import { ContextProvider } from './components';


const pageRoute = (Page, path)=>(
  <Route exact path={path}>
    <Page />
  </Route>
)

function App() {
  return (
    <Router>
      <ContextProvider>
        <Switch>
          { pageRoute(Home, '/') }
          { pageRoute(Pacientes, '/pacientes') }
          { pageRoute(Paciente, '/paciente/:id') }
          { pageRoute(Agendamentos, '/agendamento') }
        </Switch>
      </ContextProvider>
  </Router>
  );
}

export default App;
