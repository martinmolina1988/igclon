import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from "./routes";
import { map } from "lodash";


export default function Navigation(props) {
    const { setUpdateReload, updateReload } = props;
    return (
        <Router>
            <Switch>
                {map(routes, (route, index) => (
                    <Route

                        key={index}
                        path={route.path}
                        exact={route.exact}
                        render={(props) => (
                            <route.layout setUpdateReload={setUpdateReload}>

                                <route.component {...props} updateReload={updateReload} />
                            </route.layout>
                        )}
                    />
                ))}
            </Switch>
        </Router>
    )
}

