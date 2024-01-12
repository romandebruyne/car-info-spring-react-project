import { useState } from 'react'

import './App.css'
import { Credentials } from './Credentials';
import { StartPage } from './StartPage';
import { LoginPage } from './LoginPage';
import { UserPage } from './UserPage';
import { AdminPage } from './AdminPage';
import { CreatePersonPage } from './CreatePersonPage';

function App() {
  const [startPageIsOpen, setStartPageIsOpen] = useState(true);
  const [loginPageIsOpen, setLoginPageIsOpen] = useState(false);
  const [registrationPageIsOpen, setRegistrationPageIsOpen] = useState(false);
  const [credentials, setCredentials] = useState<null | Credentials>(null)
  const [wrongCredentialsWarningIsOpen, setWrongCredentialsWarningIsOpen] = useState(false);
  const [accountIsDeactivatedWarningIsOpen, setAccountIsDeactivatedWarningIsOpen] = useState(false);
  const [registrationWasSuccessfulInformationIsOpen, setRegistrationWasSuccessfulInformationIsOpen] = useState(false);
  const [userPageIsOpen, setUserPageIsOpen] = useState(false);
  const [adminPageIsOpen, setAdminPageIsOpen] = useState(false);

  function handleClickOnLogin() {
    setStartPageIsOpen(false);
    setLoginPageIsOpen(true);
  }

  function handleClickOnRegister() {
    setCredentials({ email: 'userwantstoregister@norealmail.none', password: 'zoA1' })
    setStartPageIsOpen(false);
    setRegistrationPageIsOpen(true);
  }

  function handleLogin(creds: Credentials, role: string) {
    if (role == "UNAUTHORIZED") {
      setLoginPageIsOpen(false);
      setWrongCredentialsWarningIsOpen(true);
    } else if (role == "DEACTIVATED") {
      setLoginPageIsOpen(false);
      setAccountIsDeactivatedWarningIsOpen(true);
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

  function handleRegistration() {
    setRegistrationWasSuccessfulInformationIsOpen(true);
    setRegistrationPageIsOpen(false);
  }

  function handleClickOnContinueToUserPage() {
    setRegistrationWasSuccessfulInformationIsOpen(false);
    setStartPageIsOpen(true);
  }

  function showUnauthorizedLoginWarning() {
    return (
      <div>
        <p>Wrong username and/ or password!</p>
        <button onClick={ backFromFailedLogin }>Back to login</button>
      </div>
    )
  }

  function showAccountIsDeactivatedWarning() {
    return (
      <div>
        <p>Account is deactivated, please contact the administrator!</p>
        <button onClick={ backFromUnauthorizedLogin }>Back to login</button>
      </div>
    )
  }

  function showSuccessfulRegistrationInformation() {
    return (
      <div>
        <p>Registration was successful!</p>
        <p>Please login with your credentials.</p>
        <button onClick={ handleClickOnContinueToUserPage }>Continue</button>
      </div>
    )
  }

  function backFromFailedLogin() {
    setLoginPageIsOpen(true);
    setWrongCredentialsWarningIsOpen(false);
  }

  function backFromUnauthorizedLogin() {
    setLoginPageIsOpen(true);
    setAccountIsDeactivatedWarningIsOpen(false);
  }

  function backFromLogin() {
    setLoginPageIsOpen(false);
    setStartPageIsOpen(true);
  }

  function backFromRegistration() {
    setRegistrationPageIsOpen(false);
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

  return (
    <>
      { /* Start Page */ }
      { startPageIsOpen ? <StartPage onLogin={ handleClickOnLogin } onRegister={ handleClickOnRegister } /> : null }

      { /* Login Page */ }
      { loginPageIsOpen ? <LoginPage onSubmit={ handleLogin } onBack={ backFromLogin } /> : null }
      { wrongCredentialsWarningIsOpen ? showUnauthorizedLoginWarning() : null }
      { accountIsDeactivatedWarningIsOpen ? showAccountIsDeactivatedWarning() : null }

      { /* Registration Page */ }
      { registrationPageIsOpen && credentials !== null ? <CreatePersonPage creds={ credentials }
        onCreation={ handleRegistration } onBack={ backFromRegistration } /> : null }
      { registrationWasSuccessfulInformationIsOpen ? showSuccessfulRegistrationInformation() : null }

      { /* User or Admin Page */ }
      { userPageIsOpen && credentials !== null ? <UserPage creds={ credentials } onBack={ backFromUserPage } /> : null }
      { adminPageIsOpen && credentials !== null ? <AdminPage creds={ credentials } onBack={ backFromAdminPage } /> : null }
    </>
  )
}

export default App
