import { useState } from "react";
import { Credentials } from "./Credentials";
import { CarInfoPage } from "./CarInfoPage";
import { EditPersonDataAsUserPage } from "./EditPersonDataAsUserPage";

export type Props = { creds: Credentials; onBack: () => void };

export function UserPage(props: Props) {
    const [userPageIsOpen, setUserPageIsOpen] = useState(true);
    const [statisticsPageExtendedIsOpen, setStatisticsPageExtendedIsOpen] = useState(false);
    const [editUserDataPageIsOpen, setEditUserDataPageIsOpen] = useState(false);
    const [credentials, setCredentials] = useState<Credentials>(props.creds);

    function handleClickOnStatistics() {
        setStatisticsPageExtendedIsOpen(true);
        setUserPageIsOpen(false);
    }

    function handleClickOnEditData() {
        setEditUserDataPageIsOpen(true);
        setUserPageIsOpen(false);
    }

    function handleSuccesfulEdit(openUserPage: boolean, newEmail: string, newPassword: string) {
        setCredentials({ email: newEmail, password: newPassword })
        setEditUserDataPageIsOpen(false);
        setUserPageIsOpen(openUserPage);
    }

    function backFromStatisticspageExtended() {
        setStatisticsPageExtendedIsOpen(false);
        setUserPageIsOpen(true);
    }

    function backFromEditUserDataPage() {
        setEditUserDataPageIsOpen(false);
        setUserPageIsOpen(true);
    }

    return (
        <>
            {userPageIsOpen ?
                <>
                    <h2>Welcome, user {props.creds.email}!</h2>
                    <button onClick={handleClickOnStatistics}>Show car information</button>
                    <button onClick={handleClickOnEditData}>Edit person data</button>
                    <button onClick={props.onBack}>Back</button>
                </> : null}

            {statisticsPageExtendedIsOpen ? <CarInfoPage creds={ credentials }
                onBack={ backFromStatisticspageExtended } /> : null}
            {editUserDataPageIsOpen ? <EditPersonDataAsUserPage creds={ credentials } onEdit={ handleSuccesfulEdit } 
                onBack={ backFromEditUserDataPage } /> : null}
        </>
    )
}