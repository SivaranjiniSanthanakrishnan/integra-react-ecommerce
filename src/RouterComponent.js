import React from "react";
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LoginComponent from "./LoginComponent";
import ProductComponent from "./ProductComponent";

function RouterComponent(){
    return(
        <>
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={LoginComponent} />
                        <Route exact path="/product" component={ProductComponent} />
                    </Switch>
                </BrowserRouter>
            </div>
        </>
    )
}

export default RouterComponent;