import React, { ReactChild, ReactChildren, ReactNode } from "react";
import styles from "./Offer.module.css";
import { DeliveryField } from "./Delivery";
import { Selector } from "./Selector";
import { useState } from "react";

export default function Offer({ productid }: {productid: any}) {

    const [ buyProductParams, setProductParams ] = useState({ delivery: "post", size: "s", productid });

    const deliverySelected = (delivery: any) => {
        setProductParams({
            ...buyProductParams,
            delivery
        })
    };

    const selectSize = (size: any) => {
        setProductParams({
            ...buyProductParams,
            size
        })
    };


    const deliveryOptions = [
        {
            name: "Почта России",
            key: "post"
        },
        {
            name: "Курьером",
            key: "to-door",
        },

    ];

    const sizeOptions = [
        {
            name: "S",
            key: "s"
        },
        {
            name: "M",
            key: "m"
        }
    ];

    return (
        <div className={styles.Offer}>
            <OfferStep index={1}>
                <h4 className={styles.OfferTitle}>Выберите размер <Selector values={sizeOptions} callback={selectSize} /></h4>
            </OfferStep>
            <OfferStep index={2}>
                <h4 className={styles.OfferTitle}>Доставка <Selector values={deliveryOptions} callback={deliverySelected} /></h4>
                <DeliveryField />
            </OfferStep>
            <OfferStep index={3} showline={false} >
                <h4 className={styles.OfferTitle}>Оформление заказа</h4>
                <span className={styles.Total}>Итого: <span className={styles.PriceTotal}>2 999 ₽</span></span>
                <OrderCompleteButton params={buyProductParams} />
            </OfferStep>
        </div>
    )
}

function OfferStep({ children, index, showline }: { children?: any, index: number, showline?: boolean }) {
    return (
        <div className={styles.OfferStep}>
            <OfferNumber index={index} showline={showline} />
            <div className={styles.OfferStepContent}>
                {children}
            </div>
        </div>
    )
}

function OfferNumber({ index, showline }: { index: number, showline?: boolean }) {

    showline = (showline === undefined) || !!showline;

    return (
        <div className={styles.Index}>
           <span className={styles.IndexText}>{index}</span>
           { (showline) ? <StepLine /> : null }
        </div>
    )
}

function StepLine() {
    return (
        <div className={styles.StepLine} />
    )
}

function OrderCompleteButton({ params }: { params: any }) {

    const order = () => {
        console.log(params);
    };

    return (
        <button className={styles.OrderCompleteButton} onClick={order}>
            Оплатить
        </button>
    )
}