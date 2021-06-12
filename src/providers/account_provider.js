import { createContext } from 'react'

const AccountContext = createContext({
    account_info: null,
    add_account_info: () => {},
  });
  

export default AccountContext;