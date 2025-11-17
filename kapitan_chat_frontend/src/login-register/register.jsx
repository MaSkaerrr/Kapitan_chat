import { useEffect, useRef, useState } from 'react';
import styles from './authentication.module.css';
import RegisterStep from './registerStep';

const Register = ({auth, formDetails}) => {
    const [authType, setAuthType] = auth;
    const {
        registerUsername,
        setRegisterUsername,
        registerPassword,
        setRegisterPassword,
        email,
        setEmail,
        registerConfirmPassword,
        setRegisterConfirmPassword,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        phoneNumber,
        setPhoneNumber
    } = formDetails;

    // Деталі які буду ітеруватися для покрокової реєстрації
    const usernameRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const phoneNumberRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const registerStepsDetails = {
        username : [
            [registerUsername, setRegisterUsername, "Enter your username", usernameRef, "MANDATORY", /^[A-Za-z][A-Za-z0-9]{3,}$/],
        ],
        names : [
            [firstName, setFirstName, "Enter your first name", firstNameRef, "MANDATORY", /^[A-Za-z]{2,}$/],
            [lastName, setLastName, "Enter your last name", lastNameRef, "MANDATORY", /^[A-Za-z]{2,}$/]
        ],
        email : [
            [email, setEmail, "Enter your email", emailRef, "MANDATORY", "EMAIL", /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/],
        ],
        phoneNumber : [
            [phoneNumber, setPhoneNumber, "Enter your phone number", phoneNumberRef, "MANDATORY", "PHONENUMBER", /^\+?[0-9\s\-()]{10,20}$/]
        ],
        password : [
            [registerPassword, setRegisterPassword, "Enter your password", passwordRef, "MANDATORY", "PASSWORD", /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/],
            [registerConfirmPassword, setRegisterConfirmPassword, "Enter your password", confirmPasswordRef, "MANDATORY", "PASSWORD", /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/]
        ]
    }

    const [currentStep, setCurrentStep] = useState(1);

    useEffect(() => {
        Object
            .values(registerStepsDetails)
            .forEach(step => {
                step.forEach(field => {
                    const ref = field[3];
                    if (ref?.current) {
                        ref.current.parentElement.classList.add(styles.hiddenStep);
                        ref.current.parentElement.classList.remove(styles.visibleStep);
                    }
                });
            });

        Object
            .values(registerStepsDetails)
            .forEach((field, i) => {
                if (i == currentStep - 1 && field[0][3]?.current)
                    field.forEach((item) => {
                        item[3].current.parentElement.classList.add(styles.visibleStep)
                        item[3].current.parentElement.classList.remove(styles.hiddenStep)
                    })
            })

        console.log("Current step: ", currentStep)
    }, [currentStep]);

    function CheckCurrentFields() {
        const stepFields = Object.values(registerStepsDetails)[currentStep - 1];
        let allValid = true;

        stepFields.forEach((item) => {
            if (!item[3].current) return;
            const regex = item[item.length - 1];
            const value = item[3].current.value;

            if (!regex.test(value)) {
                allValid = false;
                item[3].current.style.border = "3px solid rgb(219, 146, 146)";
                return true;
            } else {
                item[3].current.style.border = "0px solid white";
                return false;
            }
        });

        return allValid;
    }

    return ( 
        <div className={styles.register_content}>
            <h2 className={styles.register_title}>Register</h2>
            <div className={styles.register_steps_wrapper}>
                {
                    Object
                        .values(registerStepsDetails)
                        .map((step, i) => {
                            return <RegisterStep 
                                key={i} 
                                stepNumber={[currentStep, setCurrentStep]} 
                                registerStepDetails={step}/>
                        })
                }
                <div className={styles.register_nav}>
                    { (currentStep > 1) && <div 
                            className={[styles.register_nav_button, styles.left_register_nav_button].join(' ')} 
                            onClick={() => {
                                setCurrentStep(currentStep - 1)
                            }}>Back
                        </div>
                    }
                    { (currentStep < 5) && <div 
                        className={[styles.register_nav_button, styles.right_register_nav_button].join(' ')} 
                        onClick={() => {
                            if(CheckCurrentFields())
                                setCurrentStep(currentStep + 1)
                        }}>Continue</div>
                    }

                    { (currentStep == 5) && <button className={[styles.register_button, styles.right_register_nav_button].join(' ')}>Create account</button>}
                </div>
            </div>
            <p className={styles.bottom_text}>Already have an account? <span onClick={() => setAuthType('login')}>Log in</span></p>
        </div> 
     );
}
 
export default Register;