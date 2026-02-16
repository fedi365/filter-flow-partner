# Backend Spring Boot — Dépendances, APIs (selon le front) et Entités

## 1) Objectif

Ce document définit une proposition de backend **Spring Boot 3 + Java 21** pour supporter le front actuel (pages Home, Products, Deals, Guide, Contact), avec stockage dans **Supabase Postgres**.

---

## 2) Dépendances Maven nécessaires (`pom.xml`)

```xml
<dependencies>
  <!-- API REST -->
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
  </dependency>

  <!-- JPA + PostgreSQL -->
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
  </dependency>
  <dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
  </dependency>

  <!-- Validation DTO -->
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
  </dependency>

  <!-- Sécurité (JWT Supabase si besoin) -->
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
  </dependency>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-oauth2-resource-server</artifactId>
  </dependency>

  <!-- Migration BDD -->
  <dependency>
    <groupId>org.flywaydb</groupId>
    <artifactId>flyway-core</artifactId>
  </dependency>

  <!-- Utilitaires -->
  <dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <optional>true</optional>
  </dependency>

  <!-- Tests -->
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
  </dependency>
</dependencies>
```

### Dépendance optionnelle (OpenAPI)

```xml
<dependency>
  <groupId>org.springdoc</groupId>
  <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
  <version>2.6.0</version>
</dependency>
```

---

## 3) APIs backend proposées selon les besoins du front

> Le front actuel utilise beaucoup de contenu statique. Cette section transforme ce contenu en endpoints backend pour rendre le projet dynamique.

### 3.1 Endpoints "contenu" (site)

### `GET /api/v1/site/home?lang=fr|en`

Retourne les blocs de la page d'accueil :

- hero
- about
- advantages
- clients
- normes
- guidePreview
- ctaFinal

### `GET /api/v1/products?lang=fr|en`

Retourne la liste des produits (name, shortDesc, etc.).

### `GET /api/v1/products/{slug}?lang=fr|en`

Retourne le détail d'un produit (description, applications, performances, tips).

### `GET /api/v1/deals?lang=fr|en`

Retourne la liste des packs/offres.

### `GET /api/v1/guide?lang=fr|en`

Retourne les sections FAQ/guide (title + content).

### `GET /api/v1/contact-info?lang=fr|en`

Retourne les coordonnées affichées sur la page contact.

---

### 3.2 Endpoints "formulaire" / business

### `POST /api/v1/contact-requests`

Permet d'envoyer une demande via le formulaire Contact.

Exemple body:

```json
{
  "fullName": "Ahmed Benali",
  "company": "AquaTech",
  "email": "ahmed@aquatech.dz",
  "phone": "+213555000000",
  "requestType": "Demande de devis",
  "message": "Je souhaite un devis pour une unité GAC."
}
```

Réponses:

- `201 Created` + payload de confirmation
- `400 Bad Request` si validation échoue

### `GET /api/v1/admin/contact-requests`

Liste des demandes reçues (route admin sécurisée).

### `PATCH /api/v1/admin/contact-requests/{id}/status`

Mise à jour du statut: `NEW`, `IN_PROGRESS`, `CLOSED`.

---

## 4) Entités recommandées

## `Product`

- id (UUID)
- slug (unique)
- isActive
- createdAt
- updatedAt

## `ProductTranslation`

- id
- productId (FK)
- lang (`fr`, `en`)
- name
- shortDescription
- description
- tips

## `ProductPerformance`

- id
- productId (FK)
- paramName
- paramValue
- sortOrder

## `ProductApplication`

- id
- productId (FK)
- lang
- label
- sortOrder

## `Deal`

- id
- slug
- isFeatured
- isActive

## `DealTranslation`

- id
- dealId (FK)
- lang
- name
- description

## `DealFeature`

- id
- dealId (FK)
- lang
- label
- sortOrder

## `GuideSection`

- id
- slug
- sortOrder
- isActive

## `GuideSectionTranslation`

- id
- sectionId (FK)
- lang
- title
- content

## `ContactInfo`

- id
- lang
- address
- phone
- email
- hours

## `ContactRequest`

- id (UUID)
- fullName
- company
- email
- phone
- requestType
- message
- status (`NEW`, `IN_PROGRESS`, `CLOSED`)
- createdAt
- updatedAt

---

## 5) DTOs recommandés

- `ContactRequestCreateDto` (validation `@NotBlank`, `@Email`, tailles max)
- `ContactRequestResponseDto`
- `ProductListItemDto`
- `ProductDetailDto`
- `DealDto`
- `GuideSectionDto`

---

## 6) Arborescence Spring conseillée

```text
src/main/java/com/filterflow/partner/
  config/
  controller/
  service/
  repository/
  domain/
  dto/
  mapper/
  security/
  exception/
```

---

## 7) Priorité MVP (ordre de livraison)

1. `POST /contact-requests` + table `contact_requests`
2. `GET /products` + `GET /products/{slug}`
3. `GET /deals`, `GET /guide`
4. Auth admin + endpoints admin de suivi
5. Caching (Redis) et observabilité

---

## 8) Règles API recommandées

- Versionner les routes (`/api/v1`)
- Format d'erreur uniforme (code, message, details, traceId)
- Pagination pour listes admin
- Tri/filtre pour demandes contact
- Logs structurés + `X-Correlation-Id`
