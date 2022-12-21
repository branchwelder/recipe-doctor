const nytCooking = {
  title: 'h1[class*="contentTitle"]',
  description: 'div[class*="topnote"] p',
  steps: "li[class*='preparation_step'] p[class*='editorialtext']",
  ingredient: "li[class*='ingredient_ingredient'] span",
  yield: "div[class*='ingredients_recipeYield']",
};

const preset = nytCooking;

function title(node) {
  return node.textContent;
}

function description(node) {
  return node.textContent;
}

function yield(node) {
  return node.textContent;
}

function steps(nodeList) {
  let stepArray = [];
  nodeList.forEach((node) => stepArray.push(node.textContent));
  return stepArray;
}

function ingredients(nodeList) {
  let ingredientArray = [];

  nodeList.forEach((node) => ingredientArray.push(node.textContent));

  let joined = [];
  for (let i = 0; i < ingredientArray.length; i = i + 2) {
    joined.push(`${ingredientArray[i]} ${ingredientArray[i + 1]}`);
  }

  return joined;
}

function h1(text) {
  return `# ${text}\n`;
}

function h2(text) {
  return `## ${text}\n`;
}

function br() {
  return `\n`;
}

function h3(text) {
  return `### ${text}\n`;
}

function bullet(text) {
  return `- ${text}\n`;
}

function number(number, text) {
  return `${number}. ${text}\n`;
}

function paragraph(text) {
  return `${text}\n`;
}

function download(path, filename) {
  const anchor = document.createElement("a");
  anchor.href = path;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

function buildMD(recipe) {
  let marks = `${h1(recipe.title)}${br()}${paragraph(
    recipe.yield
  )}${br()}${paragraph(recipe.description)}${br()}`;

  marks = marks.concat(h2("Ingredients"));
  marks = marks.concat(br());

  for (const ingredient of recipe.ingredients) {
    marks = marks.concat(bullet(ingredient));
  }

  marks = marks.concat(br());
  marks = marks.concat(h2("Instructions"));
  marks = marks.concat(br());

  for (let [index, step] of recipe.steps.entries()) {
    marks = marks.concat(number(index + 1, step));
  }

  marks = marks.concat(br());
  return marks;
}

function init() {
  if (window.hasRun) {
    return;
  }

  window.hasRun = true;

  let recipe = {
    title: "",
    description: "",
    ingredients: "",
    steps: "",
    yield: "",
  };

  function scrapeRecipe() {
    recipe.title = title(document.querySelector(preset.title));
    recipe.description = description(
      document.querySelector(preset.description)
    );
    recipe.steps = steps(document.querySelectorAll(preset.steps));

    recipe.ingredients = ingredients(
      document.querySelectorAll(preset.ingredient)
    );
    recipe.yield = yield(document.querySelector(preset.yield));

    const marked = buildMD(recipe);
    const blob = new Blob([marked], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    download(url, `${recipe.title}.md`);
  }

  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "recipedoctor") {
      scrapeRecipe();
    }
  });
}

init();
