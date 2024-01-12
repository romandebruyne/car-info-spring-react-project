import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Person, getAllPersons } from "./api";
import { Credentials } from "./Credentials";
import { EditPersonDataAsAdminPage } from "./EditPersonDataAsAdminPage";
import { CreatePersonPage } from "./CreatePersonPage";
import { DeletePersonPage } from "./DeletePersonPage";
import { ChangePasswordAsAdminPage } from "./ChangePasswordAsAdminPage";

export type Props = { onBack: () => void; creds: Credentials };

export function AdminPage(props: Props) {
    const [credentials, setCredentials] = useState<Credentials>(props.creds);
    const [adminPageIsOpen, setAdminPageIsOpen] = useState(true);
    const [createUserPageIsOpen, setCreateUserPageIsOpen] = useState(false);
    const [editUserDataAsAdminPageIsOpen, setEditUserDataAsAdminPageIsOpen] = useState(false);
    const [changePasswordPageIsOpen, setChangePasswordPageIsOpen] = useState(false);
    const [deleteUserPageIsOpen, setDeleteUserPageIsOpen] = useState(false);
    const [persons, setPersons] = useState<null | Person[]>(null)

    useEffect(() => {
        getAllPersons(props.creds).then(body => setPersons(body.data));
    }, [])

    function handleClickOnCreateUser() {
        setCreateUserPageIsOpen(true);
        setAdminPageIsOpen(false);
    }

    function handleClickOnChangePassword() {
        setChangePasswordPageIsOpen(true);
        setAdminPageIsOpen(false);
    }

    function handleClickOnEditData() {
        setEditUserDataAsAdminPageIsOpen(true);
        setAdminPageIsOpen(false);
    }

    function handleClickOnDeleteUser() {
        setDeleteUserPageIsOpen(true);
        setAdminPageIsOpen(false);
    }

    function backFromCreateUserPage() {
        setCreateUserPageIsOpen(false);
        setAdminPageIsOpen(true);
    }

    function backFromEditUserDataByAdminPage() {
        setEditUserDataAsAdminPageIsOpen(false);
        setAdminPageIsOpen(true);
    }

    function backFromChangePasswordPage() {
        setChangePasswordPageIsOpen(false);
        setAdminPageIsOpen(true);
    }

    function backFromDeletePage() {
        setDeleteUserPageIsOpen(false);
        setAdminPageIsOpen(true);
    }

    function handleSuccesfulCreation(openAdminPage: boolean) {
        setCreateUserPageIsOpen(false);
        setAdminPageIsOpen(openAdminPage);
    }

    function handleSuccesfulDataEdit(openAdminPage: boolean, oldEmail: string, newEmail: string) {
        if (oldEmail === credentials.email) {
            setCredentials({ email: newEmail, password: credentials.password })
        }

        setEditUserDataAsAdminPageIsOpen(false);
        setAdminPageIsOpen(openAdminPage);
    }

    function handleSuccesfulPasswordChange(openAdminPage: boolean, emailOfEditedUser: string, newPassword: string) {
        if (emailOfEditedUser === credentials.email) {
            setCredentials({ email: emailOfEditedUser, password: newPassword })
        }

        setChangePasswordPageIsOpen(false);
        setAdminPageIsOpen(openAdminPage);
    }

    function handleSuccesfulDeletion(openAdminPage: boolean) {
        setDeleteUserPageIsOpen(false);
        setAdminPageIsOpen(openAdminPage);
    }

    const tableColumns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 80 },
        { field: 'salutation', headerName: 'Sal.', width: 60 },
        { field: 'firstName', headerName: 'First name', width: 200 },
        { field: 'secondName', headerName: 'Second name', width: 200 },
        { field: 'email', headerName: 'Mail', width: 400 },
        { field: 'dateOfEntry', headerName: 'Date of entry', width: 100 },
        { field: 'deactivated', headerName: 'Deactivated?', width: 100 },
        {
            field: 'car', headerName: 'Model ID', width: 100,
            valueGetter: (params) => {
                if (!params.id) {
                    return "No car found.";
                }
                return params.id;
            },
        },
    ];

    return (
        <>
            {adminPageIsOpen ?
                <>
                    <h2>Welcome, admin '{ credentials.email }'!</h2>
                    <button onClick={ handleClickOnCreateUser }>Create new person</button>
                    <button onClick={ handleClickOnEditData }>Edit person data</button>
                    <button onClick={ handleClickOnChangePassword }>Change password</button>
                    <button onClick={ handleClickOnDeleteUser }>Delete existing person</button>
                    <button onClick={ props.onBack }>Back</button><br /><br />

                    <div>
                        {persons !== null ?
                            <div className="whitetable">
                                <DataGrid
                                    rows={persons}
                                    columns={tableColumns}
                                    initialState={ { pagination: { paginationModel: { page: 0, pageSize: 50 }, }, } }
                                    pageSizeOptions={ [50] } />
                            </div> : null}
                    </div>
                </> : null}

            { createUserPageIsOpen ? <CreatePersonPage creds={ credentials }
                onCreation={ handleSuccesfulCreation } onBack={ backFromCreateUserPage } /> : null }
            { editUserDataAsAdminPageIsOpen ? <EditPersonDataAsAdminPage creds={ credentials }
                onEdit={ handleSuccesfulDataEdit } onBack={ backFromEditUserDataByAdminPage } /> : null }
            { changePasswordPageIsOpen ? <ChangePasswordAsAdminPage creds={credentials }
                onChange={ handleSuccesfulPasswordChange } onBack={ backFromChangePasswordPage } /> : null }
            { deleteUserPageIsOpen ? <DeletePersonPage creds={ credentials }
                onDelete={ handleSuccesfulDeletion } onBack={ backFromDeletePage } /> : null }
        </>
    )
}