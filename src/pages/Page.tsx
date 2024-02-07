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

          <div className="w-full flex flex-col p-10 m-0 bg-white shadow-xl">
            {!loading ? (
              <ReactMarkdown className={style.reactMarkDown}>
                {pageContent.data?.attributes.texto2}
              </ReactMarkdown>
            ) : (
              <Loading loading={loading} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
