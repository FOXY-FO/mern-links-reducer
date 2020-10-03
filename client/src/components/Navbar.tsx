import React, { FC, useContext, useEffect, useRef } from "react"
// @ts-ignore
import M from "materialize-css/dist/js/materialize.min.js"
import { NavLink, useHistory } from "react-router-dom"
import { AuthContext } from "../context/auth.context"

type LinksProps = {
  onLogout: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
  onClick: () => void
}

const Links: FC<LinksProps> = ({ onLogout, onClick }) => {
  return (
    <>
      <li>
        <NavLink to="/create" onClick={onClick}>
          Create
        </NavLink>
      </li>
      <li>
        <NavLink to="/links" onClick={onClick}>
          Links
        </NavLink>
      </li>
      <li>
        <a
          href="/"
          onClick={(e) => {
            onLogout(e)
            onClick()
          }}
        >
          Log out
        </a>
      </li>
    </>
  )
}

export const Navbar: FC = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const sidenavRef = useRef(null)

  useEffect(() => {
    M.Sidenav.init(sidenavRef.current, {})
  }, [])

  const logoutHandler = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault()
    auth.logout()
    history.push("/")
  }

  const closeSidenav = () => {
    const instance = M.Sidenav.getInstance(sidenavRef.current)
    instance.close()
  }

  return (
    <>
      <nav>
        <div
          className="nav-wrapper blue darken-1"
          style={{ padding: "0 2rem" }}
        >
          <span className="brand-logo">Links Reducer</span>

          <span data-target="slide-out" className="sidenav-trigger sm:hide">
            <i className="material-icons">menu</i>
          </span>

          <ul id="nav-mobile" className="right hide-on-small-and-down">
            <Links onClick={closeSidenav} onLogout={logoutHandler} />
          </ul>
        </div>
      </nav>

      <ul id="slide-out" className="sidenav" ref={sidenavRef}>
        <Links onClick={closeSidenav} onLogout={logoutHandler} />
      </ul>
    </>
  )
}
