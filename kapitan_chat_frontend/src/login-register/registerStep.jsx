import styles from './authentication.module.css';

const RegisterStep = ({registerStepDetails, stepNumber}) => {
    const [currentStep, setCurrentStep] = stepNumber
    
    const classname = `${styles.register_step} register-step-number-${currentStep + 1}`;

    return (
        <div className={classname}>
            {
                registerStepDetails.map((field, i) => {
                    return (
                        <input 
                            key={i}
                            ref={field[3]}
                            type={ field.includes("PASSWORD") ? "password" : "text" }
                            placeholder={field[2]}
                            value={field[0]}
                            onChange={(e) => field[1](e.target.value)}
                        />
                    )
                })
            }
            
        </div>
    )
}

export default RegisterStep;