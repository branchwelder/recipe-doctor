class Recipe {
  constructor() {
    this.name = null;
    this.description = null;
    this.ingredients = null;
    this.steps = null;
    this.source = null;
    this.url = null;
    this.dateAdded = null;
    this.author = null;
    this.notes = null;
    this.yield = null;
    this.time = null;
  }
}

class Ingredient {
  constructor() {
    this.amount = null;
    this.unit = null;
    this.item = null;
  }
}

console.log("====== HELLO FROM THE RECIPE DOWNLOADER! ======");

const nytCooking = {
  title: 'h1[class*="contentTitle"]',
  description: 'div[class*="topnote"] p',
  steps: "li[class*='preparation_step'] p[class*='editorialtext']",
  ingredient: "li[class*='ingredient_ingredient']",
};

const preset = nytCooking;

function title(node) {
  return node.textContent;
}

function description(node) {
  return node.textContent;
}

function steps(nodeList) {
  let stepArray = [];
  nodeList.forEach((node) => stepArray.push(node.textContent));
  return stepArray;
}

function ingredients(nodeList) {
  let ingredientArray = [];

  nodeList.forEach((node) => stepArray.push(node.textContent));

  return ingredientArray;
}

let recipe = new Recipe();

recipe.title = title(document.querySelector(preset.title));
recipe.description = description(document.querySelector(preset.description));
recipe.steps = steps(document.querySelectorAll(preset.steps));
recipe.ingredients = ingredients(document.querySelectorAll(preset.steps));

console.log(recipe);
