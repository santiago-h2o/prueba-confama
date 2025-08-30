import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInfoUser } from "../redux/authSlice";
import { apiUrls } from "../../services/api/urls";
import { useNavigate } from "react-router-dom";

const withAuth = (WrappedComponent) => {
  return function AuthenticatedComponent(props) {
    const [authenticated, setAuthenticated] = useState(null);
    const dispatch = useDispatch();
    const infoUser = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
      const checkToken = async () => {
        try {
          const token = infoUser.token;
          if (!token) throw new Error("Token no encontrado");

          const response = await fetch(apiUrls.auth.auth, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          });

          const data = await response.json();
          if (data.data && data.status === 200) {
            dispatch(
              setInfoUser({
                token,
                name: data.data.name,
                rol: data.data.rol,
                id: data.data.id,
                isLogged: true,
              })
            );
            setAuthenticated(true);
          } else {
            setAuthenticated(false);
            navigate("/login");
          }
        } catch (error) {
          navigate("/login");
        }
      };

      if (!infoUser.isLogged) {
        checkToken();
      } else {
        setAuthenticated(true);
      }
    }, [infoUser.isLogged, infoUser.token, dispatch, navigate]);

    if (authenticated === null) {
      return (
        <div style={styles.loaderContainer}>
          <div style={styles.loader}></div>
          <p style={styles.message}>Verificando sesión...</p>
        </div>
      );
    }

    return authenticated ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;

const styles = {
  loaderContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f9f9f9",
  },
  loader: {
    width: "50px",
    height: "50px",
    border: "5px solid #ccc",
    borderTop: "5px solid #4caf50",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  message: {
    marginTop: "10px",
    fontSize: "16px",
    color: "#555",
  },
};

if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(styleSheet);
}
