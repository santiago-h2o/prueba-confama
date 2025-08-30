import { useState } from 'react';
import { handleCreateEmployee } from '../../actions/employees/employees';
import Swal from 'sweetalert2'

function EmployeeForm({ onClose, onCreate }) {
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        salary: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { status } = await handleCreateEmployee(formData);
        if (status === 200) {
            Swal.fire({
                title: "Creado exitosamente",
                text: "Empleado creado exitosamente.",
                icon: "success"
            });
        }
        onCreate()
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
            <input name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} />
            <select
                name="role"
                value={formData.role}
                onChange={handleChange}
            >
                <option value="">Seleccione un rol</option>
                <option key="employee" value="employee">
                    Empleado
                </option>
                <option key="admin" value="admin">
                    Administrador
                </option>
            </select>
            <input name="salary" placeholder="salario" value={formData.salary} onChange={handleChange} />
            <input name="password" placeholder="contraseña" value={formData.password} onChange={handleChange} />
            <button type="submit">Crear Empleado</button>
        </form>
    );
}

export default EmployeeForm;
