import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {type Place, PlaceData} from "./PlaceData.ts";
import {useEffect, useState} from "react";
import LikePlace from "./LikePlace.tsx";


export default function Places() {
    const [likedIds, setLikedIds] = useState<string[]>([]);
    const [places, setPlaces] = useState<Place[]>([]);
    const loadPlaces = async () => {
        try {
            const newPlaces = await PlaceData();
            setPlaces(prev => {
                const ids = new Set(prev.map(m => m.id));
                const uniquePlace = newPlaces.filter(m => !ids.has(m.id));
                return [...prev, ...uniquePlace];

            });
            console.log(setPlaces)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(
        () => {
            loadPlaces().then();
        }, []
    )
    const handleExpandClick = (id: string) => {
        setLikedIds(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    }

    return (
        <>
            <div>
                <h1 className="title">찜한 맛집</h1>
            </div>
            <div className="container">

            {likedIds.map(id => <LikePlace  key={id} id={id}/>)}
            </div>

            <div>
                <h1 className="title">맛집 목록</h1>
            </div>
            <div className="container">
                {places.map((place) => (
                    <Card key={place.id} sx={{maxWidth: 345}}>
                        <CardHeader
                            avatar={
                                <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
                                    R
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon/>
                                </IconButton>
                            }
                            title={place.title}
                        />
                        <CardMedia
                            component="img"
                            height="194"
                            image={`http://localhost:3000/${place.image.src}`}
                            alt={place.image.alt}
                        />
                        <CardContent>
                            <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                {place.description}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon onClick={() => handleExpandClick(place.id)}
                                              sx={{ color: likedIds.includes(place.id) ? 'red' : 'gray' }}
                                />
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon/>
                            </IconButton>

                        </CardActions>

                    </Card>
                ))}

            </div>
        </>
    );
}
