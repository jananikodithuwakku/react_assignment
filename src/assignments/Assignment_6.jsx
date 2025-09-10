import { Box, Button, IconButton, List, ListItem, TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

export default function Assignment_6() {
    const [style, setStyle] = useState([]);
    const [name, setName] = useState("");
    const [value, setValue] = useState ("");

    const add = () => {
        if (name.trim() === "" || value.trim()  === "") return;
        setStyle([...style, {name: name, value: value}]);
        setName("");
        setValue("");
    };

    const Delete = (index) => {
        const newRules = style.filter((_, i) => i !== index);
        setStyle(newRules);
    };

    const cssO = style.reduce ((Obj, item) => ({...Obj,[item.name]: item.value}),{} );

    return(
        <Box sx={{p :3}}>
            <Typography variant="h5">Dynamic CSS Styling</Typography>

            <Box sx= {{display: "flex", gap: 2, mb:2}}>
                <TextField 
                    label= "CSS Rule Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                />

                <TextField 
                    label= "Value" 
                    value={value} 
                    onChange={(e) => setValue(e.target.value)}
                />

                <Button variant = "contained"
                    onClick = {add}
                >
                    Add
                </Button>
            </Box>
            <List>
                {style.map((rule,index)=>(
                    <ListItem key={index} secondaryAction={
                        <IconButton onClick={() => Delete(index)} color="error">
                            <DeleteIcon />
                        </IconButton>
                    }
                    >
                     {rule.name} : {rule.value}   
                    </ListItem>
                ))}
            </List>
                <Box sx={{mt: 3, p: 2, border: "1px solid gray", borderRadius: 2}}>
                    <div  style={cssO}> Sample Text </div>
                </Box>
        </Box>
    )
}