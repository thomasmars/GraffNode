import React from 'react'
import {Route, IndexRoute} from 'react-router'
import Layout from './components/Layout'
import IndexPage from './components/IndexPage'
import RegisterBeer from './components/admin/beers/RegisterBeer'
import ListBeer from './components/admin/beers/ListBeer'
import CategoryList from './components/admin/category/CategoryList'
import CategoryRegistration from './components/admin/category/CategoryRegistration'
import NotFoundPage from './components/NotFoundPage'
import AdminLayout from './components/admin/AdminLayout'
import UserList from './components/admin/user/UserList'
import CreateUser from './components/admin/user/CreateUser'
import ChangePassword from './components/admin/user/ChangePassword'
import LogIn from './components/admin/user/LogIn'

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={IndexPage}/>
    <Route path="/admin" component={AdminLayout}>
      <IndexRoute component={ListBeer}/>
      <Route path="listBeer" component={ListBeer}/>
      <Route path="categoryList" component={CategoryList}/>
      <Route path="categoryRegistration" component={CategoryRegistration}/>
      <Route path="categoryRegistration/:id" component={CategoryRegistration}/>
      <Route path="registerBeer" component={RegisterBeer}/>
      <Route path="registerBeer/:id" component={RegisterBeer}/>
      <Route path="userList" component={UserList}/>
      <Route path="createUser" component={CreateUser}/>
      <Route path="changePassword" component={ChangePassword}/>
      <Route path="*"/>
    </Route>
    <Route path="/login" component={LogIn}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);

export default routes;
