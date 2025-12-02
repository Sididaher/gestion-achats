import { supabase } from "@/lib/supabaseClient";
import { Produit } from "@/types/produit";

export type NewProduitInput = {
  nom: string;
  prix_unitaire: number;
  stock: number;
  fournisseur_id: number;
};

export async function getProduits(): Promise<Produit[]> {
  const { data, error } = await supabase
    .from("produits")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data as Produit[];
}

export async function createProduit(
  input: NewProduitInput
): Promise<Produit> {
  const { data, error } = await supabase
    .from("produits")
    .insert([input])
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data as Produit;
}

export async function updateProduit(
  id: number,
  input: Partial<NewProduitInput>
): Promise<Produit> {
  const { data, error } = await supabase
    .from("produits")
    .update(input)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data as Produit;
}

export async function deleteProduit(id: number): Promise<void> {
  const { error } = await supabase
    .from("produits")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }
}
