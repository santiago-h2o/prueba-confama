// ColumnGroup.js
import style from '../tablePage.module.css';

export const createColumns = (
  customColumns,
  handleDelete,
  handleEdit,
  currentPage,
  rol
) => {
  const actionColumn = {
    id: 'actions',
    header: 'Acciones',
    cell: ({ row }) => (
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={() => handleEdit(row.original)}
          className={style['tablepage__edit-button']}
        >
          Editar
        </button>
        <button
          onClick={() => handleDelete(row.original.id)}
          className={style['tablepage__delete-button']}
        >
          Eliminar
        </button>

      </div>
    ),
  };

  return [...customColumns, actionColumn];
};
