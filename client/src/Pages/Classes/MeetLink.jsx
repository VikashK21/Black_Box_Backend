import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
// eslint-disable-next-line
import DialogActions from "@mui/material/DialogActions";
// eslint-disable-next-line
import DialogContent from "@mui/material/DialogContent";
// eslint-disable-next-line
import DialogContentText from "@mui/material/DialogContentText";
// eslint-disable-next-line
import DialogTitle from "@mui/material/DialogTitle";
// eslint-disable-next-line
import Slide from "@mui/material/Slide";
// eslint-disable-next-line
import { useState } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MeetLink = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* <Button variant="contained" className="mx-2" onClick={handleClickOpen}>
        Help
      </Button> */}

      <Button
        onClick={handleClickOpen}
        variant="contained"
        className="h-75 w-25 ms-2 my-2"
      >
        Help
      </Button>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth
        maxWidth="lg"
        aria-describedby="alert-dialog-slide-description"
      >
        
            <iframe
              //   width="1001"
              height="538"
              className="w-100"
              src="https://www.youtube.com/embed/jAlDr9BDtuA"
              title="How to get google meet link from BlackBox registration"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
         
      </Dialog>
    </div>
  );
};

export default MeetLink;
