import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Person, getAllPersons } from "./api";
import { Credentials } from "./Credentials";
import { EditPersonDataAsAdminPage } from "./EditPersonDataAsAdminPage";
import { CreatePersonPage } from "./CreatePersonPage";
import { DeletePersonPage } from "./DeletePersonPage";

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
                    <h2>Welcome, admin {props.creds.email}!</h2>
                    <button onClick={handleClickOnEditData}>Edit person data</button>
                    <button onClick={handleClickOnCreateUser}>Create new person</button>
                    <button onClick={handleClickOnDeleteUser}>Delete existing person</button>
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

            {editUserDataAsAdminPageIsOpen ? <EditPersonDataAsAdminPage creds={props.creds}
                onEdit={handleSuccesfulEdit} onBack={backFromEditUserDataByAdminPage} /> : null}
            {createUserPageIsOpen ? <CreatePersonPage creds={props.creds}
                onCreation={handleSuccesfulCreation} onBack={backFromCreateUserPage} /> : null}
            {deleteUserPageIsOpen ? <DeletePersonPage creds={props.creds}
                onDelete={handleSuccesfulDeletion} onBack={backFromDeletePage} /> : null}
        </>
    )

}