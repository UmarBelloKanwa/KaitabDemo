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
import Box from "@mui/material/Box";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useQueryClient } from "@tanstack/react-query";
import NextLink from "next/link";
import type { Author } from "@/types/author";

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
  const queryClient = useQueryClient();
  const author: Author = queryClient.getQueryData(["currentAuthor"])!;
  console.log("author", author);
  const [value, setValue] = React.useState("everyone");
  const monetizationEnabled = author?.monetization_enabled;

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
        <DialogContent>
          <FormControl
            sx={{
              fontSize: "small",
              border: "1px solid",
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
                label={
                  <Typography fontSize="small">
                    Everyone
                  </Typography>
                }
              />
              <FormControlLabel
                value="paid-subscribers-only"
                control={<Radio />}
                disabled={!(author && monetizationEnabled)}
                label={
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography
                      fontSize={14}
                      component={author && monetizationEnabled ? "span" : "del"}
                    >
                      Paid subscribers only
                    </Typography>
                    <Typography
                      fontSize="small"
                      component={NextLink}
                      href="settings/payments"
                    >
                      {author
                        ? monetizationEnabled
                          ? null
                          : "(Turn on paid subscriptions)"
                        : "(Your first publishing)"}
                    </Typography>
                  </Box>
                }
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
            onClick={async () => {
              publish(value === "everyone");
            }}
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
