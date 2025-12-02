"use client";

import { useState, useMemo } from "react";
import {
  useProduits,
  useCreateProduit,
  useDeleteProduit,
  useUpdateProduit,
} from "@/hooks/useProduits";
import { useFournisseurs } from "@/hooks/useFournisseurs";
import "@/styles/formStyles.css";

export default function ProduitsPage() {
  const { data: produits, isLoading: isLoadingProduits, error } = useProduits();
  const {
    data: fournisseurs,
    isLoading: isLoadingFournisseurs,
  } = useFournisseurs();

  const createMutation = useCreateProduit();
  const deleteMutation = useDeleteProduit();
  const updateMutation = useUpdateProduit();

  const [nom, setNom] = useState("");
  const [prixUnitaire, setPrixUnitaire] = useState("");
  const [stock, setStock] = useState("");
  const [fournisseurId, setFournisseurId] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const fournisseurMap = useMemo(() => {
    if (!fournisseurs) return new Map<number, string>();
    return new Map(fournisseurs.map((f) => [f.id, f.nom]));
  }, [fournisseurs]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const prix = Number(prixUnitaire);
    const stockValue = Number(stock);
    const fournisseurIdValue = Number(fournisseurId);

    if (!nom.trim()) return;
    if (isNaN(prix) || isNaN(stockValue) || isNaN(fournisseurIdValue)) return;

    const payload = {
      nom,
      prix_unitaire: prix,
      stock: stockValue,
      fournisseur_id: fournisseurIdValue,
    };

    if (editingId === null) {
      // AJOUT
      createMutation.mutate(payload);
    } else {
      // MISE À JOUR
      updateMutation.mutate({
        id: editingId,
        input: payload,
      });
    }

    setNom("");
    setPrixUnitaire("");
    setStock("");
    setFournisseurId("");
    setEditingId(null);
  };

  return (
    <div className="p-6 space-y-6">
      {/* <h1 className="text-2xl font-bold">Produits</h1> */}

      {/* Formulaire centré */}
      <div className="form-wrapper">
        <form onSubmit={handleSubmit} className="form-card">
          <h2 className="form-title">
            {editingId ? "Modifier un produit" : "Ajouter un produit"}
          </h2>

          <div className="form-group">
            <label className="form-label">Nom *</label>
            <input
              className="form-input"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="Nom du produit (ex : Riz 25kg)"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Prix unitaire *</label>
            <input
              type="number"
              className="form-input"
              value={prixUnitaire}
              onChange={(e) => setPrixUnitaire(e.target.value)}
              placeholder="1200"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Stock *</label>
            <input
              type="number"
              className="form-input"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="50"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Fournisseur *</label>
            <select
              className="form-select"
              value={fournisseurId}
              onChange={(e) => setFournisseurId(e.target.value)}
            >
              <option value="">Sélectionner un fournisseur</option>
              {fournisseurs?.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.nom}
                </option>
              ))}
            </select>
          </div>

          <button
            className="form-button"
            type="submit"
            disabled={createMutation.isPending || updateMutation.isPending}
          >
            {editingId ? "Mettre à jour" : "Ajouter le produit"}
          </button>
        </form>
      </div>

      {/* Erreurs */}
      {(isLoadingProduits || isLoadingFournisseurs) && <p>Chargement...</p>}
      {error && (
        <div className="text-red-600 text-sm space-y-1">
          <p>Erreur lors du chargement.</p>
          <pre className="whitespace-pre-wrap bg-red-50 p-2 rounded">
            {JSON.stringify(error, null, 2)}
          </pre>
        </div>
      )}

      {/* Tableau des produits */}
      <div>
        {!isLoadingProduits && produits && produits.length === 0 && (
          <p>Aucun produit pour le moment.</p>
        )}

        {!isLoadingProduits && produits && produits.length > 0 && (
          <table className="w-full border-collapse text-sm mt-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-1 text-left">Nom</th>
                <th className="border px-2 py-1 text-left">Prix unitaire</th>
                <th className="border px-2 py-1 text-left">Stock</th>
                <th className="border px-2 py-1 text-left">Fournisseur</th>
                <th className="border px-2 py-1 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {produits!.map((p) => (
                <tr key={p.id}>
                  <td className="border px-2 py-1">{p.nom}</td>
                  <td className="border px-2 py-1">{p.prix_unitaire}</td>
                  <td className="border px-2 py-1">{p.stock}</td>
                  <td className="border px-2 py-1">
                    {fournisseurMap.get(p.fournisseur_id) ??
                      `#${p.fournisseur_id}`}
                  </td>
                  <td className="border px-2 py-1 space-x-2">
                    <button
                      onClick={() => {
                        setEditingId(p.id);
                        setNom(p.nom);
                        setPrixUnitaire(String(p.prix_unitaire));
                        setStock(String(p.stock));
                        setFournisseurId(String(p.fournisseur_id));
                      }}
                      className="text-xs text-blue-600"
                    >
                      Modifier
                    </button>

                    <button
                      onClick={() => deleteMutation.mutate(p.id)}
                      disabled={deleteMutation.isPending}
                      className="text-xs text-red-600"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
