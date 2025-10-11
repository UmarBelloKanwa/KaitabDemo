'use client';
import React from "react";
import Container from '@mui/material/Container';
import Box from "@mui/material/Box";
import SelectLang from "@components/SelectLang";
import Head from "next/head";
import { useTranslations } from 'next-intl';


export default function AuthLayout({ children }: { children: React.ReactNode; }) {
    const t = useTranslations('auth');

    return (
        <>
            <Head>
                <title>{t('title')}</title>
            </Head>
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: "center",
                    minHeight: '100vh',
                    m: 'auto',
                    p: { xs: 0, sm: 0, md: 0 },
                }}
            >
                <SelectLang />
                <Box
                    sx={(/*theme*/) => ({
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        p: 0,
                        // backgroundSize: 'cover',
                        // backgroundRepeat: 'no-repeat',
                        // ...theme.applyStyles('dark', {
                        //     backgroundImage: 'radial-gradient(at 50% 50%, hsla(273, 88.30%, 36.90%, 0.22), rgba(9, 11, 17, .3))',
                        //     backgroundRepeat: 'no-repeat',
                        // }),
                        // borderRadius: { xs: 5, sm: 7, md: 17 },
                        // boxShadow: theme.shadows[1],
                        // height: 'fit-content',
                    })}
                >
                    {children}
                </Box>
            </Container>
        </>
    )
}