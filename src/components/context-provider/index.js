import AppContext from '../../context'
import { restClient } from '../../helpers'

const RestClient = restClient()

function ContextProViderComponent({ children }) {
  return (
    <AppContext.Provider value={{
        RestClient
    }}>
        { children }
    </AppContext.Provider>
  );
}

export default ContextProViderComponent;
