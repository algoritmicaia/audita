import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '../IconButton/IconButton';
import ConfirmModal from '../ConfirmModal/ConfirmModal';

const Table = ({
  data = [],
  headers,                    // ['nombre', 'email']  opcional
  detailRoute,    // string o (row) => string
  editRoute,        // string o (row) => string
  deleteRoute,        // string o (row) => string
  getRowId = (row, i) => row.id ?? i,
}) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setId] = useState(null);

  const handleOpenModal = (id) => {
    setId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setId(null);
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    console.log('Eliminando item con id:', selectedId);
    // Aquí podrías hacer fetch a tu API para eliminar el usuario
    handleCloseModal();
  };

  const navigate = useNavigate();

  // Derivar headers automáticamente si no vienen
  const autoHeaders = headers ?? (data[0] ? Object.keys(data[0]) : []);
  const colCount = autoHeaders.length + 1; // +1 por columna de acciones

  // Navegación por fila
  const goToDetail = (id) => {
    if (!detailRoute) return;
    const to = `${detailRoute}/${id}`;
    navigate(to);
  };

  // Render acciones por defecto (editar como Link + eliminar como acción)
  const defaultActions = (row, i) => (
    <div
      className="flex items-center space-x-3"
      onClick={(e) => e.stopPropagation()}
    >
      <IconButton
        icon="edit"
        to={`${editRoute}/${row.id}`}
        aria-label={`Editar ${row?.nombre ?? ''}`}
      />
      <IconButton
        icon="delete"
        onClick={() => handleOpenModal(row.id)}
        aria-label={`Eliminar ${row?.nombre ?? ''}`}
      />
    </div>
  );

  if (!data.length) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          {autoHeaders.length > 0 && (
            <thead className="bg-gray-50">
              <tr>
                {autoHeaders.map((h, idx) => (
                  <th key={idx} className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    {h}
                  </th>
                ))}
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Acciones
                </th>
              </tr>
            </thead>
          )}
          <tbody>
            <tr>
              <td className="px-6 py-12 text-center text-gray-500" colSpan={Math.max(colCount, 1)}>
                No hay datos para mostrar
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            {autoHeaders.map((header, idx) => (
              <th key={idx} className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                {header}
              </th>
            ))}
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
              Acciones
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {data.map((row, i) => {
            const rowKey = getRowId(row, i);
            return (
              <tr
                key={rowKey}
                className="hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                onClick={() => goToDetail(row.id)}
                role="button"
                tabIndex={0}
                aria-label={`Ver detalle de ${row?.nombre ?? `fila ${i + 1}`}`}
              >
                {autoHeaders.map((key, j) => (
                  <td key={j} className="px-6 py-4 text-sm text-gray-900">
                    {row[key]}
                  </td>
                ))}
                <td className="px-6 py-4">
                  {defaultActions(row, i)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Modal de confirmación */}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        message="¿Estás seguro de que quieres eliminar este usuario?"
      />

    </div>
  );
};

export default Table;
