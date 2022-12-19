function reportExecuteScriptError(error) {
  console.error(`Failed to doctor recipe: ${error.message}`);
}

document.querySelector("#grabber").addEventListener("click", (e) => {
  browser.tabs
    .executeScript({ file: "/content_scripts/recipe-doctor.js" })
    .catch(reportExecuteScriptError);
});
