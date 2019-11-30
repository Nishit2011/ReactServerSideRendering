import React from "react";

import HomePage from "../pages/HomePage";
import UsersListPage, { loadData } from "../pages/UsersListPage";

//For SSR, this is the preferred approach
//for routing instead of <Routes> component. This is because 'react-router config
//package deals with router in this format rather than conventional format of <Routes component
export default [
  {
    path: "/",
    component: HomePage,
    exact: true
  },
  {
    loadData: loadData,
    path: "/users",
    component: UsersListPage,
    exact: true
  }
];
