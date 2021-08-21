import React from "react";
import { useState } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import styles from "./CrmAuth.module.css";
import { login } from "./Api";
import { callbackify } from "util";

export function LoginPage() {

    const [ credits, setCredits ] = useState({ email: "", password: ""});

    const updatePass = (password: string) => {
        setCredits(
            {
                ...credits,
                password
            }
        )
    };

    const updateEmail = (email: string) => {
        setCredits(
            {
                ...credits,
                email
            }
        )
    };

    const tryLogin = (email: string) => {
        login(credits).then(correct => {
            console.log(correct);
        });
    };

    let disabled = credits.email === "" || credits.password === "";

    return (
        <Container>
            <h1>Войти</h1>
            <EmailField callback={updateEmail} />
            <PasswordField callback={updatePass} />
            <Link to="/crm/register/" className={styles.NoAccount}>
                Ещё нет аккаунта?
            </Link>
            {
                (disabled) ? null : <button className={styles.ActionButton}>Войти</button>
            }
        </Container>
    )
}

export function RegisterPage() {

    const [ credits, setCredits ] = useState({ email: "", password: "", name: ""});

    const updatePass = (password: string) => {
        setCredits(
            {
                ...credits,
                password
            }
        )
    };

    const updateEmail = (email: string) => {
        setCredits(
            {
                ...credits,
                email
            }
        )
    };

    const updateName = (name: string) => {
        setCredits(
            {
                ...credits,
                name
            }
        )
    };

    const tryRegister = (email: string) => {
        login(credits).then(correct => {
            console.log(correct);
        });
    };

    let disabled = credits.email === "" || credits.password === "" || credits.name === "";

    return (
        <Container>
            <h1>Зарегестрироваться</h1>
            <CompanyNameField  callback={updateName}/>
            <EmailField callback={updateEmail} />
            <PasswordField callback={updatePass} />
            <Link to="/crm/login/" className={styles.NoAccount}>
                Уже есть аккаунт? Войти
            </Link>
        </Container>
    )
}

export function AddSocialPage() {
    return (
        <Container>
            <h1>Для начала работы, привяжите аккаунт в соц. сети</h1>
            <AddVk />
        </Container>
    )
}

export function CallbackVkAuth() {

    const location = useLocation();

    let access_token = null;

    for (let pair of location.hash.replace("#", "").split("&")) {
        let kv = pair.split("=");
        if (kv[0] === "access_token") {
            access_token = kv[1];
        }
    }

    if (access_token === null) {
        return <Redirect to="/crm/login/"/>
    }
    
    console.log(access_token);

    return (
        <Container>
            
        </Container>
    )
}



function Container({ children }: any) {
    return (
        <div className={styles.Container}>{children}</div>
    )
}

function EmailField({ callback }: any) {
    const onChange = (e: any) => {
        callback(e.target.value);
    };

    return (
        <input type="text" className={styles.Email} placeholder="Почта" onChange={onChange} />
    )
}

function PasswordField({ callback }: any) {
    const onChange = (e: any) => {
        callback(e.target.value);
    };

    return (
        <input type="password" className={styles.Password} placeholder="Пароль" onChange={onChange} />
    )
}

function CompanyNameField({ callback }: any) {
    const onChange = (e: any) => {
        callback(e.target.value);
    };

    return (
        <input type="text" className={styles.CompanyName} placeholder="Название компании / Бренда" onChange={onChange} />
    )
}

function AddVk({ children }: any) {
    return (
        <a href="https://oauth.vk.com/authorize?client_id=7931898&display=page&scope=photos%2Cmarket&redirect_uri=https://crm-platform-frontend.pages.dev/blank.html&response_type=token&v=5.52" className={styles.AddVk}>Привязать Вконтакте</a>
    )
}