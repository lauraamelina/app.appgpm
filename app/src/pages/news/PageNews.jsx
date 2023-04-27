import React, { useEffect, useState } from "react";
import * as NewsService from '../../services/news.service'
import { CircularProgress } from "@mui/material";
import AllNews from "../../components/news/AllNews";

export default function PageNews() {
    const [news, setNews] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=> {
        setLoading(true)
        NewsService.getAllNews().then((res) => {
            setNews(res.data)
            setLoading(false)
        })
    }, [])


    return (
        <main className="container">
            <h1>Últimas noticias</h1>

            {loading && (
                <div className="text-center my-5">
                    <CircularProgress />
                </div>
            )}
            {!loading && news.length > 0 && (
                <AllNews news={news} />
            )}

            {!loading && news.length === 0 && (
                <div className="not-exist">
                    <h2>No hay noticias</h2>
                </div>
            )}

        </main>
    );
}