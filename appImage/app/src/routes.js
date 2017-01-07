// src/routes.js
import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from './components/Layout';
import IndexPage from './components/IndexPage';
import RegisterBeer from './components/admin/RegisterBeer';
import ListBeer from './components/admin/ListBeer';
import NotFoundPage from './components/NotFoundPage';

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={IndexPage}/>
    <Route path="/admin/registerBeer" component={RegisterBeer}>
      <Route path="/admin/registerBeer/:id" component={RegisterBeer} />
    </Route>
    <Route path="/admin/listBeer" component={ListBeer} />
    <Route path="*" component={NotFoundPage}/>
  </Route>
);

export default routes;
