import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import InboxIcon from '@mui/icons-material/MoveToInbox';

type ButtonsPropsType = {
    open:boolean
}


const ButtonsList = [
    'DashBoard',
    'Produtos',
]







const ButtonsDrawer = (props:ButtonsPropsType)=>{



    return(
    <List>
        {ButtonsList.map((button)=>(

            <ListItem key={button}  disablePadding sx={{ display: 'block' }}>
            <ListItemButton
            sx={{
                minHeight: 48,
                justifyContent: props.open ? 'initial' : 'center',
                px: 2.5,
            }}
            >

            <ListItemIcon
                sx={{
                minWidth: 0,
                mr: props.open ? 3 : 'auto',
                justifyContent: 'center',
                }}
            >
                <InboxIcon />
            </ListItemIcon>

            <ListItemText primary={button} sx={{ opacity: props.open ? 1 : 0 }} />

            </ListItemButton>
            </ListItem>


        ))}

  </List>
  )



}

export default ButtonsDrawer