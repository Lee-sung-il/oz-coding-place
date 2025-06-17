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
import sortPlacesByDistance from "./loc.ts";
import Menu from './Menu.tsx';


export default function Places() {

    const [likedIds, setLikedIds] = useState<string[]>([]);
    const [places, setPlaces] = useState<Place[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
    const [sortedPlaces, setSortedPlaces] = useState<Place[]>([]);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

    const loadPlaces = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const newPlaces = await PlaceData();
            setPlaces(prev => {
                const ids = new Set(prev.map(m => m.id));
                const uniquePlace = newPlaces.filter(m => !ids.has(m.id));
                return [...prev, ...uniquePlace];

            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadPlaces();
    }, [])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLocation({
                lat: position.coords.latitude,
                lon: position.coords.longitude,
            })
        });
    }, []);


    function IsFalseLocation() {
        return (
            <div>위치 정보를 가져 오지 못했습니다 </div>
        )
    }


    useEffect(() => {
        if (location && places.length > 0) {
            const sorted = sortPlacesByDistance(places, location.lat, location.lon);
            setSortedPlaces(sorted);
        }
    }, [location, places]);

    if (!location) return <IsFalseLocation/>


    const handleExpandClick = (id: string) => {
        setLikedIds(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    }

    const handleDelete = (id: string) => {
        console.log('삭제 요청됨:', id); // 👈 이게 찍히
        const updated = places.filter(p => p.id !== id);
        setPlaces(updated);
        setSortedPlaces(sortPlacesByDistance(updated, location!.lat, location!.lon));
        setLikedIds(prev =>
            prev.filter(item => item !== id)

        );
        setOpenMenuId(null);
    }


    if (loading && places.length === 0) {
        return (
            <div>
                맛집 목록 불러오는 중입니다.
            </div>
        )
    }

    return (
        <>
            <div>
                <h1 className="title">찜한 맛집</h1>
            </div>
            <div className="container">

                {likedIds.map(id => <LikePlace key={id} id={id}/>)}
            </div>

            <div>
                <h1 className="title">맛집 목록</h1>
            </div>
            <div className="container">
                {sortedPlaces.map((place) => (
                    <Card key={place.id} sx={{maxWidth: 345}}>
                        <CardHeader
                            avatar={
                                <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
                                    R
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings"
                                            onClick={() => setOpenMenuId(prev => prev === place.id ? null : place.id)}>
                                    <MoreVertIcon/>
                                </IconButton>
                            }

                            title={place.title}
                        />
                        {openMenuId === place.id && (
                            <Menu onDelete={() => handleDelete(place.id)}/>
                        )
                        }
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
                                              sx={{color: likedIds.includes(place.id) ? 'red' : 'gray'}}
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