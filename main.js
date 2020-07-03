let canvas = document.getElementById("canvasClock");
let ctx = canvas.getContext("2d");

ctx.strokeStyle = "#01cef0";
ctx.lineWidth = 12;
ctx.lineCap = "round";
ctx.shadowBlur = 6;
ctx.shadowColor = "#00d4ff";

function degToRad(degree) {
  let factor = Math.PI / 180;
  return degree * factor;
}

function renderTime() {
  let date = new Date();
  //   let today = date.toDateString();
  let today = new Date().toLocaleDateString("ru", {
    year: "numeric",
    month: "short",
    day: "numeric",
    weekday: "narrow",
  });
  today = today.replace(/,/g, "");
  today = today.charAt(0).toUpperCase() + today.slice(1);
  today = today.slice(0, -3);

  let time = date.toLocaleTimeString();

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let milliSeconds = date.getMilliseconds();
  // transition time
  let transitionSeconds = seconds + milliSeconds / 1000;
  let transitionMinutes = minutes + transitionSeconds / 60;
  let transitionHours = hours + transitionMinutes / 60;

  gradient = ctx.createRadialGradient(200, 200, 20, 200, 200, 400);
  gradient.addColorStop(0, "#000");
  //   gradient.addColorStop(1, "#2d2d30");
  gradient.addColorStop(1, "#2a2a2a ");

  // backgraund
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 400, 400);

  // draw hours
  ctx.beginPath();
  ctx.arc(200, 200, 140, degToRad(270), degToRad(transitionHours * 30 - 90));
  //   ctx.arc(200, 200, 100, Math.PI, false);
  ctx.stroke();

  // draw minutes
  ctx.beginPath();
  ctx.arc(200, 200, 110, degToRad(270), degToRad(transitionMinutes * 6 - 90));
  ctx.stroke();

  // draw seconds

  ctx.beginPath();
  ctx.arc(200, 200, 80, degToRad(270), degToRad(transitionSeconds * 6 - 90));
  ctx.stroke();

  // draw date
  ctx.font = "25px serif";
  ctx.fillStyle = "yellow";
  ctx.fillText(time, 160, 195);

  // draw time
  ctx.font = "11px Arial";
  ctx.fillStyle = "yellow";
  ctx.fillText(today, 165, 230);
}

setInterval(renderTime, 40);
