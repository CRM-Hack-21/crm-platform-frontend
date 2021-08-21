import React from "react";
import { ReactChild } from "react";
import styles from "./GeneralContainer.module.css";

interface ContainerProps {
    children: ReactChild
}

export function GeneralContainer({ children }: ContainerProps) {
    return (
        <div className={styles.Container} >
            {children}
        </div>
    )
}


export function CrmContainer({ children }: any) {
    return (
        <div className={styles.CrmContainer} >
            {children}
        </div>
    )
}