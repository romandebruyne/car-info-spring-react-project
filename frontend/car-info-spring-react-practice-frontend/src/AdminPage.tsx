import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Person, getAllPersons } from "./api";
import { Credentials } from "./Credentials";
import { EditUserDataAsAdminPage } from "./EditUserDataAsAdminPage";
import { CreateUserPage } from "./CreateUserPage";
import { DeleteUserPage } from "./DeleteUserPage";

export type Props = { onBack: () => void; creds: Credentials };

export function AdminPage(props: Props) {
    const [adminPageIsOpen, setAdminPageIsOpen] = useState(true);
    const [editUserDataAsAdminPageIsOpen, setEditUserDataAsAdminPageIsOpen] = useState(false);
    const [createUserPageIsOpen, setCreateUserPageIsOpen] = useState(false);
    const [deleteUserPageIsOpen, setDeleteUserPageIsOpen] = useState(false);
    const [updateTable, setUpdateTable] = useState(false);
    const [persons, setPersons] = useState<null | Person[]>(null)

    useEffect(() => {
        getAllPersons(props.creds).then(body => setPersons(body.data));
    }, [updateTable])

    function handleClickOnEditData() {
        setEditUserDataAsAdminPageIsOpen(true);
        setAdminPageIsOpen(false);
    }

    function handleClickOnCreateUser() {
        setCreateUserPageIsOpen(true);
        setAdminPageIsOpen(false);
    }

    function handleClickOnDeleteUser() {
        setDeleteUserPageIsOpen(true);
        setAdminPageIsOpen(false);
    }

    function backFromEditUserDataByAdminPage() {
        setEditUserDataAsAdminPageIsOpen(false);
        setAdminPageIsOpen(true);
    }

    function backFromCreateUserPage() {
        setCreateUserPageIsOpen(false);
        setAdminPageIsOpen(true);
    }

    function backFromDeletePage() {
        setDeleteUserPageIsOpen(false);
        setAdminPageIsOpen(true);
    }

    function handleSuccesfulEdit(openAdminPage: boolean) {
        setEditUserDataAsAdminPageIsOpen(false);
        setAdminPageIsOpen(openAdminPage);
        setUpdateTable(!updateTable);
    }

    function handleSuccesfulCreation(openAdminPage: boolean) {
        setCreateUserPageIsOpen(false);
        setAdminPageIsOpen(openAdminPage);
        setUpdateTable(!updateTable);
    }

    function handleSuccesfulDeletion(openAdminPage: boolean) {
        setDeleteUserPageIsOpen(false);
        setAdminPageIsOpen(openAdminPage);
        setUpdateTable(!updateTable);
    }

    const tableColumns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 76 },
        { field: 'salutation', headerName: 'Salutation', width: 57 },
        { field: 'firstName', headerName: 'First name', width: 100 },
        { field: 'secondName', headerName: 'Second name', width: 100 },
        { field: 'address', headerName: 'Address', width: 80 },
        { field: 'houseNumber', headerName: 'House number', width: 60 },
        { field: 'areaCode', headerName: 'Area code', width: 60 },
        { field: 'area', headerName: 'Area', width: 50 },
        { field: 'birthDate', headerName: 'Birth date', width: 120 },
        { field: 'company', headerName: 'Company', width: 50 },
        { field: 'email', headerName: 'EMail', width: 180 },
        { field: 'dateOfEntry', headerName: 'Date of entry', width: 100 },
        { field: 'deactivated', headerName: 'deactivated', width: 100 },
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
                    <h2>Welcome, Admin!</h2>
                    <button onClick={handleClickOnEditData}>Edit user data</button>
                    <button onClick={handleClickOnCreateUser}>Create new user</button>
                    <button onClick={handleClickOnDeleteUser}>Delete existing user</button>
                    <button onClick={props.onBack}>Back</button><br /><br />

                    <div>
                        {persons !== null ?
                            <div className="whitetable">
                                <DataGrid
                                    rows={persons}
                                    columns={tableColumns}
                                    initialState={{ pagination: { paginationModel: { page: 0, pageSize: 50 }, }, }}
                                    pageSizeOptions={[50]} />
                            </div> : null}
                    </div>
                </> : null}

            {editUserDataAsAdminPageIsOpen ? <EditUserDataAsAdminPage creds={props.creds}
                onEdit={handleSuccesfulEdit} onBack={backFromEditUserDataByAdminPage} /> : null}
            {createUserPageIsOpen ? <CreateUserPage creds={props.creds}
                onCreation={handleSuccesfulCreation} onBack={backFromCreateUserPage} /> : null}
            {deleteUserPageIsOpen ? <DeleteUserPage creds={props.creds}
                onDelete={handleSuccesfulDeletion} onBack={backFromDeletePage} /> : null}
        </>
    )

}