import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DataTable from "../../hooks/table/DataTable";
import styles from "./Dashboard.module.css";
import { columnProducts } from "../../hooks/table/columns/ProductsColumn";
import { columnSolicitude } from "../../hooks/table/columns/SolicitudeColumn";
import { handleDeleteEmployee, handleGetProducts } from "../../actions/products/products";
import { handleDeleteSolicitude, handleGetSolicitude } from "../../actions/solicitude/solicitude";
import ProductsForm from "../../components/ProductsForm/ProductsForm";
import SolicitudeForm from "../../components/SolicitudeForm/SolicitudeForm";
import withAuth from "../../hooks/auth/auth";
import { logout } from "../../hooks/redux/authSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Dashboard() {
  const [data, setData] = useState([]);
  const [currentPage] = useState(0);
  const [view, setView] = useState("products");
  const [showForm, setShowForm] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState({});



  const dispatch = useDispatch();
  const infoUser = useSelector((state) => state.auth.infoUser);

  const navigate = useNavigate();

  const fetchData = async () => {
    if (view === "products") {
      const response = await handleGetProducts();
      console.log("response 222: ", response)
      setData(response.data);
    } else if (view === "solicitude") {
      const response = await handleGetSolicitude();
      setData(response.data);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [view]);

  const handleCreate = async (newItem) => {
    console.log("Nuevo registro creado:", newItem);
    fetchData();
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: `Quieres eliminar ${view === "products" ? "el empleado " : " la solicitud "
        } con el id ${id}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response =
            view === "products"
              ? await handleDeleteEmployee(id)
              : await handleDeleteSolicitude(id);

          if (response?.status === 200) {
            Swal.fire({
              title: "Eliminado",
              text: response.message || "Eliminado exitosamente.",
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "Error",
              text: response?.message || "No se pudo eliminar.",
              icon: "error",
            });
          }
          fetchData();
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: error.message || "Error inesperado al eliminar.",
            icon: "error",
          });
        }
      }
    });
  };

  const handleEdit = async (data) => {
    console.log("data para editar: ", data)
    setEdit(!edit)
    setEditData(data)
    setShowForm(true)
  };

  const columns = view === "products" ? columnProducts : columnSolicitude;

  return (
    <div className={styles["dashboard"]}>
      <h1 className={styles["dashboard__title"]}>
        Bienvenido {infoUser?.name} ({infoUser?.rol})
      </h1>

      <button
        onClick={handleLogout}
        style={{
          marginBottom: "1rem",
          backgroundColor: "#e74c3c",
          color: "white",
          border: "none",
          padding: "8px 12px",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Cerrar sesión
      </button>

      <div className={styles["dashboard__tabs"]}>
        <button
          onClick={() => setView("products")}
          className={view === "products" ? styles.active : ""}
        >
          Empleados
        </button>
        <button
          onClick={() => setView("solicitude")}
          className={view === "solicitude" ? styles.active : ""}
        >
          Solicitudes
        </button>
      </div>

      <button
        onClick={() => setShowForm((prev) => !prev)}
        style={{ marginBottom: "1rem" }}
      >
        {showForm ? "Cancelar" : `Crear ${view === "products" ? "Producto" : "Solicitud"}`}
      </button>

      <DataTable
        data={data}
        columns={columns}
        currentPage={currentPage}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />

      {showForm &&
        (view === "products" ? (
          <ProductsForm onClose={() => setShowForm(false)} onCreate={handleCreate} edit={edit} editData={editData} />
        ) : (
          <SolicitudeForm
            onClose={() => setShowForm(false)}
            onCreate={handleCreate}
            data={data}
          />
        ))}
    </div>
  );
}

export default withAuth(Dashboard);
