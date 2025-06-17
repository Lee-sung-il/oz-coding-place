import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';

interface MenuProps {
    onDelete?: () => void
}

export default function MenuListComposition({onDelete}: MenuProps) {

    return (
        <Stack direction="row" spacing={2}>
            <Paper>
                <MenuList>
                    <MenuItem onClick={onDelete}>삭제</MenuItem>
                    <MenuItem>My account</MenuItem>
                    <MenuItem>Logout</MenuItem>
                </MenuList>
            </Paper>
        </Stack>
    );
}
