import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from './components/Layout';
import IndexPage from './components/IndexPage';
import RegisterBeer from './components/admin/RegisterBeer';
import ListBeer from './components/admin/ListBeer';
import CategoryList from './components/admin/lists/CategoryList'
import CategoryRegistration from './components/admin/registrations/CategoryRegistration'
import NotFoundPage from './components/NotFoundPage';
import AdminLayout from './components/admin/AdminLayout'

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={IndexPage}/>
    <Route path="/admin" component={AdminLayout}>
      <IndexRoute component={ListBeer} />
      <Route path="listBeer" component={ListBeer} />
      <Route path="categoryList" component={CategoryList} />
      <Route path="categoryRegistration" component={CategoryRegistration} />
      <Route path="categoryRegistration/:id" component={CategoryRegistration} />
      <Route path="registerBeer" component={RegisterBeer} />
      <Route path="registerBeer/:id" component={RegisterBeer} />
    </Route>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);

export default routes;
