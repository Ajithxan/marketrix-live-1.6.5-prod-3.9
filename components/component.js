console.log("component.js is loaded");
const components = ["widgetButton", "widgetCard", "widgetForm", "controlButton", "overlayLoading", "cursorLoading", "modeControlButton", "videoContainer", "mtxModeScreen", "focusModeScreen", "cursorFrame", "videoFrame", "mtxModeVideoDisable", "mainWidget", "screenShare"];

let componentsFirstIndex = 0;

const loadComponent = () => {
  if (componentsFirstIndex === components.length) return;

  let script = document.createElement("script");

  script.setAttribute("async", "false");
  script.setAttribute("defer", "true");
  script.setAttribute(
    "src",
    `${CDNlink}components/${components[componentsFirstIndex]}.js`
  );

  document.body.append(script);

  script.addEventListener("load", () => {
    componentsFirstIndex += 1;
    loadComponent();
  });
};

// fetch component design
fetch(`${serverBaseUrl}admin/tenant/snippet_json/${appId}`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    if (/true/.test(data.status))
      setToStore("COMPONENT_DATA", JSON.stringify(data.data));
    loadComponent();
  });
