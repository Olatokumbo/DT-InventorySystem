import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { MDBDataTableV5 } from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import axios from "axios";
import moment from "moment"
import {useHistory} from "react-router-dom"
import ReportHeader from "../../components/ReportHeader/ReportHeader";
const ExpiredRequests = () => {
  const history = useHistory();  
  const [inventoryData, setInventoryData] = useState([]);
  const [datatable, setDatatable] = useState({
    columns: [
      {
        label: "Machine Type",
        field: "machineType",
        width: 150,
        attributes: {
          "aria-controls": "DataTable",
          "aria-label": "Name",
        },
      },
      {
        label: "Make and Model",
        field: "makeAndModel",
        width: 170,
      },
      {
        label: "Machine Number",
        field: "machineNumber",
        sort: "asc",
        width: 100,
      },
      {
        label: "Current User",
        field: "currentUser",
        sort: "disabled",
        width: 100,
      },
      {
        label: "Start Date",
        field: "startDate",
        sort: "disabled",
        width: 100,
      },
      {
        label: "End Date",
        field: "endDate",
        sort: "disabled",
        width: 100,
      },
      {
        label: "Action",
        field: "action",
        sort: "disabled",
        width: 100,
      },
    ],
  });
  useEffect(() => {
    const getData = async () => {
      await axios
        .get("http://127.0.0.1:7000/report/expired", {
          headers: {
            "Authorization" : process.env.REACT_APP_TOKEN
          }
        })
        .then((inventory) => {
          const test = inventory.data.map((data) => {
            var temp = Object.assign({}, data);
            temp.action = (
              <Button
                variant="contained"
                color="primary"
                onClick={() => {history.push(`/asset/view/${temp.uid}`)}}
              >
                View
              </Button>
            );
            temp.startDate =(
                moment(temp.startDate).format("dddd, DD/MM/YYYY")
            );
            temp.endDate =(
                moment(temp.endDate).format("dddd, DD/MM/YYYY")
            );
            return temp;
          });
          // console.log(test);
          setInventoryData(test);
        })
        .then(() => {
          setDatatable((e) => {
            return { ...e, rows: inventoryData };
          });
        });
    };
    getData();
  }, [datatable]);
  return (
      <ReportHeader>
        <h2>Expired Requests</h2>
        <h5>Total: {inventoryData.length}</h5>
        <MDBDataTableV5
          hover
          entriesOptions={[5, 20, 25]}
          entries={5}
          pagesAmount={4}
          data={datatable}
          pagingTop
          searchTop
          searchBottom={false}
          barReverse
        />
      </ReportHeader>
  );
};

export default ExpiredRequests;
