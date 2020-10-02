import React, { FC, useCallback, useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { LinkCard } from "../components/LinkCard"
import { Loader } from "../components/Loader"
import { AuthContext } from "../context/auth.context"
import { useHttp } from "../hooks/http.hook"
import { TLink } from "../types/types"

type Params = {
  id: string
}

const DetailPage: FC = () => {
  const { token } = useContext(AuthContext)
  const { request, loading } = useHttp()
  const [link, setLink] = useState<TLink | null>(null)
  const linkId = useParams<Params>().id

  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`/api/link/${linkId}`, "GET", null, {
        Authorization: `Bearer ${token}`,
      })

      setLink(fetched)
    } catch (e) {}
  }, [token, linkId, request])

  useEffect(() => {
    getLink()
  }, [getLink])

  if (loading) {
    return <Loader />
  }

  return <>{!loading && link && <LinkCard link={link} />}</>
}

export default DetailPage
