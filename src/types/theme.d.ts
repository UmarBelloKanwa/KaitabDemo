import "@mui/material/styles";

declare module "@mui/material/styles" {
    interface Theme {
        custom: {
            gradient: {
                primary: string;
                primaryHover: string;
            };
        };
    }

    interface ThemeOptions {
        custom?: {
            gradient?: {
                primary?: string;
                primaryHover?: string;
            };
        };
    }
}

