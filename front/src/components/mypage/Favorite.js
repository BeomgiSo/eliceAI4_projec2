import { MyBox, Title, Content, Total } from "./FavoriteStyle.js";
import { useState, useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteCard from "./FavoriteCard";
import * as Api from "../../api";

function Favorite() {
    const [wishes, setWishes] = useState(undefined);
    const [count, setCount] = useState(0);
    const favoriteList = () => {
        Api.get("favorite/user").then((res) => {
            const favoritedata = res.data;
            setWishes(favoritedata[0].boardgame);
            setCount(wishes?.length);
        });
    };

    useEffect(() => {
        favoriteList();
    }, []);

    return (
        <>
            <MyBox>
                <Title>
                    <FavoriteIcon /> 찜 목록
                </Title>
                <Total>{count} / Total </Total>
                <div>
                    {wishes?.map((wish) => (
                        <FavoriteCard key={wish} wish={wish} />
                    ))}
                </div>
                <div>hi</div>
            </MyBox>
        </>
    );
}

export default Favorite;
