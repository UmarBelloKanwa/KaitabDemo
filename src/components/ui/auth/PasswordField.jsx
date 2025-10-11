import * as React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
//import Lock from "@mui/icons-material/Lock";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const PasswordField = ({ withIcon, ...props }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handeleMouseEventPassword = (ev) => void ev.preventDefault();
  return (
    <TextField
      type={showPassword ? "text" : "password"}
      placeholder="Your password"
      slotProps={{
        inputLabel: {
          shrink: true,
        },
        input: {
          // startAdornment: (
          //   <InputAdornment position="start">
          //     <Lock />
          //   </InputAdornment>
          // ),
          ...(withIcon && {
            endAdornment: (
              <InputAdornment position="start">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handeleMouseEventPassword}
                  onMouseUp={handeleMouseEventPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }),
        },
      }}
      {...props}
    />
  );
};

export default PasswordField;
