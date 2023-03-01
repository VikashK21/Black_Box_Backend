import * as React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
// import Class1 from "../../Images/Classes/class2.jpg";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Img = (props) => {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (image) => {
    setOpen(false);
  };

  return (
    <div>
      <img
        src={props.image}
        alt=""
        className="classimages"
        onClick={handleClickOpen}
      />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth
        maxWidth="xs"
        aria-describedby="alert-dialog-slide-description"
      >
        {/* <iframe
            width="1001"
          height="538"
          className="w-100 h-100"
          src={props.image}
          style={{ width: "100%", height: "100%" }}
            
          title="How to get google meet link from BlackBox registration"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe> */}
        <img src={props.image} alt="" className="h-100"  />
      </Dialog>
    </div>
  );
};

export default Img;
