---
title: "Rédiger un article pour le BDA en Markdown avec Astro"
description: "Un guide pratique pour publier du texte, des images, de la musique et des vidéos sur le blog du BDA."
heroImage: '../../assets/article_dagoma_harty/cover2.jpg'
pubDate: '2026-10-02'
---

Chaque article de ce blog est un fichier `.md` placé dans le dossier `src/content/blog/`. Astro transforme son contenu en une page web et l’ajoute à la liste des articles.

Le Markdown permet de rédiger du texte avec une syntaxe simple. Pour les lecteurs audio, les vidéos et certaines présentations, on peut aussi écrire du HTML directement dans le même fichier.

Les blocs de code de ce tutoriel montrent **ce qu’il faut écrire dans ton article**. Ils ne chargent pas les médias : remplace les noms de fichiers et les adresses par les tiens lorsque tu les copies. Ne copie pas les trois accents graves qui entourent un exemple, sauf si tu veux afficher du code dans ton article.

## 1. Créer un article et renseigner ses informations

Crée par exemple `src/content/blog/exposition-etudiante.md`. Avec la configuration actuelle du blog, sa page sera accessible à l’adresse `/blog/exposition-etudiante/`.

Commence le fichier ainsi :

```markdown
---
title: "Exposition des artistes du campus"
description: "Peinture, photographie et musique : découvrez les créations étudiantes."
pubDate: '2026-10-04'
heroImage: '../../assets/blog-placeholder-3.jpg'
date_debut: '2026-10-12'
date_fin: '2026-10-16'
---

Une semaine pour découvrir les créations des artistes du campus.

## À propos de l’exposition

Cette exposition rassemble des photographies, des peintures et des
installations sonores.
```

Le bloc entre les deux lignes `---` s’appelle le **frontmatter**. Il contient les informations sur l’article. Le texte situé après la deuxième ligne `---` constitue son contenu.

| Champ | Rôle | Obligatoire dans ce blog ? |
| --- | --- | --- |
| `title` | Titre de l’article | Oui |
| `description` | Courte description, notamment utilisée dans les métadonnées de la page | Oui |
| `pubDate` | Date de publication, aussi utilisée pour classer les articles | Oui |
| `heroImage` | Image de couverture  MEttez les en 16:9 (format pyasage iphone quoi)| Non |
| `date_debut` | Début de l’événement | Non |
| `date_fin` | Fin de l’événement | Non |
| `updatedDate` | Date de mise à jour | Non |

Écris les dates complètes entre guillemets, au format `'2026-10-04'`. Un nombre comme `2026` ne représente pas correctement une année avec la conversion de dates utilisée par le blog.

L’image de couverture de cet exemple existe déjà dans le projet : remplace-la par ton image lorsque tu prépares ton article. Les deux dates d’événement permettent d’afficher la période dans la liste des articles lorsqu’elles sont toutes les deux renseignées.

Les champs du frontmatter sont exploités par les composants du site. Ajouter un champ comme `artiste` ou `lieu` ne suffit pas à l’afficher : il faut aussi adapter le schéma de contenu et le modèle de page, ou écrire directement ces informations dans le corps de l’article.

## 2. Écrire et organiser le texte

Le modèle de page affiche déjà le titre principal de l’article. Commence donc les sections avec `##`, puis utilise `###` pour les sous-sections.

```markdown
## Présentation de l’artiste

Voici un paragraphe avec du **texte en gras** et du *texte en italique*.

Une ligne vide commence un nouveau paragraphe.

### Sa démarche artistique

L’artiste explore la relation entre la lumière et la mémoire.

> Une citation de l’artiste peut être présentée ainsi.

— Nom de l’artiste
```

Une simple nouvelle ligne dans le fichier ne crée pas forcément un nouveau paragraphe. Laisse une ligne vide entre deux paragraphes.

Pour conserver les retours à la ligne d’un poème, tu peux utiliser `<br />` :

