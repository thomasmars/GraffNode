// src/routes.js
import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from './components/Layout';
import IndexPage from './components/IndexPage';
import HorsePage from './components/HorsePage';
import StableHorses from './components/StableHorses';
import NotFoundPage from './components/NotFoundPage';

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={IndexPage}/>
    <Route path="/horse" component={HorsePage} />
    <Route path="/stableHorses" component={StableHorses} />
    <Route path="*" component={NotFoundPage}/>
  </Route>
);

export default routes;
