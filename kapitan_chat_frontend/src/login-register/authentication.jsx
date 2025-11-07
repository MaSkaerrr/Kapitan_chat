import React, { useEffect, useState } from 'react';

import LOGO from '../assets/logo.png';
import styles from './authentication.module.css';
import Login from './login';
import Register from './register';

const Authentication = () => {
    const [mousePos, setMousePos] = useState({x: 0, y: 0});

    // Поля для форми Логіну
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const loginFormDetails = {
        loginUsername,
        setLoginUsername,
        loginPassword,
        setLoginPassword
    };

    // Поля для форми Реєстрації
    const [registerUsername, setRegisterUsername] = useState('');
    const [email, setEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const registerFormDetails = {
        registerUsername,
        setRegisterUsername,
        email,
        setEmail,
        registerPassword,
        setRegisterPassword,
        registerConfirmPassword,
        setRegisterConfirmPassword,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        phoneNumber,
        setPhoneNumber
    };


    const [authType, setAuthType] = useState('login');

    const authenticationRef = React.createRef();

    const leftPupilRef = React.createRef();
    const rightPupilRef = React.createRef();

    const rightGlareRef = React.createRef();
    const leftGlareRef = React.createRef();

    const rightEyeLidRef = React.useRef();
    const leftEyeLidRef = React.useRef();

    const logoRef = React.useRef();

    const chatBubbleRef = React.useRef();

    let bubble_chat_animation = false;

    const handleMouseMove = (posX, posY) => {
        const rect = authenticationRef.current.getBoundingClientRect();
        const x = posX - rect.left;
        const y = posY - rect.top;
        setMousePos({x, y});

        // Рух очей штурвалу
        const pupils = [leftPupilRef.current, rightPupilRef.current];
        const glares = [leftGlareRef.current, rightGlareRef.current];

        if (pupils) {
            const screenX = x / rect.width * 100;
            const screenY = y / rect.height * 100;

            pupils.forEach(pupil => {
                pupil.style.left = `${2.5 + (15 / 100 * screenX)}px`;
                pupil.style.top = `${2.5 + (15 / 100 * screenY)}px`;
            });

            glares.forEach(glare => {
                glare.style.left = `${1.5 + (10 / 100 * screenX)}px`;
                glare.style.top = `${1.5 + (10 / 100 * screenY)}px`;
            });
            
        }
    }

    function angry_animation(){
        const newRightEye = [styles.eyelid, styles.angry_right_eye].join(' ');
        const newLeftEye = [styles.eyelid, styles.angry_left_eye].join(' ');

        let animationClear = () => {
            if(!leftEyeLidRef.current || !rightEyeLidRef.current || !logoRef.current){
                console.log("Some or all refs are null!");  
            }else{
                console.log(rightEyeLidRef, leftEyeLidRef, logoRef)
                rightEyeLidRef.current.className = styles.eyelid;
                leftEyeLidRef.current.className = styles.eyelid;
                logoRef.current.className = styles.logo;

                console.log("Angry animation end!", rightEyeLidRef, leftEyeLidRef);
            }
                 
        };

        if(
            rightEyeLidRef.current.className != newRightEye
            &&
            leftEyeLidRef.current.className != newLeftEye
        ){
            rightEyeLidRef.current.className = newRightEye;
            leftEyeLidRef.current.className = newLeftEye;

            logoRef.current.className = [styles.logo, styles.angry_logo].join(' ');

            console.log("Angry animation activation!");

            setTimeout(animationClear, 3000);
            
        }else
            console.log("Animation already in use!")
        
    }

    function happy_animation(){
        const newRightEye = [styles.eyelid, styles.happy_right_eye].join(' ');
        const newLeftEye = [styles.eyelid, styles.happy_left_eye].join(' ');

        let animationClear = () => {
            if(!leftEyeLidRef.current || !rightEyeLidRef.current){
                console.log("Some or all refs are null!");  
            }else{
                rightEyeLidRef.current.className = styles.eyelid;
                leftEyeLidRef.current.className = styles.eyelid;

                console.log("Happy animation end!", rightEyeLidRef, leftEyeLidRef);
            }
                 
        };

        if(
            rightEyeLidRef.current.className != newRightEye
            &&
            leftEyeLidRef.current.className != newLeftEye
        ){
            rightEyeLidRef.current.className = newRightEye;
            leftEyeLidRef.current.className = newLeftEye;

            console.log("Happy animation activation!");

            setTimeout(animationClear, 3000);
            
        }else
            console.log("Animation already in use!")
        
    }

    function handleSubmit(e){
        e.preventDefault();

        const registerDetails = {
            "username": registerUsername,
            "first_name": firstName,
            "last_name": lastName,
            "email": email,
            "password": registerPassword,
            "phone_number": phoneNumber
        };

        const loginDetails = {
            "username": loginUsername,
            "password": loginPassword
        };

        if(authType === 'register'){
            axios.post('http://127.0.0.1:8000/api/users/register/', registerDetails)
            .then(response => {
                console.log("Реєстрація успішна!");
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        }

        axios.post('http://127.0.0.1:8000/api/users/token/', (
            // Надсилаються деталі залежно від типу форми
            authType === 'login' ? loginDetails : {"username" : registerUsername, "password" : registerPassword}
        ))
        .then(response => {
            console.log("Вхід успішний!", response.data);
            localStorage.setItem("access-token", response.data.access);
            localStorage.setItem("refresh-token", response.data.refresh);
            bubble_text_animate("Welcome!");
            happy_animation();
        })
        .catch(error => {
            console.error('There was an error!', error);
            bubble_text_animate("Wrong username or password! Are you a hacker??");
            angry_animation();
        });
    }

    function LoginOrRegister(authType){
        if(authType){
            if(authType === 'login')
               return <Login 
                    auth = {[authType, setAuthType]}
                    formDetails={loginFormDetails}
                />
            
            if(authType === 'register')
                return <Register 
                    auth = {[authType, setAuthType]}
                    formDetails={registerFormDetails}
                />
        }else
            return <p>authType null or wrong format</p>
    }

    function bubble_text_animate(text){
        if(chatBubbleRef.current && text && !bubble_chat_animation){
            bubble_chat_animation = true;
            let currentText = "Kapitan$\n\n";
            let index = 0;

            let animation = setInterval(() => {
                currentText = currentText.slice(0, -1);
                currentText += text[index++] + '_';
                
                console.log("Writing text:", currentText);
                
                chatBubbleRef.current.innerText = currentText;
            
                if(index == text.length){
                    clearInterval(animation);
                    currentText = currentText.slice(0, -1);
                    chatBubbleRef.current.innerText = currentText;
                    bubble_chat_animation = false;
                }
            }, 40)

        }else
            console.log("ChatBubble or text is null, or another animation is in progress")
    }

    useEffect(() => {
        setTimeout(() => {
            bubble_text_animate("Welcome to Kapitan Chat! Login or register")
        }, 500)
    }, []);


    
    return (
        // Головний контейнер для логіна та реєстрації 
        <div 
            className={styles.authentication_container}
            onMouseMove={(e) => handleMouseMove(e.clientX, e.clientY)}
            ref={authenticationRef}
        >
            
            {/* Універсальна форма, шлях для запиту передається через пропси */}
            <form 
                className={styles.authentication_form}
                onSubmit={handleSubmit}
            >

                {/* Хмарина з повідомленнями штурвалу */}
                <div className={styles.chat_bubble} ref={chatBubbleRef}></div>


                {/* Накурений штурвал */}
                <img src={LOGO} alt="logo" className={styles.logo} ref={logoRef}/>

                {/* Очі штурвалу, які рухаються */}
                <div className={styles.eyes_container}>
                    <div className={[styles.eye, styles.left_eye].join(' ')}>
                        <div className={styles.eyelid} ref={leftEyeLidRef}></div>
                        <div 
                            className={styles.pupil} 
                            ref={leftPupilRef}
                        >
                            <div className={styles.glare} ref={leftGlareRef}></div>
                        </div>

                    </div>
                    <div className={[styles.eye, styles.right_eye].join(' ')}>
                        <div className={styles.eyelid} ref={rightEyeLidRef}></div>
                        <div 
                            className={styles.pupil} 
                            ref={rightPupilRef}
                        >
                            <div className={styles.glare} ref={rightGlareRef}></div>
                        </div>
                    </div>
                </div>

                {/* Контент форми (Логін або Реєстрація) */}
                {LoginOrRegister(authType)}

            </form>
        </div>
     );
}
 


export default Authentication;