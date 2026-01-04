import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs({
  open,
  publish,
  handleClose,
   isSubmitting,
}: {
  open: boolean;
  publish: (v: boolean) => Promise<void>;
  handleClose: () => void;   
  isSubmitting: boolean;
}) {
  const [value, setValue] = React.useState("everyone");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const isFree = value === "everyone";
  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        maxWidth={"sm"}
        fullWidth
        aria-labelledby="customized-dialog-title"
        open={open}
        slotProps={{
          paper: {
            sx: {
              border: "1px solid",
              bgcolor: "background.default",
              borderColor: "grey.800",
              borderRadius: 2,
              p: { xs: 0, md: 1 },
            },
            elevation: 0,
          },
        }}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Publish
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent >
          <FormControl
            sx={{
              fontSize: "small",
              border: "3px solid",
              borderColor: "divider",
              borderRadius: 2,
              width: "100%",
              p: 2,
            }}
          >
            <FormLabel id="demo-controlled-radio-buttons-group">
              Audience
            </FormLabel>
            <Typography
              gutterBottom
              variant="caption"
              color="grey"
              fontSize="small"
            >
              Who can access this content
            </Typography>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="everyone"
                control={<Radio />}
                label="Everyone"
              />
              <FormControlLabel
                value="paid-subscribers-only"
                control={<Radio />}
                label="Paid subscribers only"
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            className="elevated"
            onClick={handleClose}
            sx={{
              textTransform: "none",
             // borderRadius: 1,
            }}
          >
            Cancel
          </Button>
          <Button
            autoFocus
            variant="contained"
            loading={isSubmitting}
            loadingPosition="end"
            onClick={async () => { publish(value === "everyone")} }
            sx={{
              textTransform: "none",
            //  borderRadius: 2,
            }}
          >
            Publish to {isFree ? value : "paid subscribers only"}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
