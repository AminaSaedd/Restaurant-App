import React from 'react'
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@material-ui/core';

export default function SelectC(props) {

    const { name, label, value, varient, onChange, options, error = null } = props;

    return (
        <FormControl
            variant={varient || "outlined"}
            {...(error && { error: true })}>
            <InputLabel>{label}</InputLabel>
            <Select
                label={label}
                name={name}
                value={value}
                onChange={onChange}>
                {options.map(
                item => (<MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>)
                    )
                }
            </Select>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}