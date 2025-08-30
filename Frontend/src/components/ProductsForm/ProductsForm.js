import { useState } from 'react';
import { handleCreateProduct, handleUpdateProduct } from '../../actions/products/products';
import Swal from 'sweetalert2'

function ProductsForm({ onClose, onCreate, edit, editData }) {
    const [formData, setFormData] = useState(editData?editData:{
        name: '',
        description: '',
        price: '',
        category: ''
    });

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { status } = await edit ? handleUpdateProduct(formData) : handleCreateProduct(formData);
        if (status === 200) {
            Swal.fire({
                title: "Creado exitosamente",
                text: "Producto creado exitosamente.",
                icon: "success"
            });
        }
        onCreate()
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
            <input name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} />
            <input name="description" placeholder="Descripcion" value={formData.description} onChange={handleChange} />
            <input name="price" placeholder="Precio" value={formData.price} onChange={handleChange} />
            <input name="category" placeholder="Categoria" value={formData.category} onChange={handleChange} />
            <button type="submit">{edit ? "Editar Producto" : "Crear Producto"}</button>
        </form>
    );
}

export default ProductsForm;
