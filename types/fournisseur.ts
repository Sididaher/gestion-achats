export interface Fournisseur {
  id: number;
  nom: string;
  email: string | null;
  telephone: string | null;
  adresse: string | null;
  created_at: string;
}
