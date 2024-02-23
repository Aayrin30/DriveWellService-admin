import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { DarkModeContext } from "../../context/darkModeContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const New = ({ inputs, title }) => {
  const [info, setInfo] = useState({});
  const { data } = useFetch(`/user`);
  const { darkMode } = useContext(DarkModeContext);
  useEffect(() => {
    // eslint-disable-next-line array-callback-return
    data.map((input) => {
      if (info.username === input.username) {
        toast.warn("Username is Already Taken!");
      }
    });
    // eslint-disable-next-line array-callback-return
    data.map((input) => {
      if (info.email === input.email) {
        toast.warn("Email is Already Taken!");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info.email, info.username]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", info);
      toast.success("User is Added Successfully", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: `${darkMode ? "dark" : "light"}`,
      });
      setTimeout(() => {
        navigate("/user");
      }, 3000);
    } catch (error) {
      console.log(error);
      toast.warn("Write Details Carefully", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                    required
                    contentEditable="true"
                  />
                  <span>{input.errorMessage}</span>
                </div>
              ))}
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
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
          style={{ backgroundColor: darkMode && "black" }}
        />
      </div>
    </div>
  );
};

export default New;
