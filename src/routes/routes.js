//Pages

import LayoutBasic from "../layout/LayoutBasic";
import Home from "../pages/Home";
import User from "../pages/User";
import Error404 from './../pages/Error404/Error404';
const routes = [
    {
        path: "/",
        layout: LayoutBasic,
        exact: true,
        component: Home
    },
    {
        path: "/:username",
        layout: LayoutBasic,
        exact: true,
        component: User
    }, {
        component: Error404,
        layout: LayoutBasic
    }

]

export default routes;