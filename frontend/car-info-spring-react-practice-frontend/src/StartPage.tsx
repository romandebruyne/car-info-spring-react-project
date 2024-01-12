import './App.css'

type Props = { onLogin: () => void; onRegister: () => void };

export function StartPage(props: Props) {
    return (
        <>
            <h1 className="press">Welcome to Car Info!</h1>
            <div className="card">
                <button onClick={ props.onLogin }>
                    Login
                </button><br /><br />
                <button onClick={ props.onRegister }>
                    Register
                </button><br /><br />
            </div>
            <p className="press">
                Continue via click on button.
            </p>
        </>
    )
}