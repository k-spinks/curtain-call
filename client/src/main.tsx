import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import { configs } from './configs.ts';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
      domain={configs.AUTH0_DOMAIN}
      clientId={configs.AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: configs.REDIRECT_URI,
        audience: configs.AUTH0_AUDIENCE,
      }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>,
);
