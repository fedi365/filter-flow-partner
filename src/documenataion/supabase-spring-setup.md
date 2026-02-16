# Paramétrage Supabase + Liaison avec Spring Boot

## 1) Créer le projet Supabase

1. Aller sur le site officiel: **https://supabase.com**
2. Créer un compte / se connecter.
3. Cliquer sur **New Project**.
4. Choisir:
   - organization
   - project name
   - mot de passe database (fort)
   - région la plus proche de vos utilisateurs
5. Attendre le provisionnement.

---

## 2) Récupérer les informations essentielles

Dans **Project Settings > Database** et **Project Settings > API** récupérer:

- `Project URL`
- `anon public key`
- `service_role key` (à garder strictement côté serveur)
- `DB Host`
- `DB Port` (souvent `5432`)
- `DB Name` (souvent `postgres`)
- `DB User`
- `DB Password`

Pour Spring/JPA, ce qui est indispensable:

- JDBC URL
- username
- password

Exemple JDBC (pooler Supabase):

```text
jdbc:postgresql://<HOST>:5432/postgres?sslmode=require
```

> Toujours activer SSL (`sslmode=require`) avec Supabase.

---

## 3) Configuration Spring Boot (`application.yml`)

```yaml
server:
  port: 8080

spring:
  datasource:
    url: ${DB_URL}
    username: ${DB_USERNAME}
    password: ${DB_PASSWORD}
    driver-class-name: org.postgresql.Driver

  jpa:
    hibernate:
      ddl-auto: validate
    properties:
      hibernate:
        format_sql: true
    open-in-view: false

  flyway:
    enabled: true
    locations: classpath:db/migration

logging:
  level:
    org.hibernate.SQL: INFO
```

### Variables d'environnement recommandées

- `DB_URL`
- `DB_USERNAME`
- `DB_PASSWORD`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (backend seulement)
- `SUPABASE_JWT_SECRET` (si validation JWT)

---

## 4) Script SQL initial (Supabase SQL Editor)

Créer les tables principales (MVP):

```sql
create extension if not exists pgcrypto;

create table if not exists contact_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  company text not null,
  email text not null,
  phone text,
  request_type text,
  message text not null,
  status text not null default 'NEW',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_contact_requests_status on contact_requests(status);
create index if not exists idx_contact_requests_created_at on contact_requests(created_at desc);
```

---

## 5) Gestion RLS (Row Level Security)

Supabase active fortement la sécurité via RLS.

### Cas recommandé pour ce projet

- Le backend Spring accède à la BDD avec les credentials PostgreSQL (JDBC), pas via REST Supabase.
- Dans ce mode, RLS n'est pas obligatoire pour JPA direct, mais reste utile si vous exposez aussi Supabase REST/Client.

Si vous utilisez Supabase REST côté front:

- activer RLS
- définir policies minimales par table
- ne jamais exposer `service_role`

---

## 6) Connexion Spring ↔ Supabase: 2 approches

## Approche A (recommandée): JDBC direct via Postgres

- Spring Data JPA + driver PostgreSQL
- Performant et standard pour backend enterprise
- Contrôle total des transactions, repository, migrations

## Approche B: Appel API Supabase depuis Spring

- Spring appelle l'API REST Supabase avec `anon` ou `service_role`
- Plus simple pour certains usages, mais moins naturel que JPA pour un backend riche

**Conclusion:** utiliser **Approche A** pour ce projet.

---

## 7) Sécurité JWT Supabase dans Spring (optionnel)

Si le front utilise Supabase Auth et envoie un Bearer token:

1. Configurer Spring Resource Server.
2. Valider la signature JWT avec le secret/jwks Supabase.
3. Mapper les rôles (`authenticated`, `anon`, claims custom).

Exemple minimal (idée):

- `spring-boot-starter-oauth2-resource-server`
- `SecurityFilterChain` avec `.oauth2ResourceServer(oauth2 -> oauth2.jwt())`

---

## 8) Bonnes pratiques production

- Mettre les secrets dans un vault (pas en dur dans Git)
- Activer sauvegardes automatiques Supabase
- Utiliser Flyway pour versionner le schéma
- Mettre timeout/retry côté datasource
- Activer monitoring (Actuator + logs + métriques)
- Créer environnement `dev`, `staging`, `prod`

---

## 9) Flux cible du projet

1. Front envoie `POST /api/v1/contact-requests` au backend Spring.
2. Spring valide DTO.
3. Service enregistre dans Supabase Postgres via JPA.
4. Backend renvoie `201 Created`.
5. Admin consulte via endpoint sécurisé.

---

## 10) Checklist de démarrage rapide

- [ ] Projet Supabase créé
- [ ] Variables d'environnement configurées
- [ ] Spring démarre et se connecte à la BDD
- [ ] Migration Flyway appliquée
- [ ] Endpoint `POST /contact-requests` testé
- [ ] Sécurité admin activée
- [ ] Logs et monitoring actifs
