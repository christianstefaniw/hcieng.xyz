import { createContext } from 'react'

const LoggedinContext = createContext({
    loggedin: false,
    toggle_loggedin: () => {},
  });
  

export default LoggedinContext;