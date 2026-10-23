# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      # CRSE · Site institutionnel

      Site multipage de la Commission de régulation du secteur de l’électricité, construit avec React, TypeScript et Vite.

      ## Démarrage

      ```sh
      npm install
      npm run dev
      ```

      Le serveur de développement affiche son URL dans le terminal. Pour vérifier la version de production :

      ```sh
      npm run build
      npm run preview
      ```

      ## Organisation

      - `src/app` : routage et fournisseurs globaux.
      - `src/components/layout` : en-tête, pied de page et mise en page partagée.
      - `src/pages` : pages d’accueil, de contenu, de recherche et gabarit de détail.
      - `src/data` : navigation et contenus des pages.
      - `src/i18n` : textes de base en français, anglais et wolof.
      - `public/assets` : emplacements pour les images, documents, icônes et polices du site.

      La page d’accueil utilise des images Unsplash distantes à titre provisoire. Remplacer ces références par les visuels officiels CRSE avant publication. Les contenus de démonstration et les chiffres doivent être vérifiés et remplacés par les informations officielles.
    ],
