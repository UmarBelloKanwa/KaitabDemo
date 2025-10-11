'use client';

import * as React from 'react';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import ContinueWithOthersPlatforms from './ContinueWithOthersPlatforms';
//import { useTranslations } from 'next-intl';

export default function Intro() {
    //const t = useTranslations('auth');
    return (
        <>
            <Grid
                size='grow'
                color="text.secondary"
                sx={{
                    width: { xs: '100%', sm: '90%', md: '90%' },
                    m: 'auto',
                    height: 'fit-content',
                    p: 'auto',
                    mt: { xs: 3, sm: 3, md: 0 }
                }}
            >
                <Box
                    // component="img"
                    // src="/assets/images/name.png"
                    sx={() => ({
                        width: { xs: '110px', sm: "150px" },
                        height: { xs: '30px', sm: '40px' },
                        m: 'auto',
                        mt: 0,
                        mb: 0,
                    })}
                > Kaitab </Box> 
                <Typography
                    component="h1"
                    variant="h5"
                    sx={{
                        fontSize: { xs: '24px', sm: '20px', md: '25px' },
                        maxWidth: { xs: '100%', sm: '70%', md: '90%' },
                        lineHeight: 1.1,
                        fontWeight: 700,
                        m: 'auto',
                        mb: { xs: 1, md: 3, sm: 3 },
                        mt: 0.2,
                        p: { xs: 2, md: 0 },
                        pb: { xs: 0 }
                    }}
                > Learn and Publish Books. </Typography>
                <Typography
                    variant='h5'
                    component={'p'}
                    sx={{
                        maxWidth: { md: '70%', xs: '100%', sm: '70%' },
                        m: 'auto',
                        fontWeight: 400,
                        fontSize: { md: '1rem', sm: '1rem', xs: '0.9em' },
                        lineHeight: 1.6,
                        p: { xs: 3, md: 0 }
                    }}
                >
                    Knowledge sharing platform to learn and publish books. Join our community of readers and authors.
                </Typography>
                <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
                    <ContinueWithOthersPlatforms />
                </Box>
            </Grid >

            <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{ display: { xs: 'none', sm: 'none', md: 'block' }, m: '2em auto', }}
            />
        </>
    );
};