import React, { useEffect, useState } from "react";
import {
  TextField,
  Typography,
  Button,
  FormControlLabel,
  Switch,
  IconButton,
} from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from "axios";
import moment from "moment";
import { useHistory } from "react-router-dom";
import style from "./AssetInfo.module.css";

const AssetInfo = ({
  match: {
    params: { assetId },
  },
}) => {
  const history = useHistory();
  const [editState, setEditState] = useState(true);
  const [uid, setUid] = useState("");
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
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [moveable, setMoveable] = useState(false);

  useEffect(() => {
    axios.get(`http://127.0.0.1:7000/asset/${assetId}`, {
      headers: {
        "Authorization": process.env.REACT_APP_TOKEN
      }
    }).then((received) => {
      console.log(received.data[0]);
      setUid(received.data[0].uid);
      setMachineType(received.data[0].machineType);
      setMachineNumber(received.data[0].machineNumber);
      setMakeAndModel(received.data[0].makeAndModel);
      setServiceTag(received.data[0].serviceTag);
      setDeliveryDate(received.data[0].deliveryDate);
      setDeploymentDate(received.data[0].deploymentDate);
      setResourceAccount(received.data[0].resourceAccount);
      setCurrentUser(received.data[0].currentUser);
      setBusinessUnit(received.data[0].businessUnit);
      setLocation(received.data[0].location);
      setPoNumber(received.data[0].poNumber);
      setStartDate(received.data[0].startDate);
      setEndDate(received.data[0].endDate);
      setMoveable(received.data[0].moveable === 1 ? true : false);
    });
  }, [assetId]);

  const deleteAsset = async (uid) => {
    axios
      .post(`http://localhost:7000/asset/delete/${uid}`, {
        headers: {
          "Authorization": process.env.REACT_APP_TOKEN
        }
      })
      .then(() => {
        // console.log(result);
        alert("Asset has been deleted from the Inventory");
        history.push("/inventory");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editAsset = async (uid) => {
    axios
      .post(`http://localhost:7000/asset/edit/${uid}`, {
        machineType,
        machineNumber,
        makeAndModel,
        serviceTag,
        deliveryDate,
        deploymentDate,
        resourceAccount,
        currentUser,
        businessUnit,
        location,
        poNumber,
        moveable,
      },{
        headers: {
          "Authorization": process.env.REACT_APP_TOKEN
        }
      })
      .then(() => {
        //   console.log(result);
        alert("Asset Info has been Updated");
        setEditState(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={style.assetInfo}>
      <div className={style.header}>
        <div className={style.main}>
          <IconButton size="small" onClick={()=>history.push("/inventory")}>
            <ArrowBackIcon />
          </IconButton>
          <h4>Asset Info</h4>
        </div>
        <div className={style.actions}>
          <Button
            variant="contained"
            className={style.editBtn}
            size="small"
            onClick={() => setEditState((prevState) => !prevState)}
          >
            {editState ? "Edit" : "Lock"}
          </Button>
          <Button
            variant="contained"
            size="small"
            color="secondary"
            onClick={() => deleteAsset(uid)}
          >
            Delete
          </Button>
        </div>
      </div>
      <form className={style.listContainer}>
        <TextField
          label="Machine Type"
          disabled={editState}
          className={style.input}
          value={machineType}
          onChange={(e) => setMachineType(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Machine Number"
          disabled={editState}
          className={style.input}
          value={machineNumber}
          onChange={(e) => setMachineNumber(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Make and Model"
          disabled={editState}
          className={style.input}
          value={makeAndModel}
          onChange={(e) => setMakeAndModel(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Business Unit"
          disabled={editState}
          className={style.input}
          value={businessUnit}
          onChange={(e) => setBusinessUnit(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Location"
          disabled={editState}
          className={style.input}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="PO Number"
          disabled={editState}
          className={style.input}
          value={poNumber}
          onChange={(e) => setPoNumber(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Service Tag"
          disabled={editState}
          className={style.input}
          value={serviceTag}
          onChange={(e) => setServiceTag(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <div className={style.dates}>
          <TextField
            label="Delivery Date"
            disabled={editState}
            type="date"
            className={style.input}
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Deployment Date"
            disabled={editState}
            type="date"
            className={style.input}
            value={deploymentDate}
            onChange={(e) => setDeploymentDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <TextField
          label="Current User"
          disabled={editState}
          className={style.input}
          value={currentUser}
          onChange={(e) => setCurrentUser(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Resource Account"
          disabled={editState}
          className={style.input}
          value={resourceAccount}
          onChange={(e) => setResourceAccount(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormControlLabel
          className={style.switch}
          control={
            <Switch
              name="Moveable"
              color="primary"
              disabled={editState}
              onChange={(e) => setMoveable(e.target.checked)}
              checked={moveable}
            />
          }
          label="Moveable"
        />
        <div className={style.durationDates}>
          <Typography color="textSecondary">Requested Dates</Typography>
          <TextField
            label="Start Date"
            type="text"
            className={style.input}
            disabled
            value={endDate ? moment(startDate).format("DD/MM/YYYY") : "No date"}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="End Date"
            type="text"
            className={style.input}
            disabled
            value={endDate ? moment(endDate).format("DD/MM/YYYY") : "No date"}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <Button
          variant="contained"
          disabled={editState}
          onClick={() => editAsset(uid)}
          color="primary"
          size="medium"
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default AssetInfo;
