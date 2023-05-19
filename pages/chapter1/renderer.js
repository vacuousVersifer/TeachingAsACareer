$(() => {
  // const information = $("#info");
  // // eslint-disable-next-line no-undef
  // information.text(`This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`);

  // const response = window.versions.ping();
  // console.log(response); // prints out 'pong'

  for(let i = 1; i <= 12; i++) {
    let button = $(`#ch${i}`);
    button.on("click", e => {
      e.preventDefault();
      // eslint-disable-next-line no-undef
      pageHandler.open(`chapter${i}`);
    });
  }
});