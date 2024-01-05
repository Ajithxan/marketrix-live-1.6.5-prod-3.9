const configurationController = {
  view: async () => {
    videoConfigDiv = document.createElement("div");
    videoConfigDiv.setAttribute("id", "video-sdk-config");
    document.body.prepend(videoConfigDiv);
    style.hide(mtxConnectBtn);
    style.show(mtxEndCallBtn);
    // style.hide(videoConfigDiv)

    await fetch(`${CDNlink}view/configuration.html`)
      .then((response) => {
        return response.text();
      })
      .then((html) => {
        videoConfigDiv.innerHTML = html.replaceAll("{{CDN_LINK}}", CDNlink); // rendering
        mtxConfigurationComponent = document.getElementById(
          "mtx-configuration-component"
        );
      });

    setTimeout(() => {
      configurationController.render();
    }, 350);
  },
  render: () => {
    videoContainer = document.getElementById("mtx-video-container");
    configurationCoverDiv = document.getElementById("mtx-configuration-cover");
    mtxControlButton = document.getElementById("mtx-control-button");
    style.hide(configurationCoverDiv); // default hide
    gridScreenDiv = document.getElementById("mtx-grid-screen");
    style.hide(gridScreenDiv); // default hide
    cursorLoading = document.getElementById("cursor-loading");
    mtxOverlayLoading = document.getElementById("mtx-overlay-loading");
    style.hide(mtxOverlayLoading); // default hide
    mtxLoadingMessageDiv = document.getElementById("mtx-loading-message");
    mtxModeBtn = document.getElementById("marketrix-mode-btn");
    style.hide(mtxModeBtn); // default hide
    focusModeBtn = document.getElementById("focus-mode-btn");
    showCursorDiv = document.getElementById("show-cursor");
    style.hide(showCursorDiv); // default hide
    marketrixButton && style.hide(marketrixButton);
    mouse.loading.show();
    setCDNLink();
    setTimeout(() => {
      meetingObj.joinMeeting();
    }, 1000);
  },
  createLocalParticipant: (meetingObj, videoContainer) => {
    // let localParticipant = meetingObj.createVideoElement(
    //   meetingObj.meeting.localParticipant.id,
    //   meetingObj.meeting.localParticipant.displayName
    // );
    meetingVariables.participant.localId =
      meetingObj.meeting.localParticipant.id;
    setToStore("MEETING_VARIABLES", JSON.stringify(meetingVariables)); // store meeting variables
    // let localAudioElement = meetingObj.createAudioElement(
    //   meetingObj.meeting.localParticipant.id
    // );
    // videoContainer.append(localParticipant);
    // videoContainer.append(localAudioElement);

    let videoFrameComponent = document.createElement("video-frame");
    videoFrameComponent.setAttribute(
      "participant-id",
      meetingObj.meeting.localParticipant.id
    );
    videoFrameComponent.setAttribute(
      "participant-name",
      meetingObj.meeting.localParticipant.displayName
    );
    videoFrameComponent.setAttribute("is-local-user", true);
    videoContainer.append(videoFrameComponent);
  },
  audioElement: (pId) => {
    // let audioElement = document.createElement("audio");
    // audioElement.setAttribute("autoPlay", "false");
    // audioElement.setAttribute("playsInline", "true");
    // audioElement.setAttribute("controls", "false");
    // audioElement.setAttribute("id", `a-${pId}`);
    // style.hide(audioElement);
    // return audioElement;
  },
  setTrack: (stream, participant, isLocal) => {
    if (stream.kind == "video") {
      meetingObj.isWebCamOn = true;
      const mediaStream = new MediaStream();
      mediaStream.addTrack(stream.track);
      console.log("Stream.strack video", stream.track);
      // mtx mode video element
      let mtxModeVideoElem = document.getElementById(
        `mtx-mode-video-elem-${participant.id}`
      );
      if (mtxModeVideoElem) {
        mtxModeVideoElem.srcObject = mediaStream;
        mtxModeVideoElem
          .play()
          .catch((error) =>
            console.error("videoElem.current.play() failed", error)
          );
        console.log(mtxModeVideoElem);
      }

      // focus mode video element
      let focusModeVideoElem = document.getElementById(
        `focus-mode-video-elem-${participant.id}`
      );
      if (focusModeVideoElem) {
        focusModeVideoElem.srcObject = mediaStream;
        focusModeVideoElem
          .play()
          .catch((error) =>
            console.error("focus-mode-video-elem.current.play() failed", error)
          );
      }
    }
    if (stream.kind == "audio") {
      if (isLocal) {
        isMicOn = true;
      } else {
        let audioElement = document.createElement("audio");
        const mediaStream = new MediaStream();
        mediaStream.addTrack(stream.track);
        console.log("audio stream.track", stream.track);
        audioElement.srcObject = mediaStream;
        audioElement
          .play()
          .catch((error) => console.error("audioElem.play() failed", error));
      }
    }
  },
  screenShare: () => {
    meetingObj.meeting?.enableScreenShare();
  },
  enableScreenShare: (pId, stream) => {
    // if (pId === meetingVariables.participant.localId) return;
    // console.log("stream.kind", stream.kind);
    // console.log("participant id", pId);
    mtxScreenShareEnbale = true;
    let videoElement = document.getElementById(`mtx-video-share-elem-${pId}`);
    style.show(videoElement);
    const mediaStream = new MediaStream();
    // console.log("media stream", mediaStream);
    mediaStream.addTrack(stream.track);
    console.log(console.log("stream.track", stream.track));
    videoElement.srcObject = mediaStream;
    videoElement
      .play()
      .catch((error) => console.error("videoshareelem.play() failed", error));
  },
  disableScreenShare: (pId, stream) => {
    // console.log(pId, stream);
    // if (pId === meetingVariables.participant.localId) return;
    mtxScreenShareEnbale = false;
    let videoElement = document.getElementById(`mtx-video-share-elem-${pId}`);
    style.hide(videoElement);
    videoElement.innerHTML = "";
  },
  record: () => {
    meetingObj.meeting?.startRecording({
      // layout: {
      //   type: "GRID",
      //   priority: "SPEAKER",
      //   gridSize: 4,
      // },
      theme: "DARK",
      mode: "video",
      quality: "high",
      orientation: "landscape",
    });
  },
  stopRecord: () => {
    meetingObj.meeting?.stopRecording();
  },
  stopShare: () => {},
  mic: {
    disable: () => {
      meetingObj.meeting?.muteMic();
      micIconElem.classList.add("fa");
      micIconElem.classList.add("fa-microphone-slash");
      if (mtxModeai) mtxModeai.classList.add("fa");
      if (mtxModeai) mtxModeai.classList.add("fa-microphone-slash");
      if (focusModeai) focusModeai.classList.add("fa");
      if (focusModeai) focusModeai.classList.add("fa-microphone-slash");

      micIconElem.classList.remove("fa-solid");
      micIconElem.classList.remove("fa-microphone");
      if (mtxModeai) mtxModeai.classList.remove("fa-microphone");
      if (mtxModeai) mtxModeai.classList.remove("fa-microphone");
      if (focusModeai) focusModeai.classList.remove("fa-microphone");
      if (focusModeai) focusModeai.classList.remove("fa-microphone");
    },
    enable: () => {
      meetingObj.meeting?.unmuteMic();
      micIconElem.classList.add("fa-solid");
      micIconElem.classList.add("fa-microphone");
      if (mtxModeai) mtxModeai.classList.add("fa-solid");
      if (mtxModeai) mtxModeai.classList.add("fa-microphone");
      if (focusModeai) focusModeai.classList.add("fa-solid");
      if (focusModeai) focusModeai.classList.add("fa-microphone");

      micIconElem.classList.remove("fa");
      micIconElem.classList.remove("fa-microphone-slash");
      if (mtxModeai) mtxModeai.classList.remove("fa");
      if (mtxModeai) mtxModeai.classList.remove("fa-microphone-slash");
      if (focusModeai) focusModeai.classList.remove("fa");
      if (focusModeai) focusModeai.classList.remove("fa-microphone-slash");
    },
  },
  webcam: {
    disable: () => {
      meetingObj.meeting?.disableWebcam();
      webCamIconElem.classList.add("fa-solid");
      webCamIconElem.classList.add("fa-video-slash");
      webCamIconElem.classList.remove("fas");
      webCamIconElem.classList.remove("fa-video");
      const mtxModeVideoDisabledImageOfAdmin = document.getElementById(
        `mtx-mode-video-disable-image-${localId}`
      );
      const focusModeVideoDisabledImageOfAdmin = document.getElementById(
        `focus-mode-video-disable-image-${localId}`
      );
      if (meetingVariables.userRole === "admin") {
        console.log(mtxModeVideoDisabledImageOfAdmin);
        if (mtxModeVideoDisabledImageOfAdmin)
          mtxModeVideoDisabledImageOfAdmin.setAttribute(
            "src",
            adminVideoDisabledImage
          ); // set admin profile image here
        if (focusModeVideoDisabledImageOfAdmin)
          focusModeVideoDisabledImageOfAdmin.setAttribute(
            "src",
            adminVideoDisabledImage
          ); // set admin profile image here
      }
      if (document.getElementById(`mtx-mode-video-elem-${localId}`))
        style.hide(document.getElementById(`mtx-mode-video-elem-${localId}`));
      if (document.getElementById(`mtx-mode-video-disable-${localId}`))
        style.show(
          document.getElementById(`mtx-mode-video-disable-${localId}`)
        );
      if (document.getElementById(`focus-mode-video-elem-${localId}`))
        style.hide(document.getElementById(`focus-mode-video-elem-${localId}`));
      if (document.getElementById(`focus-mode-video-disable-${localId}`))
        style.show(
          document.getElementById(`focus-mode-video-disable-${localId}`)
        );
    },
    enable: () => {
      meetingObj.meeting?.enableWebcam();
      webCamIconElem.classList.remove("fa-solid");
      webCamIconElem.classList.remove("fa-video-slash");
      webCamIconElem.classList.add("fas");
      webCamIconElem.classList.add("fa-video");
      if (document.getElementById(`mtx-mode-video-elem-${localId}`))
        style.show(document.getElementById(`mtx-mode-video-elem-${localId}`));
      if (document.getElementById(`mtx-mode-video-disable-${localId}`))
        style.hide(
          document.getElementById(`mtx-mode-video-disable-${localId}`)
        );
      if (document.getElementById(`focus-mode-video-elem-${localId}`))
        style.show(document.getElementById(`focus-mode-video-elem-${localId}`));
      if (document.getElementById(`focus-mode-video-disable-${localId}`))
        style.hide(
          document.getElementById(`focus-mode-video-disable-${localId}`)
        );
    },
  },
  audioStreamEnable: () => {
    if (mtxModeai) mtxModeai.classList.remove("fa");
    if (mtxModeai) mtxModeai.classList.remove("fa-microphone-slash");
    if (mtxModeai) mtxModeai.classList.add("fa-solid");
    if (mtxModeai) mtxModeai.classList.add("fa-microphone");
    if (focusModeai) focusModeai.classList.remove("fa");
    if (focusModeai) focusModeai.classList.remove("fa-microphone-slash");
    if (focusModeai) focusModeai.classList.add("fa-solid");
    if (focusModeai) focusModeai.classList.add("fa-microphone");
  },
  audioStreamDisable: () => {
    mtxModeai.classList.add("fa");
    mtxModeai.classList.add("fa-microphone-slash");
    mtxModeai.classList.remove("fa-solid");
    mtxModeai.classList.remove("fa-microphone");
    focusModeai.classList.add("fa");
    focusModeai.classList.add("fa-microphone-slash");
    focusModeai.classList.remove("fa-solid");
    focusModeai.classList.remove("fa-microphone");
  },
  videoStreamEnable: () => {
    console.log("remoteId =>", remoteId);
    const mtxModeVideoElem = document.getElementById(
      `mtx-mode-video-elem-${remoteId}`
    );
    const mtxModeVideoDisable = document.getElementById(
      `mtx-mode-video-disable-${remoteId}`
    );
    const focusModeVideoElem = document.getElementById(
      `focus-mode-video-elem-${remoteId}`
    );
    const focusModeVideoDisable = document.getElementById(
      `focus-mode-video-disable-${remoteId}`
    );

    if (mtxModeVideoElem) style.show(mtxModeVideoElem);
    if (mtxModeVideoDisable) style.hide(mtxModeVideoDisable);
    if (focusModeVideoElem) style.show(focusModeVideoElem);
    if (focusModeVideoDisable) style.hide(focusModeVideoDisable);
  },
  videoStreamDisable: () => {
    if (meetingVariables.userRole === "visitor") {
      const mtxModeVideoDisabledImageOfAdmin = document.getElementById(
        `mtx-mode-video-disable-image-${remoteId}`
      );
      const focusModeVideoDisabledImageOfAdmin = document.getElementById(
        `focus-mode-video-disable-image-${remoteId}`
      );
      mtxModeVideoDisabledImageOfAdmin.setAttribute(
        "src",
        adminVideoDisabledImage
      ); // set admin profile here
      focusModeVideoDisabledImageOfAdmin.setAttribute(
        "src",
        adminVideoDisabledImage
      ); // set admin profile here
    }

    const mtxModeVideoElem = document.getElementById(
      `mtx-mode-video-elem-${remoteId}`
    );
    const mtxModeVideoDisable = document.getElementById(
      `mtx-mode-video-disable-${remoteId}`
    );
    const focusModeVideoElem = document.getElementById(
      `focus-mode-video-elem-${remoteId}`
    );
    const focusModeVideoDisable = document.getElementById(
      `focus-mode-video-disable-${remoteId}`
    );

    if (mtxModeVideoElem) style.hide(mtxModeVideoElem);
    if (mtxModeVideoDisable) style.show(mtxModeVideoDisable);
    if (focusModeVideoElem) style.hide(focusModeVideoElem);
    if (focusModeVideoDisable) style.show(focusModeVideoDisable);
  },
  getWindowSize: () => {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  },
  setCDNLink: () => {
    const links = document.getElementsByTagName("link");
    const imgs = document.getElementsByTagName("img");
    // change all href
    for (const link of links) {
      let linkAttr = link.getAttribute("href").replace("{{CDN_LINK}}", CDNlink);
      link.setAttribute("href", linkAttr);
    }
    // change all src
    for (const img of imgs) {
      let imgSrc = img.getAttribute("src").replace("{{CDN_LINK}}", CDNlink);
      img.setAttribute("src", imgSrc);
    }
  },
  setUserRole: () => {
    const url = currentUrl;
    const queryString = new URL(url).searchParams.get("marketrix-meet");
    if (queryString != null) {
      const decodedString = decodeURIComponent(queryString);
      decodedObject = JSON.parse(decodedString);
      meetingVariables.userRole = decodedObject.userRole;
    }

    if (getFromStore("MEETING_VARIABLES")) {
      meetingStoredVariables = JSON.parse(getFromStore("MEETING_VARIABLES"));
      meetingVariables.userRole = meetingStoredVariables.userRole;
    }
  },
  getUtmInfo: async () => {
    var utmParams = {};
    var queryString = window.location.search.substring(1);
    var params = queryString.split("&");

    for (var i = 0; i < params.length; i++) {
      var pair = params[i].split("=");
      var key = decodeURIComponent(pair[0]);
      var value = decodeURIComponent(pair[1]);

      if (key.indexOf("utm_") === 0) {
        utmParams[key] = value;
      }
    }
    utmInfo = utmParams;
  },
  getQuery: () => {
    if (getFromStore("MEETING_VARIABLES")) return; // these data already stored
    const url = currentUrl;
    const queryString = new URL(url).searchParams.get("marketrix-meet");

    if (queryString != null) {
      const decodedString = decodeURIComponent(queryString);

      // Parse the decoded string as a JavaScript object
      decodedObject = JSON.parse(decodedString);

      if (decodedObject?.userRole === "admin") {
        firstTimeAdminRequest = true;
        decodedObject.cursorId = cursorId;
        setToStore("DECODED_OBJECT", JSON.stringify(decodedObject)); // store decoded object
        meetingVariables.id = decodedObject.meetingId;
        meetingVariables.token = decodedObject.token;
        meetingVariables.name = decodedObject.userName;
        meetingVariables.userRole = decodedObject.userRole;
        meetingVariables.adminToken = decodedObject.adminToken;
        meetingVariables.inquiryId = decodedObject.inquiryId;
        hideRemoteCursor = true;
        adminJoin();
      }
    }
  },
  getIpAddress: async () => {
    await fetch("https://api.ipify.org/?format=json")
      .then((response) => response.json())
      .then(async (data) => {
        ipAddress = data.ip;
      });
  },
  getCountry: async (ipAddress) => {
    await fetch(`https://ipapi.co/${ipAddress}/json/`)
      .then((response) => response.json())
      .then(async (data) => {
        country = await data.country_name;
        ipData = await data;
      });
  },
  checkUrlChanges: () => {
    isUrlChanged = false;
    if (getFromStore("CURRENT_URL")) {
      if (currentUrl !== getFromStore("CURRENT_URL")) isUrlChanged = true;
    }
  },
  checkMeetingVariables: () => {
    if (getFromStore("MEETING_VARIABLES")) {
      console.log("checkMeetingVariables");
      meetingStoredVariables = JSON.parse(getFromStore("MEETING_VARIABLES"));
      meetingVariables.id = meetingStoredVariables.id;
      meetingVariables.name = meetingStoredVariables.name;
      meetingVariables.participant = meetingStoredVariables.participant;
      meetingVariables.token = meetingStoredVariables.token;
      meetingVariables.userRole = meetingStoredVariables.userRole;
      meetingVariables.adminToken = meetingStoredVariables.adminToken;
      meetingVariables.inquiryId = meetingStoredVariables.inquiryId;

      if (isUrlChanged) {
        setToStore("LOADING_MESSAGE", "Redirecting...");
        SOCKET.emit.urlChange();
      } // emit url changes

      if (meetingVariables.userRole === "admin") {
        firstTimeAdminRequest = false;
        decodedObject = JSON.parse(getFromStore("DECODED_OBJECT"));
        adminJoin();
      } else {
        visitorJoin();
      }
    }
  },
  hideElement: (ele) => {
    style.hide(ele);
  },
  showElement: (ele) => {
    style.show(ele);
  },
};
