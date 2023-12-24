import { useState } from 'react'

import './App.css'
import { Credentials } from './Credentials';
import { StartPage } from './StartPage';
import { LoginPage } from './LoginPage';
import { UserPage } from './UserPage';
import { AdminPage } from './AdminPage';

function App() {
  const [startPageIsOpen, setStartPageIsOpen] = useState(true);
  const [loginPageIsOpen, setLoginPageIsOpen] = useState(false);
  const [credentials, setCredentials] = useState<null | Credentials>(null)
  const [wrongCredentialsWarningIsOpen, setWrongCredentialsWarningIsOpen] = useState(false);
  const [deactivatedWarningIsOpen, setDeactivatedWarningIsOpen] = useState(false);
  const [userPageIsOpen, setUserPageIsOpen] = useState(false);
  const [adminPageIsOpen, setAdminPageIsOpen] = useState(false);

  function handleClickOnLogin() {
    setStartPageIsOpen(false);
    setLoginPageIsOpen(true);
  }

  function handleLogin(creds: Credentials, role: string) {
    if (role == "UNAUTHORIZED") {
      setLoginPageIsOpen(false);
      setWrongCredentialsWarningIsOpen(true);
    } else if (role == "DEACTIVATED") {
      setLoginPageIsOpen(false);
      setDeactivatedWarningIsOpen(true);
    } else if (role === "ADMIN") {
      setCredentials(creds);
      setLoginPageIsOpen(false);
      setAdminPageIsOpen(true);
    } else {
      setCredentials(creds);
      setLoginPageIsOpen(false);
      setUserPageIsOpen(true);
    }
  }

  function handleUnauthorizedLogin() {
    return (
      <div>
        <p>Wrong username and/ or password!</p>
        <button onClick={backFromFailedLogin}>Back to login</button>
      </div>
    )
  }

  function handleDeactivatedUserLogin() {
    return (
      <div>
        <p>Please contact the administrator!</p>
        <button onClick={backFromUnauthorizedLogin}>Back to login</button>
      </div>
    )
  }

  function backFromFailedLogin() {
    setLoginPageIsOpen(true);
    setWrongCredentialsWarningIsOpen(false);
  }

  function backFromUnauthorizedLogin() {
    setLoginPageIsOpen(true);
    setDeactivatedWarningIsOpen(false);
  }

  function backFromLogin() {
    setLoginPageIsOpen(false);
    setStartPageIsOpen(true);
  }

  function backFromUserPage() {
    setUserPageIsOpen(false);
    setLoginPageIsOpen(true);
  }

  function backFromAdminPage() {
    setAdminPageIsOpen(false);
    setLoginPageIsOpen(true);
  }

  return(
    <>
      { /* Start Page */}
      { startPageIsOpen ? <StartPage onLogin={ handleClickOnLogin } /> : null }

      { /* Login Page */}
      { loginPageIsOpen ? <LoginPage onSubmit={ handleLogin } onBack={ backFromLogin } /> : null }
      { wrongCredentialsWarningIsOpen ? handleUnauthorizedLogin() : null }
      { deactivatedWarningIsOpen ? handleDeactivatedUserLogin() : null }

      { /* User or Admin Page */}
      { userPageIsOpen && credentials !== null ? <UserPage creds={ credentials } onBack={ backFromUserPage } /> : null }
      { adminPageIsOpen && credentials !== null ? <AdminPage creds={credentials} onBack={ backFromAdminPage } /> : null }
    </>
  )
}

export default App
