import './App.css'

type Props = { onLogin: () => void };

export function StartPage(props: Props) {
    return (
        <>
            <h1 className="press">Welcome!</h1>
            <div className="card">
                <button onClick={ props.onLogin }>
                    Login
                </button><br /><br />
            </div>
            <p className="press">
                Click button to continue.
            </p>
        </>
    )
}