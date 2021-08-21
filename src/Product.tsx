import React from "react";
import { useParams, Redirect } from "react-router-dom";
import styles from "./Product.module.css";
import Offer from "./Offer";

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

function Product({ itemid}: ProductProps) {
    return (
        <div className={styles.Product}>
            <hgroup>
                <h5 className={styles.Seller}>Shop name</h5>
                <h1 className={styles.Name}>Product name</h1>
            </hgroup>
            <ImageBlock imageUrl="/img/dev-asset/mvp-1.jpg" />
            <Offer productid={itemid} />
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