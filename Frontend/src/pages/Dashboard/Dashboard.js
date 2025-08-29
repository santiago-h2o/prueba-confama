import { useEffect, useState, useContext } from 'react';
import DataTable from '../../hooks/table/DataTable';
import styles from './Dashboard.module.css';
import { columnEmployees } from '../../hooks/table/columns/EmployeesColumn';
import { columnSolicitude } from '../../hooks/table/columns/SolicitudeColumn';
import { handleDeleteEmployee, handleGetEmployees } from '../../actions/employees/employees';
import { handleDeleteSolicitude, handleGetSolicitude } from '../../actions/solicitude/solicitude';
import EmployeeForm from '../../components/EmployeeForm/EmployeeForm';
import SolicitudeForm from '../../components/SolicitudeForm/SolicitudeForm';
import withAuth from '../../hooks/auth/auth';
import LoginContext from '../../hooks/context/context';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'


function Dashboard() {
  const [data, setData] = useState([]);
  const [currentPage] = useState(0);
  const [view, setView] = useState('employees');
  const [showForm, setShowForm] = useState(false);
  const { infoUser, logout } = useContext(LoginContext)
  const navigate = useNavigate();

  const fetchData = async () => {
    if (view === 'employees') {
      const response = await handleGetEmployees();
      setData(response.data);
    } else if (view === 'solicitude') {
      console.log("entrando aqui")
      const response = await handleGetSolicitude();
      setData(response.data);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [view]);

  const handleCreate = async (newItem) => {
    console.log('Nuevo registro creado:', newItem);
    fetchData();
  };

  const handlelogout = async (newItem) => {
    logout()
    navigate('/login');

  };


  const handleDelete = async (id) => {
    Swal.fire({
      title: "Estas seguro?",
      text: `Quieres eliminar ${view === "employees" ? "el empleado " : " la solicitud "} con el id ${id}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = view === "employees" ? await handleDeleteEmployee(id) : await handleDeleteSolicitude(id);
          console.log("response: ", response)
          if (response?.status === 200) {
            Swal.fire({
              title: "Eliminado",
              text: response.message || "Empleado eliminada exitosamente.",
              icon: "success"
            });
          } else {
            Swal.fire({
              title: "Error",
              text: response?.message || "No se pudo eliminar el empleado.",
              icon: "error"
            });
          }
          fetchData()
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: error.message || "Error inesperado al eliminar.",
            icon: "error"
          });
        } finally {
        }
      }
    });
  };

  const columns = view === 'employees' ? columnEmployees : columnSolicitude;

  return (
    <div className={styles['dashboard']}>
      <h1 className={styles['dashboard__title']}>Bienvenido {infoUser.name}({infoUser.rol})</h1>
      <button onClick={handlelogout} style={{ marginBottom: '1rem', backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}>
        Cerrar sesión
      </button>
      <div className={styles['dashboard__tabs']}>
        <button onClick={() => setView('employees')} className={view === 'employees' ? styles.active : ''}>
          Empleados
        </button>
        <button onClick={() => setView('solicitude')} className={view === 'solicitude' ? styles.active : ''}>
          Solicitudes
        </button>
      </div>

      <button onClick={() => setShowForm(prev => !prev)} style={{ marginBottom: '1rem' }}>
        {showForm ? 'Cancelar' : `Crear ${view === 'employees' ? 'Empleado' : 'Solicitud'}`}
      </button>

      <DataTable data={data} columns={columns} currentPage={currentPage} handleDelete={handleDelete} />

      {showForm && (
        view === 'employees'
          ? <EmployeeForm onClose={() => setShowForm(false)} onCreate={handleCreate}/>
          : <SolicitudeForm onClose={() => setShowForm(false)} onCreate={handleCreate} data={data}/>
      )}
    </div>
  );
}

export default withAuth(Dashboard);
