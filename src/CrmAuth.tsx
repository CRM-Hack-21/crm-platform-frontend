import React from "react";
import { useState } from "react";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import styles from "./CrmAuth.module.css";
import { login, register, add_vk, add_product, products_list, comp_info } from "./Api";
import { useQuery } from 'react-query';

export function LoginPage() {

    const [ credits, setCredits ] = useState({ mail: "", password: ""});

    const history = useHistory();


    const updatePass = (password: string) => {
        setCredits(
            {
                ...credits,
                password
            }
        )
    };

    const updateEmail = (mail: string) => {
        setCredits(
            {
                ...credits,
                mail
            }
        )
    };

    const tryLogin = () => {
        login(credits).then(correct => {
            history.push("/crm/products/");
        });
    };

    let disabled = credits.mail === "" || credits.password === "";

    return (
        <Container>
            <h1>Войти</h1>
            <EmailField callback={updateEmail} />
            <PasswordField callback={updatePass} />
            <Link to="/crm/register/" className={styles.NoAccount}>
                Ещё нет аккаунта?
            </Link>
            {
                (disabled) ? null : <button className={styles.ActionButton} onClick={tryLogin}>Войти</button>
            }
        </Container>
    )
}

export function RegisterPage() {

    const [ credits, setCredits ] = useState({ mail: "", password: "", name: ""});

    const history = useHistory();

    const updatePass = (password: string) => {
        setCredits(
            {
                ...credits,
                password
            }
        )
    };

    const updateEmail = (mail: string) => {
        setCredits(
            {
                ...credits,
                mail
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

    const tryRegister = () => {
        register(credits).then((correct: any) => {
            history.push("/crm/add-social/");
        });
    };

    let disabled = credits.mail === "" || credits.password === "" || credits.name === "";

    return (
        <Container>
            <h1>Зарегестрироваться</h1>
            <CompanyNameField  callback={updateName}/>
            <EmailField callback={updateEmail} />
            <PasswordField callback={updatePass} />
            <Link to="/crm/login/" className={styles.NoAccount}>
                Уже есть аккаунт? Войти
            </Link>
            {
                (disabled) ? null : <button className={styles.ActionButton} onClick={tryRegister}>Зарегестрироваться</button>
            }
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
    const history = useHistory();

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

    add_vk({ "vk_token": access_token }).then(
        _ => history.push("/crm/products/")
    )

    return (
        <Container>
            Загрузка...
        </Container>
    )
}

export function CrmProducts() {

    const { data: info, isLoading: infoLoading } = useQuery('comp-info', () => comp_info());

    if (infoLoading) {
        return (<span>Loading..</span>)
    }

    if ("error" in info) {
        return <Redirect to="/crm/login" />
    }

    return (
        <div className={styles.ProductsPage}>
            <h1>{info.name}</h1>
            <span className={styles.ProducsTitle}>Товары на площадке</span>
            <ProductListing comp_id={info._id} />
        </div>
    )
}

function ProductListing({ comp_id }: any) {
    const { data, isLoading } = useQuery('products-crm', () => products_list(comp_id));

    if (isLoading && !data) {
        return (<span>Loading..</span>)
    }
    return (
        <div className={styles.ProductListing}>
            {data.map((v: any, i: number) => <ProductCardItem key={i} info={v} />)}
        </div>
    )
}

function ProductCardItem({ info }: any) {
    return (
        <a className={styles.ProductItem} href={info.url} target="_blank" rel="noreferrer" >
            <h3>{info.name}</h3>
            <img src={info.main_photo_id} />
            <span>{info.price} руб</span>
        </a>
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