$(() => {
  const information = $("#info");
  // eslint-disable-next-line no-undef
  information.text(`This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`);

  const response = window.versions.ping();
  console.log(response); // prints out 'pong'
});