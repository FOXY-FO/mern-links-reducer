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
    <table>
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
            <td>{index + 1}</td>
            <td>{link.from}</td>
            <td>
              <a href={link.to} target="_blank" rel="noopener noreferrer">
                {link.to}
              </a>
            </td>
            <td>
              <Link to={`/detail/${link._id}`}>Open</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
