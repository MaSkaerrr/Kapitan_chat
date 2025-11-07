import styles from './authentication.module.css';

const Register = ({auth, formDetails}) => {
    const [authType, setAuthType] = auth;
    const {
        registerUsername,
        setRegisterUsername,
        registerPassword,
        setRegisterPassword
    } = formDetails;

    return ( 
        <div className={styles.register_content}>
            <h2 className={styles.register_title}>Register</h2>
            <div className={styles.register_fields}>
                <input type="text" />
                <input type="text" />
                <input type="text" />
            </div>
            <button className={styles.login_button}>Register</button>
            <p className={styles.bottom_text}>Already have an account? <span onClick={() => setAuthType('login')}>Log in</span></p>
        </div> 
     );
}
 
export default Register;