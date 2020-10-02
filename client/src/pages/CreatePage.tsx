import React, {
  FC,
  useState,
  KeyboardEvent,
  useEffect,
  useContext,
} from "react"
import { useHistory } from "react-router-dom"
import { AuthContext } from "../context/auth.context"
import { useHttp } from "../hooks/http.hook"

const CreatePage: FC = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const { request } = useHttp()
  const [link, setLink] = useState("")

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const pressHandler = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      try {
        const data = await request(
          "/api/link/generate",
          "POST",
          { from: link },
          {
            Authorization: `Bearer ${auth.token}`,
          }
        )
        history.push(`/detail/${data.link._id}`)
      } catch (e) {}
    }
  }

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: "2rem" }}>
        <div className="input-field">
          <input
            placeholder="Insert link"
            id="link"
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">First Name</label>
        </div>
      </div>
    </div>
  )
}

export default CreatePage
