import React from "react";

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
  // Função para criar os botões de paginação
  const renderPaginationButtons = () => {
    let buttons = [];

    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`pagination-button px-2 py-1 hover:bg-blue-one hover:text-white ${
            i === currentPage
              ? "active text-white bg-blue-one"
              : "text-gray-800"
          }`}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="pagination-container flex w-full justify-center py-10">
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="pagination-prev"
        >
          Anterior
        </button>
      )}
      {renderPaginationButtons()}
      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="pagination-next"
        >
          Próximo
        </button>
      )}
    </div>
  );
};

export default Pagination;
