"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProduits,
  createProduit,
  updateProduit,
  deleteProduit,
  NewProduitInput,
} from "@/services/produitsService";
import { Produit } from "@/types/produit";

const PRODUITS_KEY = ["produits"];

export function useProduits() {
  return useQuery<Produit[]>({
    queryKey: PRODUITS_KEY,
    queryFn: () => getProduits(),
  });
}

export function useCreateProduit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: NewProduitInput) => createProduit(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUITS_KEY });
    },
  });
}

export function useUpdateProduit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { id: number; input: Partial<NewProduitInput> }) =>
      updateProduit(params.id, params.input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUITS_KEY });
    },
  });
}

export function useDeleteProduit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteProduit(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUITS_KEY });
    },
  });
}
