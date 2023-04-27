import React, { useEffect, useState } from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import ImgGenerica from '../../assets/img/img_generica.png'
import FavoriteIcon from '@mui/icons-material/Favorite';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';


export default function CardNewById({ item }) {
    const [likes, setLikes] = useState(0)
    function formattedDate(date) {
        const newDate = new Date(date)
        const day = newDate.getDate()
        const month = newDate.getMonth() + 1
        const year = newDate.getFullYear()
        return `${day}/${month}/${year}`
    }

    function getImage(image) {
        if (image) {
            return `https://api.appgpm.com/files/img/${image}`
        } else {
            return ImgGenerica
        }
    }

    useEffect(() => {
        if (item?.interactions) {
            setLikes(item?.interactions?.length)
        }
    }, [item])


    return (
        <Card className="card" key={item?.id} variant="outlined" sx={{ width: 320 }}>
            <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
                {item?.author?.name}
            </Typography>
            <Typography level="body2">Publicado el: {formattedDate(item?.created_at)}</Typography>

            <AspectRatio minHeight="120px" maxHeight="200px" sx={{ my: 2 }}>
                <img
                    src={getImage(item?.archivo)} srcSet={getImage(item?.archivo)} loading="lazy" alt={item?.title} />
            </AspectRatio>
            <Box sx={{ display: 'flex' }}>
                <div>
                    <Typography className="icons" level="body3">
                        <span><FavoriteIcon sx={{ mr: 0.5 }} /> {likes}</span>  
                    </Typography>
                    <Typography fontSize="lg" fontWeight="lg">
                        {item?.nombre_producto?.nombre}
                    </Typography>
                </div>
                <Button variant="solid" size="sm" color="primary" sx={{ ml: 'auto', fontWeight: 600 }} onClick={() => { window.location.href = `/dashboard/news/${item?.id}` }}> Leer más </Button>
            </Box>
        </Card >
    );
}