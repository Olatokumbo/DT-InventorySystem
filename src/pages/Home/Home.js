import React, { useState, useEffect } from "react";
import { MDBDataTableV5 } from "mdbreact";
import { Button } from "@material-ui/core";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import axios from "axios";
import style from "./Home.module.css";

const Home = () => {
  const [inventoryData, setInventoryData] = useState([])
  useEffect(() => {
    axios.get("http://localhost:7000")
    .then((inventory) => {
      setInventoryData(inventory.data)
    });

    setDatatable((e) => {
      return { ...e, rows: inventoryData };
    });
  }, [inventoryData]);
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
        label: "Service Tag",
        field: "serviceTag",
        width: 100,
      },
      {
        label: "Machine Number",
        field: "machineNumber",
        sort: "asc",
        width: 100,
      },
      {
        label: "Delivery Date",
        field: "deliveryDate",
        sort: "disabled",
        width: 150,
      },
      {
        label: "User/ Assignee",
        field: "user",
        sort: "disabled",
        width: 100,
      },
      {
        label: "User/ Resource Account",
        field: "resourceAccount",
        sort: "disabled",
        width: 100,
      },
      {
        label: "Current User",
        field: "currentUser",
        sort: "disabled",
        width: 100,
      },
      {
        label: "Deployment Date",
        field: "deploymentDate",
        sort: "disabled",
        width: 100,
      },
      {
        label: "Business Unit",
        field: "businessUnit",
        sort: "disabled",
        width: 100,
      },
      {
        label: "Location",
        field: "location",
        sort: "disabled",
        width: 100,
      },
      {
        label: "PO#",
        field: "poNumber",
        sort: "disabled",
        width: 100,
      },
      {
        label: "Approval Flag",
        field: "approvalFlag",
        sort: "disabled",
        width: 100,
      },
    ],
  });

  return (
    <div className={style.home}>
      <Button variant="contained" color="primary">
        Add Computer
      </Button>
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
    </div>
  );
};

export default Home;
