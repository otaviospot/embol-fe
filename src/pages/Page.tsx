import style from '../components/page-style.module.css';

import { useContext, useEffect, useState } from 'react';

import Loading from '../components/Loading';

import PageTitle from '../components/PageTitle';
import { MyContext } from '../MyContext';
import { apiGetSingleType } from '../services/apiService';
import ReactMarkdown from 'react-markdown';

export default function Page({ pageId }: any) {
  const { loading, setLoading, FILES_URL } = useContext(MyContext);

  const [pageContent, setPageContent] = useState<any>([]);

  /* Fetch Back End Single Type */

  useEffect(() => {
    setLoading(true);
    async function getPageContent() {
      try {
        const backEndPage = await apiGetSingleType(pageId);

        setPageContent(backEndPage);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    getPageContent();
  }, [pageId]);

  return (
    <section className="flex flex-col items-start bg-[#F5F5F5]">
      <div className="h-96 bg-gray-500 w-full overflow-hidden flex justify-center items-center">
        {!loading ? (
          <img
            className="object-cover w-full"
            alt="Top"
            src={`${FILES_URL}${pageContent.data?.attributes.default_image.data?.attributes.url}`}
          ></img>
        ) : (
          <Loading loading={loading} />
        )}
      </div>

      <div className="flex flex-col p-10 box-border items-center w-full">
        <div className="w-full max-w-5xl flex flex-col">
          <PageTitle>Quem Somos</PageTitle>

          <div className="w-full flex flex-col p-10 m-0 mb-[40px] bg-white shadow-xl rounded-3xl">
            {!loading ? (
              <ReactMarkdown className={style.reactMarkDown}>
                {pageContent.data?.attributes.texto2}
              </ReactMarkdown>
            ) : (
              <Loading loading={loading} />
            )}
          </div>
          <h2 className="text-[30px] mb-5 text-blue-one m-0 font-bold">
            Lojas embol
          </h2>
          <div className="w-full flex flex-row flex-wrap mb-[40px]">
            {!loading ? (
              pageContent.data?.attributes?.lojas_embol.map((loja: any) => (
                <div key={loja.id} className="w-1/2 md:w-1/4 p-2.5">
                  <div className="w-full group h-full border border-gray rounded-xl bg-white hover:bg-blue-one p-4 flex">
                    <a
                      className="w-full h-full flex flex-col justify-center text-center"
                      href={loja.link}
                    >
                      <span className="text-blue-one group-hover:text-white">
                        <strong>{loja.endereco}</strong>
                      </span>
                      <span className="group-hover:text-white">
                        {loja.cidade_estado}
                      </span>
                      <span className="group-hover:text-white">
                        {loja.telefone}
                      </span>
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <Loading loading={loading} />
            )}
          </div>
          <h2 className="text-[30px] mb-5 text-blue-one m-0 font-bold">
            Lojas Embol Mais
          </h2>
          <div className="w-full flex flex-row flex-wrap mb-[40px]">
            {!loading ? (
              pageContent.data?.attributes?.lojas_embol_mais.map(
                (loja: any) => (
                  <div key={loja.id} className="w-1/2 md:w-1/4 p-2.5">
                    <div className="w-full group h-full border border-gray rounded-xl bg-white hover:bg-blue-one p-4 flex">
                      <a
                        className="w-full h-full flex flex-col justify-center text-center"
                        href={loja.link}
                      >
                        <span className="text-blue-one group-hover:text-white">
                          <strong>{loja.endereco}</strong>
                        </span>
                        <span className="group-hover:text-white">
                          {loja.cidade_estado}
                        </span>
                        <span className="group-hover:text-white">
                          {loja.telefone}
                        </span>
                      </a>
                    </div>
                  </div>
                )
              )
            ) : (
              <Loading loading={loading} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
