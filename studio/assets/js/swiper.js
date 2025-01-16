var radius = 440; // how big of the radius
var autoRotate = true; // auto rotate or not
var rotateSpeed = -60; // unit: seconds/360 degrees
var imgWidth = 230; // default width of images (unit: px)
var imgHeight = 250; // default height of images (unit: px)

var odrag = document.getElementById("slider__wrapp");
var ospin = document.getElementById("spin-container");
var aImg = ospin.getElementsByTagName("img");
var aVid = ospin.getElementsByTagName("video");
var aEle = [...aImg, ...aVid]; // combine 2 arrays

// Size of ground - depend on radius
var ground = document.getElementById("ground");
ground.style.width = radius * 3 + "px";
ground.style.height = radius * 3 + "px";

// Функция для изменения размеров изображений в зависимости от ширины окна
function updateImageSizes() {
  if (window.innerWidth < 371) {
    imgWidth = 100; // width of images for smallest screens
    imgHeight = 120; // height of images for smallest screens
    radius = 150; // radius for smallest screens
  } else if (window.innerWidth < 411) {
    imgWidth = 100; // width of images for smallest screens
    imgHeight = 120; // height of images for smallest screens
    radius = 180; // radius for smallest screens
  } else if (window.innerWidth < 461) {
    imgWidth = 120; // width of images for smaller screens
    imgHeight = 140; // height of images for smaller screens
    radius = 200; // radius for smaller screens
  } else if (window.innerWidth < 531) {
    imgWidth = 130; // width of images for medium-small screens
    imgHeight = 150; // height of images for medium-small screens
    radius = 240; // radius for medium-small screens
  } else if (window.innerWidth < 767) {
    imgWidth = 150; // width of images for small screens
    imgHeight = 170; // height of images for small screens
    radius = 260; // radius for small screens
  } else {
    imgWidth = 230; // default width of images
    imgHeight = 250; // default height of images
    radius = 440; // default radius
  }

  ospin.style.width = imgWidth + "px";
  ospin.style.height = imgHeight + "px";

  for (var i = 0; i < aEle.length; i++) {
    aEle[i].style.width = imgWidth + "px";
    aEle[i].style.height = imgHeight + "px";
    aEle[i].style.transform = "rotateY(" + i * (360 / aEle.length) + "deg) translateZ(" + radius + "px)";
  }

  ground.style.width = radius * 3 + "px";
  ground.style.height = radius * 3 + "px";
}

// ===================== start =======================
setTimeout(() => {
  init(1000);
  updateImageSizes();
}, 1000);

function init(delayTime) {
  for (var i = 0; i < aEle.length; i++) {
    aEle[i].style.transform = "rotateY(" + i * (360 / aEle.length) + "deg) translateZ(" + radius + "px)";
    aEle[i].style.transition = "transform 1s";
    aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + "s";
  }
}

function applyTranform(obj) {
  if (tY > 180) tY = 180;
  if (tY < 0) tY = 0;
  obj.style.transform = "rotateX(" + -tY + "deg) rotateY(" + tX + "deg)";
}

function playSpin(yes) {
  ospin.style.animationPlayState = yes ? "running" : "paused";
}

var sX, sY, nX, nY, desX = 0, desY = 0, tX = 0, tY = 10;

// auto spin
if (autoRotate) {
  var animationName = rotateSpeed > 0 ? "spin" : "spinRevert";
  ospin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
}

// setup events
odrag.onpointerdown = function (e) {
  clearInterval(odrag.timer);
  e = e || window.event;
  var sX = e.clientX, sY = e.clientY;

  document.onpointermove = function (e) {
    e = e || window.event;
    var nX = e.clientX, nY = e.clientY;
    desX = nX - sX;
    desY = nY - sY;
    tX += desX * 0.1;
    tY += desY * 0.1;
    applyTranform(odrag);
    sX = nX;
    sY = nY;
  };

  document.onpointerup = function (e) {
    odrag.timer = setInterval(function () {
      desX *= 0.95;
      desY *= 0.95;
      tX += desX * 0.1;
      tY += desY * 0.1;
      applyTranform(odrag);
      playSpin(false);
      if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
        clearInterval(odrag.timer);
        playSpin(true);
      }
    }, 17);
    document.onpointermove = document.onpointerup = null;
  };
};

odrag.onmousewheel = function (e) {
  e = e || window.event;
  var d = e.wheelDelta / 20 || -e.detail;
  radius += d;
  init(1);
};

window.addEventListener('resize', updateImageSizes);
document.addEventListener('DOMContentLoaded', () => {
  // Make sure the elements with these IDs exist in the HTML
  const enlargedSection = document.getElementById('enlarged-section');
  const enlargedImage = document.getElementById('enlarged-image');
  const closeButton = document.getElementById('close-button');
  const aImg = document.querySelectorAll('#spin-container img');

  // Check if the elements exist
  if (!enlargedSection || !enlargedImage || !closeButton) {
    console.error('One or more elements are missing');
    return;
  }

  // Adding click event listeners to images inside the spin-container
  Array.from(aImg).forEach(img => {
    img.addEventListener('click', (e) => {
      e.stopPropagation();
      
      // Ensure playSpin is defined
      if (typeof playSpin !== 'function') {
        console.error('playSpin function is not defined');
        return;
      }
      
      playSpin(false);
      enlargedImage.src = img.src;
      enlargedSection.style.display = 'flex';
      
      // Small delay to allow the browser to repaint and add the 'show' class
      setTimeout(() => {
        enlargedSection.classList.add('show');
      }, 10);
    });
  });

  // Function to close the enlarged section
  const closeEnlargedSection = () => {
    enlargedSection.classList.remove('show');
    setTimeout(() => {
      enlargedSection.style.display = 'none';
      playSpin(true);
    }, 500);
  };

  // Adding click event listener to the close button
  closeButton.addEventListener('click', (e) => {
    e.stopPropagation();
    closeEnlargedSection();
  });

  // Adding click event listener to the document to close the enlarged section
  document.addEventListener('click', closeEnlargedSection);

  // Prevent propagation of click events on enlargedSection and enlargedImage
  enlargedSection.addEventListener('click', (e) => {
    e.stopPropagation();
  });
  enlargedImage.addEventListener('click', (e) => {
    e.stopPropagation();
  });
});
