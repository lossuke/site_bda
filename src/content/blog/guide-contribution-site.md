---
title: "Publier sur le site : blog, actualités et adresses"
description: "Les étapes et modèles à copier pour rédiger un article, publier une actu et ajouter un lieu à la carte du BDA."
pubDate: '2099-10-26'
theme: 'Tutoriel'
---

Ce guide explique comment contribuer au site du Bureau des Arts et Cultures de Télécom Paris avec son organisation actuelle. Tous les chemins indiqués partent de la racine du projet, le dossier qui contient `package.json`.

Les exemples sont des modèles : remplace les titres, les dates, les textes et les images par tes informations. Copie le contenu des blocs de code, sans les trois accents graves qui les encadrent.

## 1. Choisir le bon emplacement

| Ce que tu veux ajouter | Fichier à créer ou modifier | Où le retrouver sur le site |
| --- | --- | --- |
| Un article de blog, une critique ou un compte rendu | Un fichier `.md` dans `src/content/blog/` | La rubrique `/blog/` |
| Une annonce ou une actualité du BDA | Un fichier `.md` dans `src/content/Actus/` | La rubrique `/Actu/` |
| Une fiche de lieu ou d’exposition avec un point sur la carte | `src/liste_adresses/addresses.ts` | La page `/nos-adresses/` |

Le blog et les actualités utilisent du **Markdown**. La liste des adresses utilise actuellement du **TypeScript** : ajouter un article ne crée donc pas automatiquement une adresse sur la carte.

Pour les nouveaux noms de fichiers, utilise des minuscules, des tirets et aucun espace : `visite-exposition.md`, par exemple. Garde les noms stables une fois publiés, car ils servent à construire les liens des articles.

## 2. Écrire un article de blog

### Créer le fichier

Crée `src/content/blog/ma-visite-exposition.md`, puis colle ce modèle complet :

```markdown
---
title: "Notre visite d’une exposition"
description: "Un aperçu de l’exposition, des œuvres et de nos impressions."
pubDate: '2026-10-26'
theme: 'Peinture'
heroImage: '../../assets/article_dagoma_harty/cover.jpg'
date_debut: '2026-11-01'
date_fin: '2026-11-30'
---

Un court paragraphe pour présenter le sujet et donner envie de lire.

## L’exposition

Présente le lieu, les artistes et ce que l’on peut découvrir.

## Notre regard

Développe tes impressions, avec des exemples précis d’œuvres.

## Informations pratiques

- **Lieu :** nom et adresse complète
- **Horaires :** jours et heures d’ouverture
- **Tarif :** prix ou conditions de gratuité
```

La couverture de cet exemple existe déjà dans le projet. Tu peux la remplacer par ta propre photographie ou supprimer la ligne `heroImage` si tu n’as pas de couverture. Les dates d’exposition sont également des exemples ; supprime les deux lignes si ton article ne concerne pas un événement daté.

Astro générera sa page à `/blog/ma-visite-exposition/`, même si sa date de publication est future. L’article apparaîtra dans la liste du blog et dans le flux RSS lorsque sa `pubDate` sera atteinte au moment de la génération du site. Tu n’as pas de lien de menu à ajouter pour chaque article.

### Comprendre les informations en haut du fichier

Le bloc entre les deux lignes `---` s’appelle le **frontmatter**. Il contient les informations exploitées par le site. Le texte qui suit constitue le corps de l’article.

| Champ | Obligatoire ? | À quoi il sert actuellement |
| --- | --- | --- |
| `title` | Oui | Titre affiché dans la liste et sur la page de l’article |
| `description` | Oui | Résumé utilisé dans les métadonnées de la page |
| `pubDate` | Oui | Date affichée, classement du plus récent au plus ancien et date d’apparition dans la liste du blog et le RSS |
| `theme` | Non | Thème affiché sous les dates de la carte du blog, par exemple « Thème : Peinture » |
| `heroImage` | Non | Image de couverture de l’article et de sa carte dans le blog |
| `date_debut` | Non | Première date de l’événement |
| `date_fin` | Non | Dernière date de l’événement |
| `updatedDate` | Non | Date de mise à jour affichée sur la page de détail |

Écris les dates complètes au format `'AAAA-MM-JJ'`, par exemple `'2026-11-07'`. Pour afficher une période dans la liste du blog, renseigne **les deux champs** `date_debut` et `date_fin`. Ajoute aussi les dates dans les informations pratiques du texte si tu veux les faire apparaître dans le corps de l’article.

