import { useState } from 'react';
import { handleCreateSolicitude } from '../../actions/solicitude/solicitude';
import Swal from 'sweetalert2'

function SolicitudeForm({ onClose, onCreate, data }) {
    const [formData, setFormData] = useState({
        description: '',
        resume: '',
        date: '',
        employeeId: '',
    });

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { status } = await handleCreateSolicitude(formData);
        if (status === 200) {
            Swal.fire({
                title: "Creado exitosamente",
                text: "Solicitud creada exitosamente.",
                icon: "success"
            });
        }
        onCreate()
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
            <input
                name="description"
                placeholder="Descripción"
                value={formData.description}
                onChange={handleChange}
            />
            <input
                name="resume"
                placeholder="Resumen"
                value={formData.resume}
                onChange={handleChange}
            />
            <select
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
            >
                <option value="">Seleccione un empleado</option>
                {data.map(emp => (
                    <option key={emp.id} value={emp.id}>
                        {emp.name}
                    </option>
                ))}
            </select>

            <button type="submit">Crear Solicitud</button>
        </form>
    );
}

export default SolicitudeForm;