```markdown
La lumière traverse la salle,<br />
Une couleur apparaît,<br />
Le regard s’arrête.
```
Pour les listes, utilise des tirets ou des numéros :

```markdown
Les disciplines représentées :

- Photographie
- Peinture
- Sculpture

Le déroulement de la visite :

1. Accueil du public
2. Présentation des œuvres
3. Discussion avec les artistes
```

## 3. Ajouter une image

Place par exemple une photographie dans `src/assets/installation.jpg`, puis écris :

```markdown
![Des rubans rouges suspendus dans une salle blanche](../../assets/installation.jpg)

*Nom de l’artiste — Titre de l’œuvre, 2026. Photographie : prénom et nom.*
```

La syntaxe est `![description de l’image](chemin)` :

- Le texte entre crochets décrit l’image pour les lecteurs d’écran et lorsqu’elle ne peut pas être chargée.
- Le chemin entre parenthèses indique le fichier.
- La légende visible est écrite séparément, ici en italique.

Depuis un article situé directement dans `src/content/blog/`, le chemin `../../assets/installation.jpg` remonte de deux dossiers pour rejoindre `src/assets/`. Si tu ranges tes articles dans des sous-dossiers, adapte ce chemin.

Astro peut traiter et optimiser les images locales référencées en Markdown depuis `src/`. Pour présenter plusieurs œuvres simplement, répète le bloc image et légende. Une galerie en colonnes nécessite une mise en page supplémentaire en CSS ou un composant.

## 4. Ranger les fichiers dans public

Le dossier `public/` est pratique pour les fichiers audio, les vidéos, les PDF et les images utilisées directement dans du HTML. Tu peux créer cette organisation :

```text
public/
├── images/
│   ├── sculpture.jpg
│   └── concert-affiche.jpg
├── audio/
│   └── concert.mp3
├── videos/
│   └── concert.mp4
└── documents/
    └── programme.pdf
```

Ces fichiers sont des exemples : dépose tes propres médias dans les dossiers correspondants.

**Dans les liens de l’article, commence par `/` et n’écris pas `public`.** Par exemple, `public/images/sculpture.jpg` devient `/images/sculpture.jpg` :

```markdown
![Une sculpture en bois composée de formes entrelacées](/images/sculpture.jpg)
```

Les fichiers de `public/` sont servis tels quels, sans optimisation automatique des images. Respecte exactement les majuscules et les extensions des noms de fichiers pour éviter les erreurs 404.

## 5. Présenter une œuvre avec sa légende

Pour associer explicitement une image et sa légende, utilise les balises HTML `<figure>` et `<figcaption>` :

```html
<figure>
  <img
    src="/images/sculpture.jpg"
    alt="Une sculpture en bois composée de formes entrelacées"
    loading="lazy"
  />
  <figcaption>
    Camille — Entrelacs, 2026. Bois sculpté, 40 × 25 cm.
    Photographie : prénom et nom.
  </figcaption>
</figure>
```

Pour une œuvre, une légende peut préciser le nom de l’artiste, le titre, l’année, la technique, les dimensions et le crédit photographique. Le texte alternatif décrit plutôt ce que l’image montre.

## 6. Ajouter de la musique ou une interview

Après avoir placé ton fichier dans `public/audio/concert.mp3`, ajoute un lecteur HTML :

```html
<p>Écouter un extrait du concert :</p>

<audio controls preload="none" style="width: 100%;">
  <source src="/audio/concert.mp3" type="audio/mpeg" />
  Votre navigateur ne prend pas en charge le lecteur audio.
</audio>
```

- `controls` affiche les commandes de lecture, de pause et de volume.
- `preload="none"` demande au navigateur de ne pas précharger le fichier.
- Sans `autoplay`, le visiteur choisit quand lancer la musique.

Le même lecteur convient à une création sonore, un podcast ou une interview. Ajoute le titre du morceau et le nom de l’interprète à proximité. Pour une interview, une transcription permet aussi de lire le contenu.

## 7. Ajouter une vidéo