Le thème est une chaîne de texte, par exemple `theme: 'Photographie'`. Il n’est pas nécessaire de modifier le code de la page pour afficher un nouveau thème.

Pour modifier un article existant, édite son fichier `.md`. Tu peux ajouter cette ligne dans son frontmatter :

```yaml
updatedDate: '2026-10-27'
```

### Éviter les erreurs de frontmatter

- Garde les lignes d’ouverture et de fermeture `---` seules sur leur ligne.
- Écris les noms de champs exactement comme dans le modèle : `pubDate` et `heroImage` respectent les majuscules.
- Mets les textes entre guillemets, surtout s’ils contiennent un deux-points. Les guillemets doubles sont pratiques pour les apostrophes françaises : `title: "L’art à Paris"`.
- Dans un fichier Markdown, les champs du frontmatter n’ont pas de virgule à la fin.

Les champs autorisés sont définis dans `src/content.config.ts`. Un nouveau champ inventé, comme `artiste`, ne s’affiche pas automatiquement : écris ces informations dans le corps du texte ou fais adapter le schéma et l’affichage.

## 3. Publier une actualité

Crée par exemple `src/content/Actus/visite-collective.md`. Respecte les majuscules du dossier **`Actus`**.

Voici un modèle complet :

```markdown
---
title: "Une visite collective avec le BDA"
description: "Le programme de la visite et les informations pour participer."
pubDate: '2026-10-26'
date_debut: '2026-11-05'
date_fin: '2026-11-05'
---

Le BDA propose une visite collective. Voici les informations utiles.

## Au programme

Présente le déroulement de la sortie.

## Pour participer

- **Rendez-vous :** indique le lieu et l’heure.
- **Tarif :** précise le prix ou la gratuité.
- **Inscription :** ajoute le lien et la date limite, si nécessaire.
```

Cette actu apparaîtra dans `/Actu/` et sera accessible à `/Actu/visite-collective/`. La majuscule de **`Actu`** compte dans les liens.

Les champs obligatoires sont les mêmes que pour le blog : `title`, `description` et `pubDate`. Pour une annonce sans événement daté, supprime `date_debut` et `date_fin`.

Le filtre de date du blog ne s’applique pas aux actualités : une actu avec une `pubDate` future apparaît tout de même dans `/Actu/` après génération du site.

Dans la rubrique Actualités, **la description apparaît directement dans la liste** : rédige un résumé qui se comprend sans ouvrir la page. Le contenu détaillé se lit en cliquant sur l’actu.

Les champs `theme` et `heroImage` sont acceptés par le schéma commun, mais l’affichage actuel des actualités ne les montre pas. Pour illustrer une actu, ajoute une image dans son corps en Markdown.

## 4. Mettre en forme le texte et ajouter des images

Le modèle de page affiche déjà le titre principal. Commence tes sections avec `##`, puis utilise `###` pour les sous-sections.

```markdown
## Une section

Un paragraphe avec du **gras** et de l’*italique*.

Une ligne vide commence un nouveau paragraphe.

### Une sous-section

- Un premier élément
- Un deuxième élément

> Une citation courte, suivie de son auteur.

[Consulter les actualités du BDA](/Actu/)
```

Pour ajouter une photo, dépose-la par exemple dans `src/assets/ma-visite/photo.jpg`, puis écris dans ton article ou ton actu :

```markdown
![Des visiteurs devant des tableaux dans une galerie](../../assets/ma-visite/photo.jpg)

*Titre de l’exposition — Photographie : prénom et nom.*
```

Le texte entre crochets décrit ce que montre l’image. La légende visible est écrite séparément. Le chemin `../../assets/...` convient aux fichiers placés directement dans `src/content/blog/` ou `src/content/Actus/` ; il faut l’adapter si tu crées des sous-dossiers.

Pour utiliser cette photo comme couverture de blog, ajoute dans le frontmatter :

```yaml
heroImage: '../../assets/ma-visite/photo.jpg'
```

Les couvertures du blog sont actuellement affichées dans un cadre large de proportion **2:1**. Choisis une image qui supporte ce recadrage.

