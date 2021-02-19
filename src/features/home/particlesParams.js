const particlesParams = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: false,
        // value_area: 00,
      },
    },
    size: {
      value:4,
      random: true,
      anim: {
        enable: false,
        speed: 50,
        size_min: 0.1,
        sync: false
      }
    },
    "shape": {
      "type": "circle",
    
      "polygon": {
        "nb_sides": 5
      }},


    opacity: {
      value: 0.4,
      random: false,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.01,
        sync: false
      }
    },

    lineLinked: {
      enable: false,
    },

    move: {
      enable: true,
      speed: 1,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "bounce",
      bounce: true,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
};

export default particlesParams;
