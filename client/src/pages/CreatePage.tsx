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

  const sendLink = async () => {
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

  const pressHandler = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      await sendLink()
    }
  }

  const submitHandler = async () => {
    await sendLink()
  }

  return (
    <div className="row">
      <div
        className="col s12 m10 l8 offset-back-l2 offset-back-m1"
        style={{
          paddingTop: "2rem",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div className="input-field" style={{ flex: "1 1 auto" }}>
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
        <button
          className="btn waves-effect waves-light blue darken-1"
          type="submit"
          name="action"
          style={{ height: "calc(100% - 28px)", marginLeft: 4 }}
          onClick={submitHandler}
        >
          <i className="material-icons">send</i>
        </button>
      </div>
    </div>
  )
}

export default CreatePage
