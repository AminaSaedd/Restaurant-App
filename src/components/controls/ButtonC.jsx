import React from 'react'
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(1),
        '& .Button-label': {
            textTransform: 'none'
        }
    }
}))

export default function ButtonC(props) {

    const { children, color, variant, onClick, className, ...other } = props;
    const classes = useStyles();

    return (
        <Button
            className={classes.root + ' ' + (className || '')}
            variant={variant || "contained"}
            color={color || "default"}
            onClick={onClick}
            {...other}>
            {children}
        </Button>
    )
}