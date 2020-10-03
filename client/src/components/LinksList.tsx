import React, { FC } from "react"
import { Link } from "react-router-dom"
import { TLink } from "../types/types"

type Props = {
  links: TLink[]
}

export const LinksList: FC<Props> = ({ links }) => {
  if (!links.length) {
    return <p className="center">There are no links yet</p>
  }

  return (
    <div
      className="custom-scrollbar"
      style={{ maxWidth: "100%", width: "100%", overflowX: "auto" }}
    >
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>№</th>
            <th>Original</th>
            <th>Reduced</th>
            <th>Open</th>
          </tr>
        </thead>

        <tbody>
          {links.map((link, index) => (
            <tr key={link._id}>
              <td style={{ width: "5%" }}>{index + 1}</td>
              <td style={{ width: "40%" }}>{link.from}</td>
              <td style={{ width: "40%" }}>{link.to}</td>
              <td style={{ width: "15%" }}>
                <Link to={`/detail/${link._id}`}>Open</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
