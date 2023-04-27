import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as NewsService from '../../services/news.service'
import NewById from '../../components/news/NewById'
import { CircularProgress } from '@mui/material'

export default function PageNewById() {
    const { id } = useParams()
    const [newById, setNew] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        NewsService.getNewById(id).then((res) => {
            setLoading(false)
            if (res.status === 200) {
                setNew(res.data)
            } else {
                setNew([])
            }
        })
    }, [id])

    return (
        <main className="container">
            {loading && (
                <div className="text-center my-5">
                    <CircularProgress />
                </div>
            )}
            {!loading && newById !== [] && (
                <NewById newById={newById} />
            )}
            {!loading && newById === [] && (
                <div className="not-exist">
                    <h2>No existe artículo con ese ID</h2>
                </div>
            )}
        </main>
    )
}