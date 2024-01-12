import { useState } from "react"
import { login } from "./api";
import { Credentials } from "./Credentials";

type Props = { onSubmit: (creds: Credentials, role: string) => void, onBack: () => void };

export function LoginPage(props: Props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin(props: Props) {
        login(email, password)
            .then(body => {
                if (body.data === "UNAUTHORIZED" || body.data === "DEACTIVATED") {
                    props.onSubmit({ email: "", password: "" }, body.data);
                } else {
                    props.onSubmit({ email: email, password: password }, body.data);
                }
            })
    }

    return (
        <>
            <div>
                <h2>Login</h2>
                <input type="text" placeholder="Mail" value={ email }
                    onChange={ (event) => setEmail(event.target.value) } /><br />
                <input type="password" placeholder="Password" value={ password }
                    onChange={ (event) => setPassword(event.target.value) } /><br /><br />

                <button
                    disabled={ email === "" || password === "" }
                    onClick={ () => handleLogin(props) }
                >Login
                </button>
                <button onClick={ props.onBack }>Back</button>
            </div>
        </>
    )
}