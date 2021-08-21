import React, { ReactChild, ReactChildren, ReactNode, useState } from "react";
import styles from "./Selector.module.css";


export function Selector({ values, callback }: any) {

    const setValue = (e: any) => {
        callback(e.target.options[e.target.selectedIndex].value);
    }


    return (
        <select onChange={setValue} className={styles.Selector} >
            {values.map((value: any, i: number) => (
                <option value={value.key} key={i}>{value.name}</option>
            ))}
        </select>
    )
}