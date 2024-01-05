const notification = {
  salesPersonNotifyVisitor: () => {
    let name;
    let message;

    if (adminName) {
      name = adminName
      setToStore("ADMIN_NAME", adminName)
    }
    else if (!adminName) name = getFromStore("ADMIN_NAME")

    if (adminMessage) {
      message = adminMessage
      setToStore("ADMIN_MESSAGE", adminMessage)
    } else if (!adminMessage) message = getFromStore("ADMIN_MESSAGE")

    const customMsg = `<div class="mtx-snpt-flex-box-center">
                          <p class="agent-msg"> Hi, I'm ${name}</p> 
                          <p class='custom-msg'>${message}</p>
                      </div>`;
    document.getElementById("admin-message").innerHTML = customMsg;
    showModal();
    style.hide(document.getElementById("mtx-footer-controls"));
    style.show(document.getElementById(
      "mtx-live-connect-call-div"
    ));
    style.show(document.getElementById("mtx-admin-grid-screen"));
  },
};
