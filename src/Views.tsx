import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import ProductPage from "./Product";
import { CrmContainer, GeneralContainer } from "./GeneralContainer";
import { OnMapDelivery } from "./Delivery";
import { CrmProductAdd } from "./CrmProducts";
import Sidebar from "./CrmSidebar";

export default function Views() {
    return (
        <>
            <BrowserRouter>
                <Switch>

                    <Route exact path="/b2c/product/:itemid/">
                        <GeneralContainer>
                            <ProductPage />
                        </GeneralContainer>
                    </Route>
                    <Route exact path="/b2c/product/:itemid/map-delivery/" component={OnMapDelivery} />


                    <Route path="/crm/">
                        <CrmContainer>
                            <Sidebar />
                            <Switch>
                                <Route exact path="/crm/products/add/" component={CrmProductAdd} />
                            </Switch>
                        </CrmContainer>
                    </Route>

                    <Route>404</Route>
                </Switch>
            </BrowserRouter>


        </>
    )
}