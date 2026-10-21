import { useAuth0 } from '@auth0/auth0-react';
import { configs } from './configs';
import { useEffect } from 'react';

function App() {
  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
    user,
    getAccessTokenSilently,
  } = useAuth0();

  const getToken = async () => {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: configs.AUTH0_AUDIENCE,
        },
      });

      await fetch(`http://${configs.HOST_DOMAIN}/users/me`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: user?.name,
        }),
      });
    } catch (e) {
      console.log('Error fetching access token:', e);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      getToken();
    }
  }, [isAuthenticated]);

  const serverTest = async () => {
    try {
      const healthCheck = await fetch(`http://${configs.HOST_DOMAIN}/health`);
      alert(healthCheck.status);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert(`Server down: ${error.message}`);
    }
  };

  const login = async () => {
    if (!isAuthenticated) {
      loginWithRedirect();
    } else if (isAuthenticated) {
      logout();
    } else {
      alert('Unable to auth');
    }
  };

  return (
    <>
      <h1>{isAuthenticated ? `Hello ${user?.name}` : 'Hello from app'}</h1>
      <button onClick={() => serverTest()}>Test server</button>
      <button onClick={() => login()}>
        {isAuthenticated ? 'Logout' : 'Login'}
      </button>
    </>
  );
}

export default App;
