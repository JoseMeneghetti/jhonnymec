export type Carros = {
  marca: string;
  modelo: string;
  ano: string;
  placa: string;
};
export type Nota = {
  nome: string;
  documento: string;
  email: string;
  telefone: string;
  cep: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
  id: string;
  clientId: string;
  data: string;
  marca: string;
  modelo: string;
  ano: string;
  placa: string;
  km: string;
  detalhes: string;
  valorServico: string;
  valorProduto: string;
  valorTotal: string;
  servicosPrestados: string;
  carros: Carros[];
};

export type OpenAlert = {
  open: boolean;
  condition: string;
};
