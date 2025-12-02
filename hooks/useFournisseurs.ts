"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getFournisseurs,
  createFournisseur,
  updateFournisseur,
  deleteFournisseur,
  NewFournisseurInput,
} from "@/services/fournisseursService";
import { Fournisseur } from "@/types/fournisseur";

const FOURNISSEURS_KEY = ["fournisseurs"];

export function useFournisseurs() {
  return useQuery<Fournisseur[]>({
    queryKey: FOURNISSEURS_KEY,
    queryFn: () => getFournisseurs(),
  });
}

export function useCreateFournisseur() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: NewFournisseurInput) => createFournisseur(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FOURNISSEURS_KEY });
    },
  });
}

export function useUpdateFournisseur() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { id: number; input: Partial<NewFournisseurInput> }) =>
      updateFournisseur(params.id, params.input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FOURNISSEURS_KEY });
    },
  });
}

export function useDeleteFournisseur() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteFournisseur(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FOURNISSEURS_KEY });
    },
  });
}
