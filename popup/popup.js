function reportOnCallError(error) {
  console.error(`Couldn't put the recipe doctor on call: ${error.message}`);
}

function callDoctor(tabs) {
  console.log("Attempting to call the recipe doctor.");
  browser.tabs.sendMessage(tabs[0].id, {
    command: "recipedoctor",
  });
}

function putDoctorOnCall() {
  function reportError(error) {
    console.error(`Could not call the doctor :( ${error}`);
  }

  document.querySelector("#call-doctor").addEventListener("click", (e) => {
    browser.tabs
      .query({ active: true, currentWindow: true })
      .then(callDoctor)
      .catch(reportError);
  });
}

browser.tabs
  .executeScript({ file: "/content_scripts/recipe-doctor.js" })
  .then(putDoctorOnCall)
  .catch(reportOnCallError);
