import React, { FC } from "react"
import { TLink } from "../types/types"

type Props = {
  link: TLink
}

export const LinkCard: FC<Props> = ({ link }) => {
  return (
    <>
      <h2>Link</h2>

      <p>
        Your link:{" "}
        <a href={link.to} target="_blank" rel="noopener noreferrer">
          {link.to}
        </a>
      </p>

      <p>
        From:{" "}
        <a href={link.from} target="_blank" rel="noopener noreferrer">
          {link.from}
        </a>
      </p>

      <p>
        Clicks: <strong>{link.clicks}</strong>
      </p>

      <p>
        Date: <strong>{new Date(link.date).toLocaleDateString()}</strong>
      </p>
    </>
  )
}
