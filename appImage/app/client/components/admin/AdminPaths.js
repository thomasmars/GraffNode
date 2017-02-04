import React from 'react'
import { Link } from 'react-router'
import './styles/AdminPaths.css'

const AdminPaths = ({children}) => {

  const logout = () => {
    localStorage.removeItem('grafftoken')
    window.location = '/'
  }

  return (
    <div>
      <div className="admin-paths">
        <div className="admin-paths-header">Admin pages:</div>
        <Link to={`/admin/listBeer`}>Beer list</Link>
        <Link to={`/admin/registerBeer`}>Beer registration</Link>
        <Link to={`/admin/categoryList`}>Category list</Link>
        <Link to={`/admin/categoryRegistration`}>Category registration</Link>
        <Link to={`/admin/userList`}>User list</Link>
        <Link to={`/admin/createUser`}>Create user</Link>
        <Link to={`/admin/changePassword`}>Change password</Link>
        <button onClick={logout}>Log Out</button>
      </div>
      <div className="admin-content">{children}</div>
    </div>
  )
}

export default AdminPaths
