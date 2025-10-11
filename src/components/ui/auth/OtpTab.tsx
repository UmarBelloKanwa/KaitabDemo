'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from './ErrAlert';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import OtpInput from './OtpInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

export default function VerifyOtpTab({
    email, resendCode, errors, submitOtpCode, setIsOtpStep,
}: {
    email: string | null, resendCode: () => void, errors: any,
    submitOtpCode: () => void, setIsOtpStep: (value: boolean) => void
}) {

    const [otpCode, setOtpCode] = React.useState<number | null>(null);

    const [timer, setTimer] = React.useState(180); // 3 minutes in seconds
    const timerRef = React.useRef<NodeJS.Timeout | null>(null);

    React.useEffect(() => {
        if (timer === 0 && timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
            return;
        }
        if (timer > 0 && !timerRef.current) {
            timerRef.current = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => {
            if (timerRef.current && timer === 0) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [timer]);

    const handleResend = async () => {
        await resendCode();
        setTimer(180); // reset timer
    };

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    return (
        <Box
            component="form"
            sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 1 }}
        >
            <Typography
                component="h1"
                variant="h4"
                fontSize="xx-large"
                sx={{ width: '100%', mt: 0 }}
            >
                Check your inbox
            </Typography>

            {(errors?.general) && (
                <Alert severity="error" sx={{ textAlign: 'left' }}> {errors?.general} </Alert>
            )}

            <Typography
                component="div" fontSize="14px"
                variant="subtitle1"
                color="text.secondary"
                sx={{
                    m: "auto",
                    mb: 1
                }}
            >
                Enter the codes we just sent to {email}. &nbsp;
                <Typography
                    color="secondary"
                    component="span"
                    fontSize="14px"
                    onClick={() => setIsOtpStep(false)}
                    sx={{
                        "&:hover": {
                            textDecorationLine: "underline",
                            cursor: "pointer",
                        }
                    }}>
                    Try again
                </Typography>
            </Typography>

            <OtpInput onChange={() => { }}/*onChange={handleOtpChange}*/ />

            {!!errors.otp && (
                        <FormControl error={!!errors.otp}>
                            <FormHelperText sx={{ pl: 0.5, mt: 0 }}> {errors.otp} </FormHelperText>
                        </FormControl>
                 )}


            {/* Timer display */}
            <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center', mb: 0 }}>
                {timer > 0
                    ? `You can request new in ${formatTime(timer)}`
                    : "Did not received the code ? Click to resend"
                }
            </Typography>

            <Button
                variant="text"
                sx={{ width: 'fit-content', mt: 0 }}
                onClick={handleResend}
                disabled={timer > 0}
            >
                Rresend code
            </Button>

            <Button
                type="submit"
                variant="contained"
                loadingPosition="end"
                fullWidth
                // disabled={!user?.contact?.value}
                sx={{
                    margin: "auto",
                    mt: 0,
                    width: { xs: "100%", sm: "75%" }
                }}
                color="secondary"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    // submitOtp();
                }}
            >
                Continue
            </Button>
        </Box>
    );
};