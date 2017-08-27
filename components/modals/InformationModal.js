export default class InformationModal {
  constructor(container) {
    this.container = container;
    this.informationModalBackdrop = document.getElementById("informationModalBackdrop");
    this.informationModal = document.getElementById("informationModal");
    this.demoButton = document.getElementById("demoButton");
    this.newGridButton = document.getElementById("newGridButton");

    this.informationModal.style.display = 'none';
    this.informationModalBackdrop.style.display = 'none';
  }

  toggleInformationModal() {
    if (!this.container.pauseEvent) this.container.handlePauseEvent();

    // modalBackdrop.style.display = 'none';
    this.informationModalBackdrop.style.display = 'flex';
    this.informationModal.style.display = 'flex';
    // cellLogicControls.style.zIndex = 0;
  }

  handleInformationModalBehavior() {

    const particleEffect = () => {
      const colors = {
        aqua: "#00ffff",
        azure: "#f0ffff",
        beige: "#f5f5dc",
        blue: "#0000ff",
        brown: "#a52a2a",
        cyan: "#00ffff",
        darkblue: "#00008b",
        darkcyan: "#008b8b",
        darkgrey: "#a9a9a9",
        darkgreen: "#006400",
        darkkhaki: "#bdb76b",
        darkmagenta: "#8b008b",
        darkolivegreen: "#556b2f",
        darkorange: "#ff8c00",
        darkorchid: "#9932cc",
        darkred: "#8b0000",
        darksalmon: "#e9967a",
        darkviolet: "#9400d3",
        fuchsia: "#ff00ff",
        gold: "#ffd700",
        green: "#008000",
        indigo: "#4b0082",
        khaki: "#f0e68c",
        lightblue: "#add8e6",
        lightcyan: "#e0ffff",
        lightgreen: "#90ee90",
        lightpink: "#ffb6c1",
        lightyellow: "#ffffe0",
        lime: "#00ff00",
        magenta: "#ff00ff",
        maroon: "#800000",
        navy: "#000080",
        olive: "#808000",
        orange: "#ffa500",
        pink: "#ffc0cb",
        purple: "#800080",
        violet: "#800080",
        red: "#ff0000",
        silver: "#c0c0c0",
        yellow: "#ffff00"
      };

      const generateParticle = () => {
        const getRandomInt = (min, max) => {
          min = Math.ceil(min);
          max = Math.floor(max);
          return Math.floor(Math.random() * (max - min)) + min;
        };

        const size = getRandomInt(10, 40);
        const randomColor = Object.values(colors)[Math.floor(Math.random() * Object.values(colors).length)];

        const box = document.createElement('div');

        box.style.width = `${size}px`;
        box.style.height = `${size}px`;
        box.style.left = `${getRandomInt(0, window.innerWidth)}px`;
        box.style.bottom = `${getRandomInt(0, window.innerWidth)}px`;
        box.classList.add("particle");
        box.style.backgroundColor = randomColor;
        this.informationModalBackdrop.appendChild(box);

        setTimeout(() => {
          box.style.webkitAnimationName = 'boxFadeOut';
          box.style.webkitAnimationDuration= '1s';
        }, 1600);

        setTimeout(() => {
          box.parentNode.removeChild(box);
        }, 2000);
      };

      generateParticle();
    };

    // const changeHash = hash => {
    //   conditionalHash = hash;
    //   container = new Container(mainCanvas, mainCtx, conditionalHash);
    //
    //   const populateGridDimensions = () => {
    //     const possibleDimensions = container.gridDimensions.sort((a, b) => a - b);
    //
    //     possibleDimensions.reverse().forEach(num => {
    //       const widthOption = document.createElement('option');
    //       widthOption.value = num;
    //       widthOption.text = num;
    //
    //       const heightOption = document.createElement('option');
    //       heightOption.value = num;
    //       heightOption.text = num;
    //
    //       currentWidth.add(widthOption);
    //       currentHeight.add(heightOption);
    //     });
    //
    //     currentWidth.value = container.width;
    //     currentHeight.value = container.height;
    //   };
    //
    //   informationModal.style.display = 'none';
    //   informationModalBackdrop.style.display = 'none';
    //   gridControls.style.display = 'flex';
    //
    //   clearInterval(particleEffect, 40);
    //
    //   handleResetEvent();
    //   cellControlBar.populateTypeContainers();
    //   populateGridDimensions();
    //   cellControlBar.showCellTypeContainers();
    // };

    setInterval(particleEffect, 40);
  }
}
