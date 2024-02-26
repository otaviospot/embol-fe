import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Slide } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';

import './App.css';

import {
  apiGetAllProducts,
  apiGetAllCategories,
  apiFilterProductsByCategory,
  apiCreateQuotation,
  apiSeachProds,
} from './services/apiService';

import Header from './components/Header';
import Home from './pages/Home';
import Products from './pages/Products';
import { MyContext } from './MyContext';
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollTop';
import Search from './pages/Search';
import Page from './pages/Page';
import Contact from './pages/Contact';

function App() {
  const [allProducts, setAllProducts] = useState<any>({});
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1); // Estado para a página atual
  const [cartProds, setCartProds] = useState<any>([]);
  const [searchResults, setSearchResults] = useState<any>([]);
  const [searchResultsPage, setSearchResultsPage] = useState<any>([]);
  const [allCategories, setAllCategories] = useState<any>({});
  const [openCart, setOpenCart] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchBoxLoading, setSearchBoxLoading] = useState<boolean>(true);
  const [isCatOpen, setIsCatOpen] = useState(false);

  const realBr = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const FILES_URL =
    process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_FILES_URL_PROD
      : process.env.REACT_APP_FILES_URL_DEV;

  const handleCatOpen = () => {
    setIsCatOpen(!isCatOpen);
  };

  /* Quantity per page option */

  const qtyPerPage = 20;

  /* Toastify Options */

  const toastOptions: object = {
    position: 'top-right',
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    transition: Slide,
    progress: undefined,
    theme: 'light',
  };

  const toastOptionsQuotationSuccess: object = {
    position: 'top-right',
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    transition: Slide,
    progress: undefined,
    theme: 'light',
  };

  /* Fetch Back End Products Data */

  /* Fetch Local Storage Cart Products Data */

  useEffect(() => {
    async function getLocalStorage() {
      const localStorageKeys = Object.keys(localStorage);
      if (localStorageKeys.length > 0) {
        const localStorageValues = localStorageKeys.map((key) =>
          JSON.parse(localStorage.getItem(key)!)
        );
        setCartProds(localStorageValues);
        setLoading(false);
      }
    }
    getLocalStorage();
  }, []);

  /* Fetch Back End Categories Data */
  useEffect(() => {
    async function getAllCategories() {
      try {
        const backEndAllCategories = await apiGetAllCategories();

        setAllCategories(backEndAllCategories);
      } catch (error) {
        console.log(error);
      }
    }

    getAllCategories();
  }, []);

  /* Function for filtering products by category */
  async function handleFilterProductsByCategories(categoryId: string) {
    setLoading(true);
    try {
      const backEndProductsFilteredByCategory =
        await apiFilterProductsByCategory(categoryId);

      setAllProducts(backEndProductsFilteredByCategory);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleCreateQuotation = async (
    clientName: string,
    email: string,
    stringCartProds: string,
    onSuccess: () => void
  ) => {
    const dataQuotation = {
      nome: clientName,
      email,
      cotacao_info: stringCartProds,
    };

    try {
      const newQuotation = await apiCreateQuotation(dataQuotation);
      console.log('Cotação criada com sucesso:', newQuotation);
      toast.success(
        'Cotação enviada com sucesso! Aguarde o contato de um de nossos vendedores',
        toastOptionsQuotationSuccess
      );
      clearCart(false);
      onSuccess();
    } catch (error: any) {
      console.error(
        'Erro ao criar cotação:',
        error.response?.data || error.message
      );
    }
  };

  /* Function for showing all products when filtered */

  async function handleShowAllProducts(page: number, limit: number) {
    setLoading(true);
    try {
      const backEndAllProducts = await apiGetAllProducts(page, limit);

      setAllProducts(backEndAllProducts);
      setTotalProducts(backEndAllProducts.meta.pagination.total);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  /* Function for adding products to cart */

  const handleAddToCart = (id: any) => {
    const product = allProducts.data.find((prod: any) => prod.id === id);
    const storageProd = localStorage.getItem(id);
    if (storageProd) {
      toast.warn('Produto já adicionado ao carrinho', toastOptions);
    } else {
      setCartProds([...cartProds, product]);
      localStorage.setItem(id, JSON.stringify(product));
      toast.success('Produto adicionado com sucesso', toastOptions);
    }
  };

  /* Function for search products */

  const handleSearchProducts = async (
    query: string,
    isPage: boolean,
    page: number,
    limit: number
  ) => {
    // setLoading(true);
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    try {
      const backEndQueryProducts = await apiSeachProds(query, page, limit);

      isPage
        ? setSearchResultsPage(backEndQueryProducts)
        : setSearchResults(backEndQueryProducts);
      setTotalProducts(backEndQueryProducts.meta.pagination.total);
      setLoading(false);
      setSearchBoxLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  /* Function for removing products from cart */

  const handleRemoveFromCart = (id: any) => {
    const updatedCart = cartProds.filter((prod: any) => prod.id !== id);
    setCartProds([...updatedCart]);
    localStorage.removeItem(id);
    toast.success('Produto removido com sucesso', toastOptions);
  };

  /* Function for clearing cart */

  const clearCart = (hasToast: boolean = true) => {
    localStorage.clear();
    setCartProds([]);
    if (hasToast) {
      toast.success('Carrinho limpo com sucesso', toastOptions);
    }
  };

  /* Function for opening cart */

  const handleOpenCart = () => {
    setOpenCart(!openCart);
  };

  return (
    <main className={`md:pt-20 ${isCatOpen ? 'overflow-hidden ' : ''} `}>
      <MyContext.Provider
        value={{
          FILES_URL,
          allProducts,
          setAllProducts,
          allCategories,
          setAllCategories,
          cartProds,
          setCartProds,
          handleShowAllProducts,
          totalProducts,
          setTotalProducts,
          handleAddToCart,
          handleRemoveFromCart,
          handleFilterProductsByCategories,
          handleCreateQuotation,
          clearCart,
          handleOpenCart,
          setOpenCart,
          openCart,
          realBr,
          loading,
          setLoading,
          searchBoxLoading,
          setSearchBoxLoading,
          searchResults,
          setSearchResults,
          handleSearchProducts,
          setSearchResultsPage,
          searchResultsPage,
          qtyPerPage,
          currentPage,
          setCurrentPage,
          isCatOpen,
          setIsCatOpen,
          handleCatOpen,
        }}
      >
        <ToastContainer />
        <Router basename="/embol">
          <ScrollToTop />
          <Header />
          <Routes>
            <Route path="/products/:productId" element={<SingleProduct />} />
            <Route path="/products" element={<Products />} />
            <Route path="/categories/:catId" element={<Products />} />
            <Route path="/quem-somos" element={<Page pageId={`quemsomos`} />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/search" element={<Search />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/" element={<Home />} />
          </Routes>
          <Footer />
        </Router>
      </MyContext.Provider>
    </main>
  );
}

export default App;
