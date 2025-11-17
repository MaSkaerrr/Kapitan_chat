import styles from './authentication.module.css';

const Login = ({auth, formDetails}) => {
    const [authType, setAuthType] = auth;
    const {
        loginUsername,
        setLoginUsername,
        loginPassword,
        setLoginPassword
    } = formDetails;

    return ( 
        <div className={styles.login_content}>
            <h2 className={styles.login_title}>Login</h2>
            <div className={styles.login_fields}>
                <input 
                    type="text" 
                    placeholder='Enter your username'
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                />
                <input 
                    type="password" 
                    placeholder='Enter your password'
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                />
            </div>
            <button className={styles.login_button}>Login</button>
            <p className={styles.bottom_text}>Don't have account? <span onClick={() => setAuthType('register')}>Create account</span></p>
        </div> 
    );
}
 
export default Login;