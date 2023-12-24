import { useState } from 'react'

import './App.css'
import { Credentials } from './Credentials';
import { Startpage } from './Startpage';
import { Loginpage } from './Loginpage';

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

  return(
    <>
      { /* Start Page */}
      {startPageIsOpen ? <Startpage onLogin={ handleClickOnLogin } /> : null}

      { /* Login Page */}
      {loginPageIsOpen ? <Loginpage onSubmit={handleLogin} onBack={backFromLogin} /> : null}
      {wrongCredentialsWarningIsOpen ? handleUnauthorizedLogin() : null}
      {deactivatedWarningIsOpen ? handleDeactivatedUserLogin() : null}

      { /* User or Admin Page */}
      {userPageIsOpen && credentials !== null ? null : null}
      {adminPageIsOpen && credentials !== null ? null : null}
    </>
  )
}

export default App
