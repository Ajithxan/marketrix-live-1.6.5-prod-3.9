const meetVersion = "1.6.5-prod-2.5";
const CDNlink = `https://cdn.jsdelivr.net/gh/Ajithxan/marketrix-live-${meetVersion}/` //'http://localhost/creativehub/marketrix-live-1.6.5-prod-2.4/' // `http://localhost/marketrix-live-1.6.5-prod-2.4/`
console.log(CDNlink);
const startingTime = new Date().getTime();
const fontAwesomeCDNLink = document.createElement("link");

// stylesheet links
fontAwesomeCDNLink.setAttribute("rel", "stylesheet");
fontAwesomeCDNLink.setAttribute(
  "href",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
);

// header link
document.head.prepend(fontAwesomeCDNLink);

// scripts are ordered according to the loading process.
const scriptArr = [
  `${CDNlink}constants/env.js`,
  `${CDNlink}utils/store.js`,
  `${CDNlink}utils/socket.js`,
  `${CDNlink}utils/variables.js`,
  "https://sdk.videosdk.live/js-sdk/0.0.67/videosdk.js",
  "https://cdn.socket.io/4.6.0/socket.io.min.js",
  `${CDNlink}utils/style.js`,
  `${CDNlink}utils/render.js`,
  `${CDNlink}controller/controller.js`,
  `${CDNlink}route/route.js`,
  `${CDNlink}components/component.js`,
  `${CDNlink}utils/meeting.js`,
  `${CDNlink}utils/mouse.js`,
  `${CDNlink}utils/watch.js`,
  `${CDNlink}utils/form.js`,
  `${CDNlink}utils/modal.js`,
  `${CDNlink}utils/main.js`,
];

let scriptArrFirstIndex = 0;

const loadScript = () => {
  if (scriptArrFirstIndex === scriptArr.length) {
    console.log("all scripts are loaded");
    return;
  }

  let script = document.createElement("script");

  script.setAttribute("async", "false");
  script.setAttribute("defer", "true");
  script.setAttribute("src", scriptArr[scriptArrFirstIndex]);

  document.body.append(script);

  script.addEventListener("load", () => {
    scriptArrFirstIndex += 1;
    loadScript();
  });
};

loadScript();

const appId = document.currentScript.getAttribute("marketrix-id");
const apiKey = document.currentScript.getAttribute("marketrix-key");

let geoLocation = {
  accuracy: 1275.102691209434,
  altitude: null,
  altitudeAccuracy: null,
  heading: null,
  latitude: 6.8681728,
  longitude: 79.8687232,
  speed: null,
};

let ipAddress;
