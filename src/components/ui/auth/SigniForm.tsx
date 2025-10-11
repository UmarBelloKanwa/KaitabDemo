'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PasswordField from './PasswordField';
import Link from '@mui/material/Link';
import AccountCircle from "@mui/icons-material/AccountCircle";
import Chip from '@mui/material/Chip';
import { Card, Stack } from './StyledContainers';

export default function SigninForm() {
    const isPassword = true;
    return (
        <Stack sx={{ height: 'fit-content', m: '0 auto', }}>
            <Box
                component="img"
                src="/assets/images/name.png"
                sx={() => ({
                    width: { xs: '110px', sm: "120px" },
                    height: { xs: '30px', sm: '30px' },
                    m: 'auto',
                    mb: 1
                })}
            />
            <Card variant="outlined" sx={{ display: 'flex', gap: 5 }} >
                <Typography
                    component="h1"
                    variant="h3"
                    sx={{ width: '100%', display: isPassword ? 'none' : 'block' }}
                >
                    Enter your password
                </Typography>

                <Box
                    component="form"
                    color='text.secondary'
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: { sm: 1.5, md: 1 }, }}
                >

                    <div style={{ display: isPassword ? 'block' : 'none' }}>
                        <AccountCircle
                            sx={{
                                color: 'white',
                                width: "100%",
                                height: {
                                    sm: "120px",
                                    xs: "150px",
                                },
                                margin: "0 auto",
                            }}
                        />

                        <Chip label="Umarbellokanwa@gmail.com" size="medium" disabled sx={{ textAlign: "center", width: 'fit-content', m: 'auto', mb: 1, p: 1, borderRadius: 11 }} />
                    </div>

                    <PasswordField
                        required
                        id="password"
                        placeholder="•••••••••"
                        name="password"
                        label="Password"
                        autoComplete="password"
                        variant="outlined"
                        withIcon={true}
                    />

                    <Button
                        type="submit"
                        color='secondary'
                        variant="contained"
                        sx={{
                            width: "50%",
                            margin: "auto",
                            borderRadius: 2,
                            mt: 3
                        }}

                    >
                        Continue
                    </Button>

                    <Typography sx={{ textAlign: 'center', mt: 2 }}>
                        Already have an account? {' '}
                        <Link
                            href="/signin/"
                            variant="body2"
                            sx={{ alignSelf: 'center' }}
                        >
                            Sign in
                        </Link>
                    </Typography>
                </Box>
            </Card>
        </Stack>
    );
}
