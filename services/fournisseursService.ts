import { supabase } from "@/lib/supabaseClient";
import { Fournisseur } from "@/types/fournisseur";

export type NewFournisseurInput = {
  nom: string;
  email: string | null;
  telephone: string | null;
  adresse: string | null;
};

export async function getFournisseurs(): Promise<Fournisseur[]> {
  const { data, error } = await supabase
    .from("fournisseurs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data as Fournisseur[];
}

export async function createFournisseur(
  input: NewFournisseurInput
): Promise<Fournisseur> {
  const { data, error } = await supabase
    .from("fournisseurs")
    .insert([input])
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data as Fournisseur;
}

export async function updateFournisseur(
  id: number,
  input: Partial<NewFournisseurInput>
): Promise<Fournisseur> {
  const { data, error } = await supabase
    .from("fournisseurs")
    .update(input)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data as Fournisseur;
}

export async function deleteFournisseur(id: number): Promise<void> {
  const { error } = await supabase
    .from("fournisseurs")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }
}
