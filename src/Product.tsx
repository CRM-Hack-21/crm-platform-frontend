import React from "react";
import { useParams, Redirect } from "react-router-dom";
import styles from "./Product.module.css";
import Offer from "./Offer";

import { get_good } from "./Api";
import { useQuery } from 'react-query';

interface ProductProps {
    itemid?: string
}

export default function ProductPage() {

    let params: ProductProps = useParams();

    if (!params.itemid) {
        return <Redirect to="/" />
    }

    return Product(params)
}

function Product({ itemid }: any) {

    const { data, isLoading } = useQuery(['good', itemid], () => get_good({ 'id': itemid }));

    if (isLoading) {
        return (
            <span>"Loading"</span>
        )
    }

    return (
        <div className={styles.Product}>
            <hgroup>
                <h5 className={styles.Seller}>{data.seller_name}</h5>
                <h1 className={styles.Name}>{data.name}</h1>
            </hgroup>
            <ImageBlock imageUrl={data.main_photo_id} />
            <Offer productid={itemid} price={data.price} />
        </div>
    )
}

interface ImageBlockProps {
    imageUrl: string
}

function ImageBlock({ imageUrl }: ImageBlockProps) {
    return (
        <img className={styles.Image} src={imageUrl} alt="" />
    )
}