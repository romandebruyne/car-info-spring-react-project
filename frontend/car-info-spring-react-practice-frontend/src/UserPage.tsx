import { useState } from "react";
import { Credentials } from "./Credentials";
import { CarInfoPage } from "./CarInfoPage";
import { EditPersonDataAsUserPage } from "./EditPersonDataAsUserPage";
import { ChangePasswordAsUserPage } from "./ChangePasswordAsUserPage";
import { TopThreePage } from "./TopThreePage";

export type Props = { creds: Credentials; onBack: () => void };

export function UserPage(props: Props) {
    const [userPageIsOpen, setUserPageIsOpen] = useState(true);
    const [carInfoPageIsOpen, setCarInfoPageIsOpen] = useState(false);
    const [topThreeElementsPageIsOpen, setTopThreeElementsPageIsOpen] = useState(false);
    const [editUserDataPageIsOpen, setEditUserDataPageIsOpen] = useState(false);
    const [changePasswordPageIsOpen, setChangePasswordPageIsOpen] = useState(false);
    const [credentials, setCredentials] = useState<Credentials>(props.creds);

    function handleClickOnCarInfo() {
        setCarInfoPageIsOpen(true);
        setUserPageIsOpen(false);
    }

    function handleClickOnTopThreeElements() {
        setTopThreeElementsPageIsOpen(true);
        setUserPageIsOpen(false);
    }

    function handleClickOnEditData() {
        setEditUserDataPageIsOpen(true);
        setUserPageIsOpen(false);
    }

    function handleClickOnChangePassword() {
        setChangePasswordPageIsOpen(true);
        setUserPageIsOpen(false);
    }

    function handleSuccesfulDataEdit(openUserPage: boolean, newEmail: string) {
        setCredentials({ email: newEmail, password: credentials.password })
        setEditUserDataPageIsOpen(false);
        setUserPageIsOpen(openUserPage);
    }

    function handleSuccesfulPasswordChange(openUserPage: boolean, newPassword: string) {
        setCredentials({ email: credentials.email, password: newPassword })
        setChangePasswordPageIsOpen(false);
        setUserPageIsOpen(openUserPage);
    }

    function backFromCarInfoPage() {
        setCarInfoPageIsOpen(false);
        setUserPageIsOpen(true);
    }

    function backFromTopThreeElementsPage() {
        setTopThreeElementsPageIsOpen(false);
        setUserPageIsOpen(true);
    }

    function backFromEditUserDataPage() {
        setEditUserDataPageIsOpen(false);
        setUserPageIsOpen(true);
    }

    function backFromChangePasswordPage() {
        setChangePasswordPageIsOpen(false);
        setUserPageIsOpen(true);
    }

    return (
        <>
            { userPageIsOpen ?
                <>
                    <h2>Welcome, user {props.creds.email}!</h2>
                    <button onClick={ handleClickOnCarInfo }>Show car information</button>
                    <button onClick={ handleClickOnTopThreeElements }>Show top three elements</button>
                    <button onClick={ handleClickOnEditData }>Edit person data</button>
                    <button onClick={ handleClickOnChangePassword }>Change password</button>
                    <button onClick={ props.onBack }>Back</button>
                </> : null }

            { carInfoPageIsOpen ? <CarInfoPage creds={ credentials }
                onBack={ backFromCarInfoPage } /> : null }
            { topThreeElementsPageIsOpen ? <TopThreePage onBack={ backFromTopThreeElementsPage } /> : null }
            { editUserDataPageIsOpen ? <EditPersonDataAsUserPage creds={ credentials } onEdit={ handleSuccesfulDataEdit } 
                onBack={ backFromEditUserDataPage } /> : null }
            { changePasswordPageIsOpen ? <ChangePasswordAsUserPage creds={ credentials }
                onChange={ handleSuccesfulPasswordChange }
                onBack={ backFromChangePasswordPage } /> : null }
        </>
    )
}