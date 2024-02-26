import React from 'react';

interface IPagination {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<IPagination> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const renderPaginationButtons = () => {
    let buttons = [];
    let startPage: number;
    let endPage: number;

    // Sempre mostrar o botão da primeira página
    buttons.push(
      <button
        key={1}
        onClick={() => onPageChange(1)}
        className={`pagination-button px-2 py-1 hover:bg-blue-one hover:text-white ${
          currentPage === 1 ? 'active text-white bg-blue-one' : 'text-gray-800'
        }`}
      >
        1
      </button>
    );

    if (totalPages <= 10) {
      startPage = 2; // Inicia do 2, pois o 1 já está sendo exibido
      endPage = totalPages - 1; // Vai até o penúltimo, pois o último será adicionado separadamente
    } else {
      if (currentPage <= 6) {
        startPage = 2;
        endPage = Math.min(9, totalPages - 1);
      } else if (currentPage + 4 >= totalPages) {
        startPage = Math.max(totalPages - 8, 2);
        endPage = totalPages - 1;
      } else {
        startPage = currentPage - 4;
        endPage = currentPage + 3;
      }
    }

    // Indicador de omissão após o botão "1", se necessário
    if (startPage > 2) {
      buttons.push(
        <span key="start-ellipsis" className="px-2 py-1">
          ...
        </span>
      );
    }

    // Botões do meio
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`pagination-button px-2 py-1 hover:bg-blue-one hover:text-white ${
            i === currentPage
              ? 'active text-white bg-blue-one'
              : 'text-gray-800'
          }`}
        >
          {i}
        </button>
      );
    }

    // Indicador de omissão antes do último botão, se necessário
    if (endPage < totalPages - 1) {
      buttons.push(
        <span key="end-ellipsis" className="px-2 py-1">
          ...
        </span>
      );
    }

    // Sempre mostrar o botão da última página
    if (totalPages > 1) {
      // Apenas se houver mais de uma página
      buttons.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className={`pagination-button px-2 py-1 hover:bg-blue-one hover:text-white ${
            currentPage === totalPages
              ? 'active text-white bg-blue-one'
              : 'text-gray-800'
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="pagination-container flex w-full justify-center p-10 flex-wrap">
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="pagination-prev mr-2"
        >
          Anterior
        </button>
      )}
      {renderPaginationButtons()}
      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="pagination-next ml-2"
        >
          Próximo
        </button>
      )}
    </div>
  );
};

export default Pagination;
