import React from "react";
import {Typography, Card, CardContent} from "@material-ui/core";
import style from "./MenuCard.module.css";

const MenuCard = ({icon}) =>{
    return(
        <Card className={style.menuCard}>
            <CardContent>
                <icon/>
            <Typography>Inventory</Typography>
            </CardContent>
        </Card>
    )
}

export default MenuCard