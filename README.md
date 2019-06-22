# <img src="public/brFlag.png" width="25px" /> Yellow Vests - Deep Learning AI
# <img src="public/frFlag.png" width="25px" /> Gilets Jaunes - Deep Learning IA

<img src="public/brFlag.png" width="15px" /> An evolving neural network teaching yellow vests protesters to get french president Macron!

<img src="public/frFlag.png" width="15px" /> Un réseau de neurones évolutif apprenant aux gilets jaunes à aller chercher Macron!

## Online Demo

[Online demo : https://yellow-vest-deep-learning-ia.herokuapp.com/](https://yellow-vest-deep-learning-ia.herokuapp.com/)

## Credits

<img src="public/brFlag.png" width="15px" /> This program is built over [synapticjs](https://caza.la/synaptic/#/) library, and in support to the yellow vest revolutionary movement.

<img src="public/frFlag.png" width="15px" /> Ce programme fut réalisé grâce à la librairie [synapticjs](https://caza.la/synaptic/#/), et en soutien au mouvement révolutionnaire des gilets jaunes

## <img src="public/brFlag.png" width="25px" /> How it works
## <img src="public/frFlag.png" width="25px" /> Fonctionnement

<img src="public/brFlag.png" width="15px" /> Each yellow vest begin with a random brain and the only information given when activating neurons is their distance to Macron, with no idea of what to do (get Macron) nor how to do it (send correct outputs to walk to him). They then evolve at each act and begin to "learn" how to accomplish their task.

<img src="public/frFlag.png" width="15px" /> Chaque gilet jaune commence avec un cerveau aléatoire et la seule information fournie lors de l'activation des neurones est leur distance à Macron, sans aucune idée de quoi faire (aller chercher Macron) ni de comment le faire (fournir les sorties correctes pour marcher vers Macron). Puis ils évoluent à chaque acte et commencent à "apprendre" comment accomplir leur tâche.

## <img src="public/brFlag.png" width="25px" /> Evolution process
## <img src="public/frFlag.png" width="25px" /> Processus évolutif

<img src="public/brFlag.png" width="15px" /> Instead of "learning" by giving datasets and using backpropagation, this project use an approach imitating the evolution. Start with random brains, let them play the game following their outputs, determine a score for each brain, then sort them by this score. Keep the bests brains, drop the others and replace them by crossovers (children) of the bests and mutate the children.

<img src="public/frFlag.png" width="15px" /> Plutôt que "d'apprendre" en fournissant un jeu de données et en utilisant la backpropagation, ce projet utilise une approche imitant l'évolution. Commencer avec des cerveaux aléatoires, les laisser jouer, determiner un score pour chaque cerveau, puis les trier par ce score. Garder les meilleurs, abandonner les autres et les remplacer par des croisements (enfants) des meilleurs et muter les enfants.

## Installation

```bash
git clone https://github.com/lePioo/yellow-vest-deep-learning-ia
cd yellow-vest-deep-learning-ia
npm i
```

## Run

```bash
npm start
```
