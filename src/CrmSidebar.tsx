import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import styles from "./CrmSidebar.module.css";


export default function Sidebar() {
    return (
        <div className={styles.Sidebar}>
            <span className={styles.Title}>DAG CRM</span>
            <NavLink className={styles.SidebarLink} to="/crm/products" >Каталог товаров</NavLink>
        </div>
    )
}