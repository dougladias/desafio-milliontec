export interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
}

export interface AddressData {
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  complement?: string;
  number?: string;
}

export interface AddressInputProps {
  onAddressChange: (address: AddressData) => void;
  initialAddress?: Partial<AddressData>;
  disabled?: boolean;
}
