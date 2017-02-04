import React from 'react'
import { Link } from 'react-router'

const AdminPaths = ({children}) => {

  const logout = () => {
    localStorage.removeItem('grafftoken')
    window.location = '/'
  }

  return (
    <div>
      <div>
        <div>Admin pages:</div>
        <Link to={`/admin/listBeer`}>Beer list</Link>
        <Link to={`/admin/registerBeer`}>Beer registration</Link>
        <Link to={`/admin/categoryList`}>Category list</Link>
        <Link to={`/admin/categoryRegistration`}>Category registration</Link>
        <Link to={`/admin/userList`}>User list</Link>
        <Link to={`/admin/createUser`}>Create user</Link>
        <Link to={`/admin/changePassword`}>Change password</Link>
        <button onClick={logout}>Log Out</button>
      </div>
      <div>{children}</div>
    </div>
  )
}

export default AdminPaths
