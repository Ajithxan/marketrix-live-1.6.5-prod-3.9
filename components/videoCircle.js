function VideoCircle() {
  //   const Data = [
  //     {
  //       id: "mtxSpntVideoCircle",
  //       theme_color: "red",
  //       videoLink: "sample text",
  //     },
  //   ];

  const html = ` 
   <div class="mtx-snpt-video-circle-comp" onclick="showModal()"> 
      <p>Press Right arrow key  to start the journey 👉🏼 </p>
   <div class="mtx-video-circle"> 
            
   <video muted autoplay loop>
     <source src="{{CDN_LINK}}assets/images/hellovideo.mp4" type="video/mp4">
   </video>
 
`;

  const videoCircle = document.createElement("video-circle");
  videoCircle.innerHTML = html;
  document.body.appendChild(videoCircle);
}

VideoCircle();
