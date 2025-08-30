import React, { useState, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';

import style from './tablePage.module.css';
import { createColumns } from './globalColumn/GlobalColumn';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const DataTable = ({ data, columns, handleDelete, handleEdit, title, currentPage }) => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [pagination, setPagination] = useState({
    pageIndex: currentPage,
    pageSize: 5,
  });
  const [loading, setLoading] = useState(true);

  // 🔥 Reemplazo de useContext(LoginContext)
  const { infoUser } = useSelector((state) => state.auth);

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: currentPage,
    }));

    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 3000);

    if (data && data.length > 0) {
      setLoading(false);
      clearTimeout(timeoutId);
    }

    return () => clearTimeout(timeoutId);
  }, [data, currentPage]);

  const table = useReactTable({
    data,
    columns: createColumns(columns, handleDelete, handleEdit, pagination.pageIndex, infoUser?.rol),
    state: {
      globalFilter,
      pagination,
    },
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className={style['tablepage__section']}>
      <h2 className={style['tablepage__title']}>{title}</h2>

      {loading ? (
        <div className={style['tablepage__loader']}>
          {/* <Loader /> */}
        </div>
      ) : (
        <>
          <input
            type="text"
            placeholder="Buscar..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className={style['tablepage__search-input']}
          />

          <div className={style['tablepage__container']}>
            <table className={style['tablepage__table']}>
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className={style['tablepage__header']}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className={style['tablepage__row']}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className={style['tablepage__cell']}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={style['tablepage__pagination']}>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className={style['tablepage__edit-button']}
            >
              <FaAngleDoubleLeft />
              Anterior
            </button>

            <span className={style['tablepage__pagination__text']}>
              Página{' '}
              <strong>
                {pagination.pageIndex + 1} de {table.getPageCount()}
              </strong>
            </span>

            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className={style['tablepage__edit-button']}
            >
              Siguiente
              <FaAngleDoubleRight />
            </button>

            <select
              className={style['tablepage__select__filter']}
              value={pagination.pageSize}
              onChange={(e) => {
                const newSize = Number(e.target.value);
                table.setPageSize(newSize);
              }}
            >
              {[5, 10, 20].map((size) => (
                <option key={size} value={size}>
                  Mostrar {size}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
    </div>
  );
};

export default DataTable;
