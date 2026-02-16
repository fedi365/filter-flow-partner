# Documentation technique du projet

## 1) Contexte Métier (Business)

### Vision du Projet

Cette plateforme est une **vitrine numérique B2B** (Business to Business) destinée à une entreprise spécialisée dans les **solutions de filtration** (traitement de l'eau, charbon actif, etc.).

### Objectifs Principaux

1.  **Génération de Leads** : L'objectif n'est pas la vente directe (e-commerce), mais de convaincre les visiteurs professionnels de demander un **devis**.
2.  **Expertise Technique** : Présenter un catalogue détaillé (performances, applications) pour rassurer sur la qualité technique.
3.  **Support Client** : Offrir des guides et des ressources pour aider les partenaires et clients.

### Glossaire Métier (Français - Anglais - Arabe)

| Français                | Anglais          | Arabe (العربية)         | Contexte                                         |
| :---------------------- | :--------------- | :---------------------- | :----------------------------------------------- |
| **Filtration**          | Filtration       | **ترشيح / تصفية**       | Cœur de métier de l'entreprise.                  |
| **Traitement des eaux** | Water Treatment  | **معالجة المياه**       | Domaine d'application principal.                 |
| **Charbon Actif**       | Activated Carbon | **كربون نشط / فحم نشط** | Produit phare souvent mentionné (GAC).           |
| **Devis**               | Quote / Estimate | **عرض سعر**             | Document clé pour la transaction B2B.            |
| **Prospect / Lead**     | Lead             | **عميل محتمل**          | Visiteur qualifié prêt à acheter.                |
| **Fournisseur**         | Supplier         | **مورد**                | Rôle de l'entreprise vis-à-vis de ses clients.   |
| **Partenaire**          | Partner          | **شريك**                | Relation long terme recherchée avec les clients. |
| **Appel d'offres**      | Tender           | **مناقصة**              | Procédure d'achat courante en B2B.               |
| **Performance**         | Performance      | **أداء / فعالية**       | Critère de choix technique pour les filtres.     |

---

## 2) Vue d'ensemble Technique

Ce projet est une application **front-end React + TypeScript** construite avec **Vite**, stylée avec **Tailwind CSS** et des composants **shadcn/ui**.  
La structure actuelle est orientée interface utilisateur, navigation de pages et composants réutilisables.

### Stack principale

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui (Radix UI)
- React Router
- React Query (`@tanstack/react-query`) pour la gestion des appels API et du cache
- Vitest + Testing Library pour les tests

---

## 2) Structure recommandée du projet (lecture rapide)

Voici les dossiers importants déjà présents :

- `src/pages` : pages principales de l'application (routing)
- `src/components` : composants UI réutilisables
- `src/hooks` : hooks personnalisés
- `src/lib` : utilitaires transverses
- `src/test` : setup et exemples de tests

> Conseil : garder les responsabilités simples
>
> - Une page = orchestration de sections + appels de hooks
> - Un composant = affichage / interaction locale
> - Un hook = logique réutilisable (state, appels API, transformations)

---

## 3) Démarrer le développement

### Prérequis

- Node.js (LTS recommandé)
- npm

### Commandes utiles

```bash
npm install
npm run dev
npm run lint
npm run test
npm run build
```

### Bon flux de travail

1. Créer une branche dédiée (`feature/...`)
2. Développer par petits commits atomiques
3. Lancer `npm run lint` et `npm run test` avant push
4. Relire les impacts UX + types TS

---

## 4) Bonnes pratiques générales (TypeScript / React)

### Typage

- Éviter `any`.
- Créer des types explicites pour les données API.
- Centraliser les types métier si possible (`src/types/...`).

### Composants

- Préférer des composants petits et testables.
- Éviter la logique métier lourde dans le JSX.
- Extraire les calculs / règles dans des hooks ou utilitaires.

### Gestion d'état et données serveur

- Utiliser **React Query** pour :
  - fetch des données,
  - cache,
  - invalidation après mutation,
  - gestion loading/error standardisée.

### Gestion d'erreurs

- Toujours gérer les états : `loading`, `error`, `empty`, `success`.
- Afficher des retours utilisateurs clairs (ex: toast, message inline).

### Sécurité

- Ne jamais commiter de secrets (clé API, mot de passe, token).
- Passer les URL/credentials via variables d'environnement (`.env`).

---

## 5) Comment ajouter une API proprement

Le projet est front-end. Pour appeler une base de données, il est recommandé de passer par un backend/API (Node, Nest, Express, Supabase, etc.) plutôt que d'exposer directement la DB depuis le navigateur.

### Étapes recommandées

1. Définir le contrat API (endpoint, méthode, payload, réponse).
2. Créer un module d'accès API côté front (`src/lib/api/...`).
3. Créer un hook React Query (`src/hooks/use-...`) pour consommer ce module.
4. Utiliser ce hook dans une page/composant.
5. Gérer erreurs + invalidation cache + états UX.

### Convention proposée

- `src/lib/api/client.ts` : fonction HTTP générique
- `src/lib/api/products.ts` : fonctions métier (get/create/update/delete)
- `src/hooks/use-products.ts` : hooks React Query associés

---

## 6) Exemple simple : lecture de données (GET)

### Exemple de client API minimal

```ts
// src/lib/api/client.ts
const API_BASE_URL = import.meta.env.VITE_API_URL;

export async function apiFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    ...init,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Erreur API");
  }

  return response.json() as Promise<T>;
}
```

### Exemple endpoint métier

```ts
// src/lib/api/products.ts
import { apiFetch } from "./client";

export type Product = {
  id: string;
  name: string;
  price: number;
};

export function getProducts() {
  return apiFetch<Product[]>("/products");
}
```

### Hook React Query

```ts
// src/hooks/use-products.ts
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/api/products";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
}
```

---

## 7) Exemple simple : ajout de données (POST)

### Fonction API de création

```ts
// src/lib/api/products.ts
export type CreateProductInput = {
  name: string;
  price: number;
};

export function createProduct(payload: CreateProductInput) {
  return apiFetch<Product>("/products", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
```

### Hook de mutation

```ts
// src/hooks/use-create-product.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "@/lib/api/products";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
```

### Appel côté composant (exemple)

```ts
const { mutateAsync, isPending } = useCreateProduct();

async function handleCreate() {
  await mutateAsync({ name: "Filtre X", price: 49.9 });
}
```

---

## 8) Lien avec base de données (architecture recommandée)

### Schéma conseillé

`Front React` → `API Backend` → `Database`

Pourquoi ?

- Sécurité des credentials DB
- Validation métier côté serveur
- Contrôle d'accès (auth/roles)
- Journalisation et monitoring

### Bonnes pratiques backend (à appliquer côté API)

- Valider les entrées (ex: Zod, Joi)
- Utiliser des requêtes paramétrées / ORM
- Gérer correctement les statuts HTTP (`200`, `201`, `400`, `401`, `404`, `500`)
- Ajouter pagination/filtrage sur les listes

---

## 9) Checklist “ajout d'une nouvelle ressource API”

Exemple : ressource `orders`

1. Définir types TS (`Order`, `CreateOrderInput`)
2. Créer fonctions API dans `src/lib/api/orders.ts`
3. Créer hooks :
   - `useOrders` (GET)
   - `useCreateOrder` (POST)
4. Intégrer dans une page `src/pages/...`
5. Ajouter gestion loading/error/empty
6. Tester logique minimale
7. Vérifier invalidation du cache React Query

---

## 10) Variables d'environnement

Utiliser un fichier `.env` (non versionné si sensible) :

```env
VITE_API_URL=https://api.mon-domaine.com
```

Rappel Vite :

- Préfixer les variables front par `VITE_`
- Accès via `import.meta.env.VITE_API_URL`

---

## 11) Exemple de requêtes HTTP (pour tester l'API)

### GET

```bash
curl -X GET "http://localhost:3000/products"
```

### POST

```bash
curl -X POST "http://localhost:3000/products" \
  -H "Content-Type: application/json" \
  -d '{"name":"Filtre premium","price":79.9}'
```

### PUT

```bash
curl -X PUT "http://localhost:3000/products/1" \
  -H "Content-Type: application/json" \
  -d '{"name":"Filtre premium v2","price":89.9}'
```

### DELETE

```bash
curl -X DELETE "http://localhost:3000/products/1"
```

---

## 12) Conclusion

Ce dossier sert de base pour organiser le développement technique sans toucher au code applicatif existant.  
Quand vous commencerez l'intégration API, gardez une architecture simple :

- contrat API clair,
- types TS stricts,
- hooks React Query,
- gestion d'erreur et de cache systématique.
