import { useContext, useEffect, useState } from "react";

import SelectBrasil from "@logicamente.info/react-select-brasil";

import Loading from "../components/Loading";

import PageTitle from "../components/PageTitle";
import { MyContext } from "../MyContext";
import { apiGetSingleType } from "../services/apiService";
import ReactMarkdown from "react-markdown";

export default function Contact() {
  const { loading, setLoading } = useContext(MyContext);

  const [pageContent, setPageContent] = useState<any>([]);
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [ramoAtuacao, setRamoAtuacao] = useState("");
  const [outroRamo, setoutroRamo] = useState("");
  const [mostrarCampoOutro, setMostrarCampoOutro] = useState(false);

  const ramosAtuacao = [
    "AÇOUGUE",
    "ARTIGOS DE FESTA",
    "ATACADISTA",
    "BUFFET",
    "CAFETERIA",
    "CHURRASCARIA",
    "CLÍNICAS DE SAÚDE",
    "CONFEITARIA",
    "CONSTRUÇÃO CIVIL",
    "CONSUMIDOR FINAL",
    "COZINHA INDUSTRIAL",
    "DISTRIBUIDOR",
    "ESCRITÓRIO",
    "FÁBRICA",
    "HAMBURGUERIA/LANCHONETE",
    "HOSPITAIS",
    "HOTEL/MOTEL/POUSADA",
    "IGREJA",
    "INSTITUIÇÃO ESTADUAL",
    "MINEIRAÇÃO",
    "PADARIA",
    "PAPELARIAS",
    "PETSHOP",
    "PIZZARIA",
    "RESTAURANTE",
    "SACOLÃO",
    "SALÃO DE BELEZA/BARBEARIA",
    "SORVETERIA/AÇAITERIA",
    "SUPERMERCADO/MERCEARIAS",
    "TRANSPORTADORA",
    "OUTRO",
  ];

  useEffect(() => {
    setLoading(true);
    async function getPageContent() {
      try {
        const backEndPage = await apiGetSingleType("contato");

        setPageContent(backEndPage);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    getPageContent();
  });

  const handleRamoAtuacaoChange = (e: any) => {
    const selecionado = e.target.value;
    setRamoAtuacao(selecionado);
    setMostrarCampoOutro(selecionado === "OUTRO");
  };

  return (
    <section className="flex flex-col items-start bg-[#F5F5F5]">
      <div className="flex flex-col p-10 box-border items-center w-full">
        <div className="w-full max-w-5xl flex flex-col">
          <PageTitle>Contato</PageTitle>

          <div className="w-full flex flex-col p-10 m-0 bg-white shadow-xl">
            <form className="flex flex-col gap-5">
              <div className="flex flex-col w-full">
                <label className="text-sm text-gray-500">Nome</label>
                <input
                  className="border border-gray-200 p-2"
                  type="text"
                  name="clientName"
                  id="clientName"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-sm text-gray-500">E-mail</label>
                <input
                  className="border border-gray-200 p-2"
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-sm text-gray-500">Celular</label>
                <input
                  className="border border-gray-200 p-2"
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-sm text-gray-500">Estado</label>
                <SelectBrasil.Estados
                  value={estado}
                  onChange={(newValue) => {
                    if (newValue) setEstado(newValue.value);
                  }}
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-sm text-gray-500">Cidade</label>
                <SelectBrasil.Cidades
                  estado={estado}
                  value={cidade}
                  onChange={(newValue) => {
                    if (newValue) setCidade(newValue.value);
                  }}
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-sm text-gray-500">Ramo de Atuação</label>
                <select
                  className="border border-gray-200 p-2"
                  value={ramoAtuacao}
                  onChange={handleRamoAtuacaoChange}
                >
                  <option value="">Selecione</option>
                  {ramosAtuacao.map((ramo) => (
                    <option key={ramo} value={ramo}>
                      {ramo}
                    </option>
                  ))}
                </select>
                {mostrarCampoOutro && (
                  <input
                    className="border border-gray-200 p-2 mt-2"
                    type="text"
                    placeholder="Informe o ramo de atuação"
                    onChange={(e) => setoutroRamo(e.target.value)}
                  />
                )}
              </div>
              <div className="flex flex-col w-full">
                <label className="text-sm text-gray-500">Mensagem</label>
                <textarea
                  className="border border-gray-200 p-2"
                  name="message"
                  id="message"
                  cols={30}
                  rows={8}
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                ></textarea>
              </div>
              <div className="flex flex-col w-full">
                <button
                  className="bg-blue-one text-white font-bold text-lg p-2 rounded-md"
                  type="submit"
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
