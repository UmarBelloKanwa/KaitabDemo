'use client';

import * as React from 'react';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from '@mui/material/Divider';
import useSigninForm from "@/hooks/auth/UseSinginForm";
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Alert from "./ErrAlert";
import PasswordField from "./PasswordField";
import OtpTab from "./OtpTab";


export default function SigninForm() {
    const {
        userEmail,
        loading,
        handleSetEmail,
        loginUser,
        errors,
        loginMethod,
        setLoginMethod,
        isOtpStep,
        setIsOtpTab,
        resendOtpCode,
        submitOtpCode,
        handleSetUserPassword
    } = useSigninForm();
    const isSubmitting = loading;
    return (
        <Box>
            <Stack sx={{
                opacity: isSubmitting ? 0.5 : 1,
                pointerEvents: isSubmitting ? 'none' : 'auto',
                bgcolor: "background.paper",
                transition: 'opacity 0.4s ease-in-out',
                p: 0,
                border: "none"
            }}>
                {!isOtpStep ? (
                    <Card
                        variant='outlined'
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignSelf: 'center',
                            alignItems: 'center',
                            width: '100%',
                            bgcolor: "background.paper",
                            margin: 'auto',
                            py: 0,
                            border: "none"
                        }} >
                        <Box sx={{ width: "100%", m: "auto", mb: 1, textAlign: "center" }}>
                            <Typography
                                component="h1"
                                variant="h4"
                                fontSize="xx-large"
                                sx={{ width: '100%' }}
                            >
                                Kaitab
                            </Typography>
                            <Typography
                                component="p"
                                variant='body1'
                                sx={{ width: '100%' }}
                            >
                                Sign in &mdash; where books are living minds.
                            </Typography>
                        </Box>
                        {(Boolean(errors.general)) && (
                            <Alert severity="error" sx={{ textAlign: 'left' }}> {errors.gereral} </Alert>
                        )}
                        <Box
                            component="form"
                            color="text.secondary"
                            onSubmit={(e) => {
                                e.preventDefault(); // ⛔ stop actual submission
                            }}
                            sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 1.5, }}
                        >

                            <TextField
                                required
                                variant="outlined"
                                placeholder={"Your email"}
                                name="email"
                                autoComplete="email"
                                value={userEmail ? userEmail : ""}
                                error={!!errors.email}
                                helperText={errors.email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSetEmail(e.target.value)}
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                            />

                            {loginMethod == "password" && (
                                <PasswordField withIcon={true} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSetUserPassword(e.target.value)} />
                            )}

                            <Button
                                type="button"
                                variant="contained"
                                fullWidth
                                onClick={loginUser}
                                loading={isSubmitting}
                                loadingPosition="end"
                                color='secondary'
                                sx={{
                                    margin: "auto",
                                }}
                            >
                                Continue
                            </Button>


                            <Divider sx={{ my: -1 }}>
                                <Typography sx={{ color: 'text.secondary' }}>or</Typography>
                            </Divider>
                            <Button
                                type="submit"
                                variant='outlined'
                                fullWidth
                                onClick={(e) => { setLoginMethod(loginMethod == "password" ? "email" : "password"); setIsOtpTab(false) }}
                                // loading={isSubmitting}
                                loadingPosition="end"
                                color='secondary'
                                sx={{
                                    margin: "auto",
                                }}
                            >

                                Sign in with {loginMethod == "email" ? "password" : "email"}
                            </Button>

                        </Box>
                    </Card>
                ) : (
                    <OtpTab
                        errors={errors}
                        email={userEmail}
                        setIsOtpStep={setIsOtpTab}
                        resendCode={resendOtpCode}
                        submitOtpCode={submitOtpCode}
                    />
                )}
            </Stack>
        </Box>
    )
}