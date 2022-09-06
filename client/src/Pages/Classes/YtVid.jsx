import * as React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Class1 from "../../Images/Classes/class2.jpg";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const YtVid = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

 

  return (
    <div>
    
     
      <img src={props.img} alt="" className="w-100 classimage my-4 cp"  
      onClick={handleClickOpen}
      />
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
        //   src={`https://www.youtube.com/embed/${props.src}`}
        src={props.src}
        //   src="https://www.youtube.com/embed/jAlDr9BDtuA"
          title="How to get google meet link from BlackBox registration"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </Dialog>
    </div>
  );
};

export default YtVid;

{/* <iframe width="900" height="506" src="https://www.youtube.com/embed/NgtYt1xK3Wc" title="Falak Tak - Udit Narayan  (@WORMONO x Gravero Lofi Remake) | Tashan | Bollywood Lofi" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
