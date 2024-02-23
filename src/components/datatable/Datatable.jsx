/* eslint-disable array-callback-return */
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);
  const { data } = useFetch(`/${path}`);
  const navigate = useNavigate();
  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/${path}/${id}`);
      setList(list.filter((item) => item.id !== id));
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const listname = path.charAt(0).toUpperCase() + path.slice(1);
  const handleRowClick = (row,event) => {
    if (path === "user" && !event.target.classList.contains('deleteButton')) {
      navigate(`${row.id}`)
    }
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {listname}
        <Link to={`/${path}/new`} className="link">
          Add New {listname}
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        experimentalFeatures={{ newEditingApi: true }}
        pageSize={9}
        rowsPerPageOptions={[9]}
        getRowId={(row) => row.id}
        onRowClick={handleRowClick}
      />
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Datatable;
