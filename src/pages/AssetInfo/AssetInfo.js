import React, { useEffect, useState } from "react";
import {
  TextField,
  Typography,
  Button,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import axios from "axios";
import moment from "moment";
import style from "./AssetInfo.module.css";

const AssetInfo = ({
  match: {
    params: { assetId },
  },
}) => {
  const [assetData, setAssetData] = useState({});
  const [editState, setEditState] = useState(true);
  useEffect(() => {
    axios.get(`http://localhost:7000/asset/${assetId}`).then((received) => {
      console.log(received.data[0]);
      setAssetData(received.data[0]);
    });
  }, [assetId]);
  return (
    <div className={style.assetInfo}>
      <div className={style.header}>
        <h4>Asset Info</h4>
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
            onClick={() => {}}
            variant="contained"
            size="small"
            color="secondary"
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
          value={assetData.machineType}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Machine Number"
          disabled={editState}
          className={style.input}
          value={assetData.machineNumber}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Make and Model"
          disabled={editState}
          className={style.input}
          value={assetData.makeAndModel}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Business Unit"
          disabled={editState}
          className={style.input}
          value={assetData.businessUnit}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Location"
          disabled={editState}
          className={style.input}
          value={assetData.location}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="PO Number"
          disabled={editState}
          className={style.input}
          value={assetData.poNumber}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Service Tag"
          disabled={editState}
          className={style.input}
          value={assetData.serviceTag}
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
            value={assetData.deliveryDate}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Deployment Date"
            disabled={editState}
            type="date"
            className={style.input}
            value={assetData.deploymentDate}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <TextField
          label="Current User"
          disabled={editState}
          className={style.input}
          value={assetData.currentUser}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Resource Account"
          disabled={editState}
          className={style.input}
          value={assetData.resourceAccount}
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
              checked={assetData.moveable === 1 ? true : false}
            />
          }
          label="Moveable"
        />
        <div className={style.durationDates}>
          <Typography color="textSecondary">Request Dates</Typography>
          <TextField
            label="Start Date"
            type="text"
            className={style.input}
            disabled
            value={
              assetData.endDate
                ? moment(assetData.startDate).format("DD/MM/YYYY")
                : "No date"
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="End Date"
            type="text"
            className={style.input}
            disabled
            value={
              assetData.endDate
                ? moment(assetData.endDate).format("DD/MM/YYYY")
                : "No date"
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <Button
          variant="contained"
          disabled={editState}
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