Pour une vidéo hébergée avec le site, tu peux reprendre ce lecteur et renseigner tes chemins :

```html
<video
  controls
  playsinline
  preload="metadata"
  poster="/images/concert-affiche.jpg"
  style="width: 100%; height: auto;"
>
  <source src="/videos/concert.mp4" type="video/mp4" />
  Votre navigateur ne prend pas en charge le lecteur vidéo.
</video>
```

- `poster` définit l’image affichée avant la lecture. Tu peux supprimer cet attribut si tu n’en as pas.
- `playsinline` permet la lecture dans la page sur les appareils compatibles.
- `preload="metadata"` demande le préchargement des informations sur la vidéo.
- La largeur à `100%` adapte le lecteur à la colonne de l’article.

Tu peux également ajouter des sous-titres avec une balise `<track>` et un fichier `.vtt`.

Pour une vidéo YouTube, utilise un lecteur intégré et remplace `ID_VIDEO` par l’identifiant de ta vidéo :

```html
<iframe
  src="https://www.youtube.com/embed/ID_VIDEO"
  title="Présentation de l’exposition"
  loading="lazy"
  style="width: 100%; aspect-ratio: 16 / 9; border: 0;"
  allowfullscreen
></iframe>
```

Une adresse de page YouTube classique ne fonctionne pas comme source d’un lecteur `<video>`. Le lecteur intégré utilise une adresse de la forme `/embed/ID_VIDEO`. Les liens vidéo restent à compléter avec tes contenus.

## 8. Ajouter des liens et un programme

Un lien Markdown s’écrit `[texte du lien](adresse)` :

```markdown
[Lire notre précédent article](/blog/first-post/)

[Consulter le programme en PDF](/documents/programme.pdf)
```

Pour proposer explicitement le téléchargement d’un fichier local, utilise du HTML :

```html
<a href="/documents/programme.pdf" download>Télécharger le programme</a>
```

Un tableau est pratique pour présenter le déroulement d’un événement :

```markdown
## Informations pratiques

- **Lieu :** hall principal de Télécom Paris
- **Horaires :** de 14 h à 19 h
- **Entrée :** libre

## Programme

| Heure | Activité | Lieu |
| --- | --- | --- |
| 14 h | Ouverture de l’exposition | Hall |
| 16 h | Rencontre avec les artistes | Salle 2 |
| 18 h | Concert | Auditorium |
```

## 9. Ajouter un bloc dépliable

Pour une biographie longue, des informations complémentaires ou la transcription d’une interview, utilise `<details>` :

```html
<details>
  <summary>Lire la biographie de l’artiste</summary>
  <p>
    Camille pratique la sculpture depuis 2020 et travaille principalement
    avec du bois récupéré.
  </p>
</details>
```

Le visiteur clique sur le résumé pour afficher le contenu. Dans ce bloc, les paragraphes sont écrits avec `<p>` pour garder une structure HTML simple.

## 10. Choisir entre Markdown et MDX

Un fichier **`.md`** suffit pour tous les exemples de ce tutoriel : texte, images, tableaux, liens et lecteurs HTML.

Un fichier **`.mdx`** permet en plus d’importer et d’utiliser des composants, par exemple une galerie personnalisée ou le composant `DateDure`. MDX est déjà pris en charge dans ce projet.

La police, les couleurs et l’apparence générale des articles sont définies par les styles du site. Le Markdown décrit surtout le contenu et sa structure : tu n’as pas besoin de redéfinir la présentation dans chaque article.

## Documentation pour aller plus loin

- [Markdown dans Astro](https://docs.astro.build/en/guides/markdown-content/)
- [Images dans Astro](https://docs.astro.build/en/guides/images/)
- [Lecteur audio HTML](https://developer.mozilla.org/fr/docs/Web/HTML/Reference/Elements/audio)
- [Lecteur vidéo HTML](https://developer.mozilla.org/fr/docs/Web/HTML/Reference/Elements/video)
- [Lecteur intégré YouTube](https://developers.google.com/youtube/player_parameters)
