import IconComponent from './IconComponent';
import SearchProductItem from './SearchProductItem';
import { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MyContext } from '../MyContext';

import { BarLoader } from 'react-spinners';

export default function SeachBox() {
  const {
    handleSearchProducts,
    searchResults,
    setSearchResults,
    setLoading,
    searchBoxLoading,
    setSearchBoxLoading,
    currentPage,
    qtyPerPage,
  } = useContext(MyContext);

  const navigate = useNavigate();

  const { pathname } = useLocation();

  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = async (e: any) => {
    const newValue = e.target.value;
    setSearchQuery(newValue);
    setSearchBoxLoading(true);

    if (newValue.trim() !== '' && newValue.trim().length >= 3) {
      await handleSearchProducts(searchQuery, false, currentPage, qtyPerPage);
    } else {
      handleSearchProducts('', false);
      setSearchResults([]); // Limpar resultados se o campo estiver vazio
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault(); // Prevenir recarregamento da página
    setLoading(true);
    if (searchQuery.trim()) {
      pathname !== '/search' && navigate(`/search`);
      await handleSearchProducts(searchQuery, true);
    }
  };

  return (
    <div className="group w-1/4 relative hidden md:flex">
      <form
        className="flex flex-row items-center justify-center relative w-full"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Pesquisar"
          className="w-full text-[#8C8C8C] bg-[#E7E7E7] p-2.5"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="bg-[transparent] max-w-[20px] text-[#8C8C8C] absolute right-2.5"
        >
          <IconComponent icon={'BiSearch'} />
        </button>
      </form>
      {searchResults &&
        searchQuery.trim() !== '' &&
        searchResults.data?.length > 0 && (
          <div className="absolute shadow-xl w-full flex flex-col top-[100%] max-h-[90vh] bg-white opacity-0 h-0 group-focus-within:h-auto -z-10  group-focus-within:opacity-100 group-focus-within:z-10">
            <div className="flex flex-col gap-0 overflow-y-auto w-full p-2.5 flex-1">
              {!searchBoxLoading ? (
                searchResults.data
                  ?.slice(0, 10)
                  .map((product: any) => (
                    <SearchProductItem
                      key={product.id}
                      id={product.id}
                      name={product.attributes.name_product}
                      image={
                        product.attributes.default_image.data?.attributes
                          .formats.thumbnail.url
                      }
                    />
                  ))
              ) : (
                <div className="flex items-center justify-center p-5 pb-14 gap-2.5 flex-auto">
                  <BarLoader loading={searchBoxLoading} color="#ef4444" />
                </div>
              )}
            </div>
            {searchResults.data?.length > 10 && (
              <button
                onClick={handleSubmit}
                className="relative flex-0-auto flex justify-center items-center text-white hover:text-blue-one h-[40px] bottom-0 left-0 z-10 w-full bg-blue-one hover:bg-blue-two"
              >
                Veja todos os produtos
              </button>
            )}
          </div>
        )}
    </div>
  );
}
