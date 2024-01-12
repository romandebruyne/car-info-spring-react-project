import { useState } from "react";
import { Credentials } from "./Credentials";
import { changePersonsPassword } from "./api";

type Props = { creds: Credentials; onChange: (openUserPage: boolean, newPassword: string) => void; onBack: () => void };

export function ChangePasswordAsUserPage(props: Props) {
    const [changePasswordAsUserPageIsOpen, setChangePasswordAsUserPageIsOpen] = useState(true);
    const [errorOccurredWarningIsOpen, setErrorOccurredWarningIsOpen] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordValidation, setNewPasswordValidation] = useState("");

    async function handlePasswordChange(props: Props) {
        try {
            await changePersonsPassword(props.creds, props.creds.email, oldPassword, newPassword, newPasswordValidation);
            props.onChange(true, newPassword);
        } catch {
            handleErrorOccurred();
        }
    }

    function handleErrorOccurred() {
        setChangePasswordAsUserPageIsOpen(false);
        setErrorOccurredWarningIsOpen(true);
    }

    function showErrorOccurredWarning() {
        return (
            <div>
                <p>Error occurred, try again please!</p>
                <button onClick={ backFromError }>Back</button>
            </div>
        )
    }

    function backFromError() {
        setErrorOccurredWarningIsOpen(false);
        setChangePasswordAsUserPageIsOpen(true);
        setOldPassword("");
        setNewPassword("");
        setNewPasswordValidation("");
    }

    return (
        <>
            { changePasswordAsUserPageIsOpen ?
                <>
                    <h2>Change password</h2>
                    <p>Mandatory fields</p>
                    <input type="text" placeholder="Old Password" value={ oldPassword }
                        onChange={event => setOldPassword(event.target.value)} /><br />
                    <input type="text" placeholder="New Password" value={ newPassword }
                        onChange={event => setNewPassword(event.target.value)} /><br />
                    <input type="text" placeholder="New Password Validation" value={ newPasswordValidation }
                        onChange={event => setNewPasswordValidation(event.target.value)} /><br />

                    <button
                        disabled={ oldPassword === "" || newPassword === "" || newPasswordValidation === "" }
                        onClick={() => handlePasswordChange(props)}>Submit</button>
                    <button onClick={ props.onBack }>Back</button>
                </> : null }

            { errorOccurredWarningIsOpen ? showErrorOccurredWarning() : null } 
        </>
    )

}