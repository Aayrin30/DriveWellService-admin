export const userColumns = [
  { field: "id", headerName: "ID", width: 320 },
  {
    field: "username",
    headerName: "User",
    width: 170,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 240,
  },

  {
    field: "isAdmin",
    headerName: "isAdmin",
    width: 100,
  },
];

export const companyColumns = [
  { field: "id", headerName: "ID", width: 320 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "description",
    headerName: "Description",
    width: 150,
  },
];

export const modelColumns = [
  { field: "id", headerName: "ID", width: 320 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "companyId",
    headerName: "Company Id",
    width: 320,
  },
];
export const serviceColumns = [
  { field: "id", headerName: "ID", width: 320 },
  {
    field: "name",
    headerName: "Name",
    width: 350,
  }
];
export const priceColumns = [
  { field: "id", headerName: "ID", width: 320 },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  { field: "modelId", headerName: "Model ID", width: 320 },
  { field: "serviceId", headerName: "Service ID", width: 320 },
];