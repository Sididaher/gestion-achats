"use client";

import { useState } from "react";
import {
  useFournisseurs,
  useCreateFournisseur,
  useDeleteFournisseur,
  useUpdateFournisseur,
} from "@/hooks/useFournisseurs";
import "@/styles/formStyles.css";

export default function FournisseursPage() {
  const { data, isLoading, error } = useFournisseurs();
  const createMutation = useCreateFournisseur();
  const deleteMutation = useDeleteFournisseur();
  const updateMutation = useUpdateFournisseur();

  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [adresse, setAdresse] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nom.trim()) return;

    const payload = {
      nom,
      email: email || null,
      telephone: telephone || null,
      adresse: adresse || null,
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
    setEmail("");
    setTelephone("");
    setAdresse("");
    setEditingId(null);
  };

  return (
    <div className="p-6 space-y-6">
      {/* <h1 className="text-2xl font-bold">Fournisseurs</h1> */}

      {/* Formulaire centré */}
      <div className="form-wrapper">
        <form onSubmit={handleSubmit} className="form-card">
          <h2 className="form-title">
            {editingId ? "Modifier un fournisseur" : "Ajouter un fournisseur"}
          </h2>

          <div className="form-group">
            <label className="form-label">Nom *</label>
            <input
              className="form-input"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="Nom du fournisseur"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemple@domaine.com"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Téléphone</label>
            <input
              className="form-input"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              placeholder="+222..."
            />
          </div>

          <div className="form-group">
            <label className="form-label">Adresse</label>
            <input
              className="form-input"
              value={adresse}
              onChange={(e) => setAdresse(e.target.value)}
              placeholder="Nouakchott..."
            />
          </div>

          <button
            className="form-button"
            type="submit"
            disabled={createMutation.isPending || updateMutation.isPending}
          >
            {editingId ? "Mettre à jour" : "Ajouter le fournisseur"}
          </button>
        </form>
      </div>

      {/* Erreur éventuelle */}
      {error && (
        <div className="text-red-600 text-sm space-y-1">
          <p>Erreur lors du chargement.</p>
          <pre className="whitespace-pre-wrap bg-red-50 p-2 rounded">
            {JSON.stringify(error, null, 2)}
          </pre>
        </div>
      )}

      {/* Tableau des fournisseurs */}
      <div>
        {isLoading && <p>Chargement...</p>}

        {!isLoading && data && data.length === 0 && (
          <p>Aucun fournisseur pour le moment.</p>
        )}

        {!isLoading && data && data.length > 0 && (
          <table className="w-full border-collapse text-sm mt-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-1 text-left">Nom</th>
                <th className="border px-2 py-1 text-left">Email</th>
                <th className="border px-2 py-1 text-left">Téléphone</th>
                <th className="border px-2 py-1 text-left">Adresse</th>
                <th className="border px-2 py-1 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data!.map((f) => (
                <tr key={f.id}>
                  <td className="border px-2 py-1">{f.nom}</td>
                  <td className="border px-2 py-1">{f.email ?? "-"}</td>
                  <td className="border px-2 py-1">{f.telephone ?? "-"}</td>
                  <td className="border px-2 py-1">{f.adresse ?? "-"}</td>
                  <td className="border px-2 py-1 space-x-2">
                    <button
                      onClick={() => {
                        setEditingId(f.id);
                        setNom(f.nom);
                        setEmail(f.email ?? "");
                        setTelephone(f.telephone ?? "");
                        setAdresse(f.adresse ?? "");
                      }}
                      className="text-xs text-blue-600"
                    >
                      Modifier
                    </button>

                    <button
                      onClick={() => deleteMutation.mutate(f.id)}
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