Les images locales placées dans `src/` et utilisées avec la syntaxe Markdown peuvent être optimisées par Astro. Les fichiers de `public/` sont servis tels quels : `public/images/photo.jpg` devient `/images/photo.jpg` dans un lien. [Guide des images Astro](https://docs.astro.build/en/guides/images/).

Pour les lecteurs audio, les vidéos, les tableaux et les blocs dépliables, consulte le [tutoriel Markdown détaillé du blog](/blog/tutoriel-markdown-astro/).

## 5. Ajouter une adresse à la liste et à la carte

### Ouvrir le bon fichier

Les adresses se trouvent dans **`src/liste_adresses/addresses.ts`**. Il ne faut pas créer de fichier Markdown dans ce dossier : la page lit le tableau renvoyé par la fonction `getAddresses()`.

Une fiche possède son propre titre, son lieu, son adresse, son tarif, sa photo et sa description. Elle peut être liée à un article, mais ce lien est facultatif.

### Ajouter la photographie

1. Dépose ta photo dans `src/assets/`, par exemple `src/assets/mon-lieu.jpg`.
2. Ajoute cet import en haut de `addresses.ts`, à côté des imports existants :

```typescript
import PhotoDuLieu from '../assets/mon-lieu.jpg';
```

Le chemin de l’import part du fichier TypeScript, d’où **`../assets/`**, et non `../../assets/` comme dans les articles. Le champ `image` attend une image importée ; n’y colle pas directement une chaîne comme `'/images/mon-lieu.jpg'`.

### Insérer une nouvelle fiche

Dans `getAddresses()`, repère le tableau qui commence par `return [` et se termine par `];`. Conserve les fiches existantes. Si l’accolade fermante du dernier objet n’est pas suivie d’une virgule, transforme son `}` final en `},`. Ajoute ensuite l’objet suivant **après cette virgule, avant le `];` final** :

```typescript
{
  id: 'ma-nouvelle-adresse',
  title: 'Le titre de mon exposition',
  venue: 'Nom du lieu',
  address: '15 rue de Seine, 75006 Paris',
  description: 'Une courte présentation du lieu ou de l’exposition.',
  price: 'Entrée libre',
  image: PhotoDuLieu,
  imageAlt: 'Une description de ce que montre la photographie',
  startsAt: '2026-11-01',
  endsAt: '2026-11-30',
  coordinates: [48.85665, 2.336659],
  articleUrl: '/blog/ma-visite-exposition/',
},
```

Ce bloc est un modèle à personnaliser. L’adresse et les coordonnées montrées correspondent au **15 rue de Seine à Paris** : remplace-les ensemble pour un autre lieu. Le lien d’article n’est valable que si tu as créé le fichier correspondant ; supprime la ligne `articleUrl` sinon.

À la différence du frontmatter Markdown, un objet TypeScript utilise des **accolades et des virgules**. Chaque propriété se termine par une virgule et les objets du tableau sont séparés par une virgule.

### Renseigner les champs

| Champ | Obligatoire ? | Contenu attendu |
| --- | --- | --- |
| `id` | Oui | Identifiant unique, par exemple `'galerie-nom-du-lieu'` ; ne réutilise pas celui d’une autre fiche |
| `title` | Oui | Titre de l’exposition ou nom de la fiche |
| `venue` | Oui | Nom du lieu |
| `address` | Oui | Adresse complète avec numéro, rue, code postal et ville |
| `description` | Oui | Présentation courte pour la liste |
| `price` | Oui | Texte libre, par exemple `'Entrée libre'` ou `'12 € ; tarif étudiant : 8 €'` |
| `image` | Oui | Nom de l’image importée, ici `PhotoDuLieu` |
| `imageAlt` | Oui | Description de la photographie pour l’accessibilité |
| `startsAt` | Non | Date de début, au format `'AAAA-MM-JJ'` |
| `endsAt` | Non | Date de fin, au même format |
| `coordinates` | Non | Tableau de deux nombres : **latitude, puis longitude** |
| `articleUrl` | Non | Chemin vers un article existant, par exemple `'/blog/ma-visite-exposition/'` |

Deux expositions dans la même galerie peuvent partager une adresse, mais doivent garder des identifiants différents, par exemple `'galerie-exposition-a'` et `'galerie-exposition-b'`. Le champ `id` relie chaque fiche à son propre point ; un doublon perturbe cette correspondance.

Pour un lieu permanent, supprime `startsAt` et `endsAt`. Sans coordonnées, la fiche reste visible avec un bouton désactivé « Localisation à compléter » et n’a pas de point sur la carte. L’adresse écrite en texte n’est pas géolocalisée automatiquement.

### Trouver et vérifier les coordonnées

Sur Google Maps depuis un ordinateur, fais un clic droit sur le lieu précis : le menu affiche sa latitude et sa longitude. Clique sur ces nombres pour les copier. Cette méthode est décrite dans [l’aide Google Maps](https://support.google.com/maps/answer/18539?hl=fr).

Dans `addresses.ts`, écris les coordonnées **sans guillemets**, avec un point pour les décimales :

```typescript
coordinates: [48.85665, 2.336659],
```

Pour Paris, la latitude est proche de `48.8` et la longitude de `2.3`. Vérifie surtout que le point tombe sur la bonne entrée du lieu, et conserve l’ordre latitude puis longitude. Certaines données GeoJSON utilisent l’ordre inverse : il faut alors le convertir.

Un lien Google Maps ou une modification dans Google My Maps ne met pas automatiquement à jour le site : les fiches restent définies dans `addresses.ts`.

### Comprendre le lien de la première fiche avec le blog

La fiche déjà présente récupère son titre, sa couverture et ses dates depuis l’article `article_exemple`, avec `getEntry('blog', 'article_exemple')`. Les nouvelles fiches écrites avec le modèle ci-dessus possèdent leurs propres informations : modifier leurs dates dans le blog ne change pas leurs champs `startsAt` et `endsAt`.

**Particularité actuelle :** la fonction commence par `if (!article) return [];`. Si tu supprimes ou renommes `article_exemple.md`, toute la liste d’adresses deviendra vide, y compris les fiches ajoutées ensuite. Avant de retirer cet article, il faut adapter cette condition et la fiche qui en dépend dans `getAddresses()`.

## 6. Vérifier le résultat

Depuis un terminal ouvert à la racine du projet, lance l’aperçu en arrière-plan :

```bash
npm run astro -- dev --background
```

Ouvre l’adresse locale indiquée dans le terminal. Le port est souvent `4321`, mais utilise celui qui est réellement affiché. Vérifie ensuite la rubrique concernée :

- `/blog/` et la page de ton article ;
- `/Actu/` et la page de ton actu ;
- `/nos-adresses/` pour la fiche et son point sur la carte.

Pour gérer le serveur :

```bash
npm run astro -- dev status
npm run astro -- dev logs
npm run astro -- dev stop
```

Avant de terminer, arrête le serveur d’aperçu avec la commande `stop`, puis vérifie le projet :

```bash
npm run check
npm run build
```

La première commande vérifie les types et les fichiers Astro. La seconde génère le site dans `dist/` et peut révéler une date invalide, un frontmatter mal écrit ou une image introuvable.

Pour une adresse, vérifie que la photo apparaît, que le tarif et les dates sont corrects, et que le bouton « Voir sur la carte » ouvre le bon point. Clique aussi sur le point pour retrouver la fiche et teste le lien « Lire l’article » s’il existe.

## 7. Savoir quand le contenu sera visible

Les fichiers de `src/content/blog/` sont inclus automatiquement par les collections Astro. Dans la liste `/blog/` et le flux RSS, seuls les articles dont la `pubDate` est passée ou tombe le jour courant sont affichés. La comparaison se fait par jour dans le fuseau **Europe/Paris** : le jour courant est inclus, sans attendre une heure particulière.

Pour garder un article hors de la liste et du RSS jusqu’au 1er janvier 2099, remplace sa ligne `pubDate` existante dans le frontmatter par :

```yaml
pubDate: '2099-01-01'
```

L’article reste accessible par son URL directe dès que le site est généré et déployé. **Il reste public** : son adresse peut aussi figurer dans le sitemap ou être liée depuis d’autres pages, comme Exposition. Ce réglage masque seulement sa présence dans la liste du blog et le RSS. Pour un brouillon qui ne doit pas encore être publié, garde le fichier hors des dossiers de contenu.

Le site est statique : le filtre est calculé lors du build. Quand la date est atteinte, il faut **relancer `npm run build` puis déployer le résultat** pour actualiser la liste et le RSS publics. Le passage à minuit ne met pas à jour à lui seul les fichiers déjà déployés.

Les fichiers de `src/content/Actus/` ne sont pas filtrés selon leur date de publication : les actualités datées dans le futur restent affichées dans `/Actu/`.

Les dates de fin ne retirent pas non plus automatiquement un événement expiré. Pour enlever une adresse de la sélection, retire son objet du tableau dans `addresses.ts`.

L’aperçu local sert à relire tes changements. La version publique sera mise à jour après le déploiement du site, selon le fonctionnement de son hébergement. Tu n’as pas à modifier les fichiers générés dans `dist/` à la main.

Pour comprendre la configuration du contenu, consulte le [guide des collections Astro](https://docs.astro.build/en/guides/content-collections/). Pour la syntaxe du texte, retrouve le [guide Markdown Astro](https://docs.astro.build/en/guides/markdown-content/).
