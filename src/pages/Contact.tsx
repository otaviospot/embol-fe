import { useContext, useEffect, useState, ChangeEvent } from "react";

import SelectBrasil from "@logicamente.info/react-select-brasil";

import Loading from "../components/Loading";

import PageTitle from "../components/PageTitle";
import { MyContext } from "../MyContext";
import { apiGetSingleType } from "../services/apiService";
import ReactMarkdown from "react-markdown";

// Função de máscara para CPF e CNPJ
const maskCpfCnpj = (value: string) => {
  if (value.length <= 14) {
    // CPF
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  } else {
    // CNPJ
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  }
};

// Função de máscara para Telefone
const maskTelefone = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{4,5})(\d{4,5})/, "$1-$2")
    .replace(/(-\d{4})\d+?$/, "$1");
};

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
  const [tipoPessoa, setTipoPessoa] = useState(""); // 'PF' para pessoa física, 'PJ' para pessoa jurídica
  const [cnpjCpf, setCnpjCpf] = useState("");
  const [telefone, setTelefone] = useState("");

  const ramosAtuacao = [
    "Açougue",
    "Artigos de festa",
    "Atacadista",
    "Buffet",
    "Cafeteria",
    "Churrascaria",
    "Clínicas de saúde",
    "Confeitaria",
    "Construção civil",
    "Consumidor final",
    "Cozinha industrial",
    "Distribuidor",
    "Escritório",
    "Fábrica",
    "Hamburgueria/lanchonete",
    "Hospitais",
    "Hotel/motel/pousada",
    "Igreja",
    "Instituição estadual",
    "Mineiração",
    "Padaria",
    "Papelarias",
    "Petshop",
    "Pizzaria",
    "Restaurante",
    "Sacolão",
    "Salão de beleza/barbearia",
    "Sorveteria/açaiteria",
    "Supermercado/mercearias",
    "Transportadora",
    "Outro",
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
    setMostrarCampoOutro(selecionado === "Outro");
  };

  // Handler para o telefone com máscara
  const handleTelefoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTelefone(maskTelefone(e.target.value));
  };

  // Handler modificado para CPF/CNPJ com máscara
  const handleCnpjCpfChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCnpjCpf(maskCpfCnpj(e.target.value));
  };

  return (
    <section className="flex flex-col items-start bg-[#F5F5F5]">
      <div className="flex flex-col p-5 md:p-10 box-border items-center w-full">
        <div className="w-full max-w-5xl flex flex-col">
          <PageTitle>Contato</PageTitle>

          <div className="w-full flex flex-col p-5 md:p-10 m-0 bg-white shadow-xl rounded-3xl">
            <form className="flex flex-col gap-[30px]">
              <div className="flex flex-col w-full">
                <label className="text-sm text-gray-500 mb-[5px]">Nome</label>
                <input
                  className="border border-gray-200 px-5 py-[10px] rounded-md"
                  type="text"
                  name="clientName"
                  id="clientName"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-sm text-gray-500 mb-[5px]">E-mail</label>
                <input
                  className="border border-gray-200 px-5 py-[10px] rounded-md"
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-sm text-gray-500 mb-[5px]">
                  Celular
                </label>
                <input
                  className="border border-gray-200 px-5 py-[10px] rounded-md"
                  type="tel"
                  name="tel"
                  id="tel"
                  value={telefone}
                  onChange={handleTelefoneChange}
                  required
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-sm text-gray-500 mb-[5px]">Estado</label>
                <SelectBrasil.Estados
                  value={estado}
                  onChange={(newValue) => {
                    if (newValue) setEstado(newValue.value);
                  }}
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-sm text-gray-500 mb-[5px]">Cidade</label>
                <SelectBrasil.Cidades
                  estado={estado}
                  value={cidade}
                  onChange={(newValue) => {
                    if (newValue) setCidade(newValue.value);
                  }}
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-sm text-gray-500 mb-[5px]">
                  Pessoa Física ou Jurídica
                </label>
                <select
                  className="border border-gray-200 px-5 py-[10px] rounded-md"
                  value={tipoPessoa}
                  onChange={(e) => setTipoPessoa(e.target.value)}
                  required
                >
                  <option value="">Selecione</option>
                  <option value="PF">Pessoa Física</option>
                  <option value="PJ">Pessoa Jurídica</option>
                </select>
              </div>

              {tipoPessoa && (
                <div className="flex flex-col w-full">
                  <label className="text-sm text-gray-500 mb-[5px]">
                    {tipoPessoa === "PF" ? "CPF" : "CNPJ"}
                  </label>
                  <input
                    className="border border-gray-200 px-5 py-[10px] rounded-md"
                    type="text"
                    placeholder={
                      tipoPessoa === "PF" ? "Digite seu CPF" : "Digite seu CNPJ"
                    }
                    value={cnpjCpf}
                    onChange={handleCnpjCpfChange}
                    required
                  />
                </div>
              )}
              <div className="flex flex-col w-full">
                <label className="text-sm text-gray-500 mb-[5px]">
                  Ramo de Atuação
                </label>
                <select
                  className="border border-gray-200 px-5 py-[10px] rounded-md"
                  value={ramoAtuacao}
                  onChange={handleRamoAtuacaoChange}
                  required
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
                    className="border border-gray-200 px-5 py-[10px] mt-2 rounded-md"
                    type="text"
                    placeholder="Informe o ramo de atuação"
                    onChange={(e) => setoutroRamo(e.target.value)}
                    required
                  />
                )}
              </div>
              <div className="flex flex-col w-full">
                <label className="text-sm text-gray-500 mb-[5px]">
                  Motivo do contato
                </label>
                <textarea
                  className="border border-gray-200 px-5 py-[10px] rounded-md"
                  name="message"
                  id="message"
                  cols={30}
                  rows={8}
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  required
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
