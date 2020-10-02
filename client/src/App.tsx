import React, { FC } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import "materialize-css"
import { useRoutes } from "./routes"
import { useAuth } from "./hooks/auth.hook"
import { AuthContext } from "./context/auth.context"
import { Navbar } from "./components/Navbar"
import { Loader } from "./components/Loader"

const App: FC = () => {
  const { token, login, logout, userId, ready } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  if (!ready) {
    return <Loader />
  }

  return (
    <AuthContext.Provider
      value={{ token, logout, login, userId, isAuthenticated }}
    >
      <Router>
        {isAuthenticated && <Navbar />}
        <div className="container">{routes}</div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
