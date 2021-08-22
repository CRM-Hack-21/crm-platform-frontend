import React from "react";
import { useState } from "react";
import { useParams, Redirect } from "react-router-dom";
import styles from "./CrmProducts.module.css";
import { add_product } from "./Api";

export function CrmProductAdd() {


    const [ addParams  , setAddParams ] = useState({
        name: "",
        description: "",
        category_id: 0,
        main_photo: "",
        price: 0,
        old_price: 0,
        url: ""
    });


    const uploadImage = (e: any) => {
        if (e.target.files && e.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function(event: any) {
                var dataUri = event.target.result;
                setAddParams({
                    ...addParams,
                    main_photo: dataUri,
                })
           };
           reader.readAsDataURL(e.target.files[0]);
        }
    };

    const updateName = (e: any) => {
        setAddParams({
            ...addParams,
            name: e.target.value,
        })
    };

    const updateDescription = (e: any) => {
        setAddParams({
            ...addParams,
            description: e.target.value,
        })
    };

    const updatePrice = (e: any) => {
        setAddParams({
            ...addParams,
            price: e.target.value,
            old_price: e.target.value,
        })
    };
    
    // const updateSku = (e: any) => {
    //     setAddParams({
    //         ...addParams,
    //         sku: e.target.value,
    //     })
    // };

    const postNewItem = () => {

        add_product(addParams)

        //console.log(addParams);
    };

    const buttonDisabled = addParams.name === "" || addParams.main_photo === "";

    console.log(buttonDisabled);

    return (
        <div className={styles.NewProduct}>
            <h1>Добавить новый товар в каталог</h1>

            <FieldName>Название товара</FieldName>
            <TextField callback={updateName} />

            <FieldName>Цена в рублях</FieldName>
            <NumField callback={updatePrice} />

            {/* <FieldName>Категория</FieldName>
            <NumField callback={updatePrice} /> */}

            {/* <FieldName>SKU (опционально)</FieldName>
            <TextField callback={updateSku} placeholder="Например, PD-345:123456" /> */}

            <FieldName>Описание</FieldName>
            <TextArea callback={updateDescription} />

            <FieldName>Наличие</FieldName>
            <NumField placeholder="Колличество товара, доступного для покупки" />

            <FieldName>Фото</FieldName>
            <input type="file" onChange={uploadImage} />

            <button className={styles.AddProductButton} disabled={buttonDisabled} onClick={postNewItem}>Готово</button>
        </div>
    )
}

function FieldName({ children }: any) {
    return (
        <span className={styles.FieldName}>{children}</span>
    )
}

function TextField({ placeholder, callback }: any) {
    return (
        <input type="text" placeholder={placeholder} className={styles.TextField} onChange={callback} />
    )
}

function TextArea({ placeholder, callback }: any) {
    return (
        <textarea placeholder={placeholder} className={styles.TextArea} onChange={callback} />
    )
}

function NumField({ placeholder, callback }: any) {
    return (
        <input type="number" placeholder={placeholder} className={styles.NumberField} onChange={callback} />
    )
}
