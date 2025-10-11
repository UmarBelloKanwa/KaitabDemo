'use client';

import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { GoogleIcon, FacebookIcon } from './CustomIcons';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import MicrosoftIcon from '@mui/icons-material/Microsoft';
import AppleIcon from '@mui/icons-material/Apple';

const othersPlatforms = [
    { name: "Google", onClick: () => alert('Google'), icon: GoogleIcon },
    { name: "Facebook", onClick: () => alert('Facebook'), icon: FacebookIcon },
    { name: "Microsoft", onClick: () => alert('Facebook'), icon: MicrosoftIcon },
    { name: "Apple", onClick: () => alert('Google'), icon: AppleIcon },
];

export default function ContinueWithOthersPlatforms() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flexWrap: 'wrap',
                '& > *': {
                    mt: 2,
                },
            }}
        >
            <Chip label="Continue with" size="medium" sx={{ mb: -1 }} />
            <Tooltip title="These faetures are coming soon!" placement="top" arrow>
                <ButtonGroup
                    sx={{
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'grid',
                        gridTemplateColumns: 'auto auto'
                    }}
                    variant='contained'
                    disableElevation
                    aria-label="Button Group">
                    {othersPlatforms.map((platform, index) => (
                        <Button key={index} variant="outlined" startIcon={<platform.icon />} sx={{ borderRadius: '7em !important', m: 0.7 }}> {platform.name} </Button>
                    ))}
                </ButtonGroup>
            </Tooltip>
        </Box>
    )
}