import React from "react";
import StoreIcon from '@material-ui/icons/Store';
import {Typography, Card, CardContent} from "@material-ui/core";
import InfoIcon from '@material-ui/icons/Info';
import FolderIcon from "@material-ui/icons/Folder";
import BarChartIcon from '@material-ui/icons/BarChart';
import { Link } from "react-router-dom";
import style from "./Menu.module.css";
const Menu = () =>{
    return(
        <div className={style.menu}>
            <Link to="/inventory">
            <Card className={style.menuCard}>
            <CardContent className={style.cardContent}>
                <StoreIcon className={style.icon}/>
            <Typography className={style.title}>Inventory</Typography>
            </CardContent>
        </Card>
            </Link>
        <Link to="/requests">
        <Card className={style.menuCard}>
            <CardContent className={style.cardContent}>
                <InfoIcon className={style.icon}/>
            <Typography className={style.title}>Requests</Typography>
            </CardContent>
        </Card>
        </Link>
        <Link to="/transaction">
        <Card className={style.menuCard}>
            <CardContent className={style.cardContent}>
                <FolderIcon className={style.icon}/>
            <Typography className={style.title}>Transactions</Typography>
            </CardContent>
        </Card>
        </Link>
        <Link to="/reports">
        <Card className={style.menuCard}>
            <CardContent className={style.cardContent}>
                <BarChartIcon className={style.icon}/>
            <Typography className={style.title}>Reports</Typography>
            </CardContent>
        </Card>
        </Link>
        </div>
    )
}

export default Menu