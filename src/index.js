import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from "react-query";
import { UserContextProvider } from './context/userContext';
import { ModalContextProvider } from './context/modalContext';
import { DropdownContextProvider } from './context/dropdownContex'
import { ModalLoginContextProvider } from './context/modalLogin'
import { StatusLoginContextProvider } from './context/statusLoginContext';
import { UserDropDownProvider } from './context/userDropdown'
import { ComponentContextProvider } from './context/ComponentContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
const client = new QueryClient();

root.render(
  <React.StrictMode>
    <UserContextProvider>
      <QueryClientProvider client={client}>
        <ComponentContextProvider>
          <ModalContextProvider>
            <DropdownContextProvider>
              <ModalLoginContextProvider>
                <UserDropDownProvider>
                  <StatusLoginContextProvider>
                    <Router>
                      <App />
                    </Router>
                  </StatusLoginContextProvider>
                </UserDropDownProvider>
              </ModalLoginContextProvider>
            </DropdownContextProvider>
          </ModalContextProvider>
        </ComponentContextProvider>
      </QueryClientProvider>
    </UserContextProvider>
  </React.StrictMode>,
  // document.getElementById('root')
);


