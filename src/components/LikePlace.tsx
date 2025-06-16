import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useEffect, useState} from "react";
import {type Place, PlaceData} from "./PlaceData.ts";

export default function LikePlace({id}: { id: string}) {
    const [places, setPlaces] = useState<Place[]>([]);
    const loadPlaces = async () => {
        try {
            const newPlaces = await PlaceData();
            setPlaces(() => {
                const place = newPlaces.filter(m => m.id === id);
                return [ ...place];

            });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(
        () => {
            loadPlaces().then();
        }, []
    )

    return (
        <span className="container">
            {places
                .map((place) => (
                <Card   key={place.id} sx={{maxWidth: 345}}>
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

                </Card>
            ))}
        </span>
    )
}