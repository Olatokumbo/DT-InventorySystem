import React, { useState } from "react";
import {
  Modal,
  Fade,
  makeStyles,
  Backdrop,
  TextField,
  Button,
  Typography,
FormControlLabel,
Switch
} from "@material-ui/core";
import axios from "axios";
import style from "./EntryModal.module.css";
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    // alignItems: "flex-end",
    justifyContent: "center",
    overflow: "auto"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #a7a7a7de",
    boxShadow: theme.shadows[5],
    borderRadius: "10px",
    padding: theme.spacing(2, 4, 3),
    height: "fit-content"
  },
}));

const EntryModal = ({ modalState, closeModal}) => {
  const classes = useStyles();
  const [machineType, setMachineType] = useState("");
  const [makeAndModel, setMakeAndModel] = useState("");
  const [serviceTag, setServiceTag] = useState("");
  const [machineNumber, setMachineNumber] = useState("");
  const [deliveryDate, setDeliveryDate] = useState(""); 
  const [resourceAccount, setResourceAccount] = useState(""); 
  const [currentUser, setCurrentUser] = useState("");
  const [deploymentDate, setDeploymentDate] = useState("");
  const [businessUnit, setBusinessUnit] = useState("");
  const [location, setLocation] = useState("");
  const [poNumber, setPoNumber] = useState("");
  const [moveable, setMoveable] = useState(false);

  const handleClose = () => {
    closeModal(true);
  };

  const AddEntry = (e) => {
    e.preventDefault();
    handleClose();
    axios.post("http://localhost:7000/add", {
    machineType, 
    makeAndModel, 
    serviceTag, 
    machineNumber, 
    deliveryDate, 
    resourceAccount, 
    currentUser, 
    deploymentDate, 
    businessUnit, 
    location, 
    poNumber,
    moveable
    }).then((result)=>{
      console.log(result)
    }).catch((err)=>{
      console.log(err)
    })

  };

  const handleChange = (event) => {
    // setMoveState({ ...moveState, [event.target.name]: event.target.checked });
    setMoveable(event.target.checked)
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={modalState}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={modalState}>
        <div className={classes.paper}>
          <div className={style.container}>
            <Typography align="center" gutterBottom>
              Add an Entry
            </Typography>
            <form onSubmit={AddEntry}>
              <TextField
                autoFocus={true}
                variant="outlined"
                label="Machine Type"
                size="small"
                className={style.input}
                value={machineType}
                onChange={(e) => setMachineType(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                variant="outlined"
                label="Make and Model"
                size="small"
                className={style.input}
                value={makeAndModel}
                onChange={(e) => setMakeAndModel(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                variant="outlined"
                label="Service Tag"
                size="small"
                className={style.input}
                value={serviceTag}
                onChange={(e) => setServiceTag(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                variant="outlined"
                label="Machine Number"
                size="small"
                className={style.input}
                value={machineNumber}
                onChange={(e) => setMachineNumber(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                variant="outlined"
                label="Delivery Date"
                type="date"
                size="small"
                className={style.input}
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                variant="outlined"
                label="Resource Account"
                size="small"
                className={style.input}
                value={resourceAccount}
                onChange={(e) => setResourceAccount(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
              variant="outlined"
              label="Current User"
              size="small"
              className={style.input}
              value={currentUser}
              onChange={(e) => setCurrentUser(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
              <TextField
                variant="outlined"
                label="Deployment Date"
                type="date"
                size="small"
                className={style.input}
                value={deploymentDate}
                onChange={(e) => setDeploymentDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                variant="outlined"
                label="Business Unit"
                size="small"
                className={style.input}
                value={businessUnit}
                onChange={(e) => setBusinessUnit(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                variant="outlined"
                label="Location"
                size="small"
                className={style.input}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                variant="outlined"
                label="PO Number"
                size="small"
                className={style.input}
                value={poNumber}
                onChange={(e) => setPoNumber(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            <FormControlLabel
            control={
              <Switch
                name="Moveable"
                color="primary"
                checked={moveable}
            onChange={handleChange}
              />
            }
            label="Moveable"
          />
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                Add
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  handleClose();
                }}
              >
                Cancel
              </Button>
            </form>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default EntryModal;
