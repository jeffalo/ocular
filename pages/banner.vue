<template>
  <div class="container">
    <Header :crumbs="[{ link: `/banner`, text: 'banner generator' }]" />
    <div class="margined">
      <h1>somewhat unnecessary banner generator</h1>
      <p>
        requires arial font installed for the end result to be accurate. thanks
        fdreerf for the numbers.
      </p>
      <hr />
      <h2>heading</h2>
      <input type="text" v-model="heading" @input="draw()" />
      <input type="text" v-model="headingSize" @input="draw()" />
      <input type="text" v-model="headingPos[0]" @input="draw()" />
      <input type="text" v-model="headingPos[1]" @input="draw()" />
      <hr />
      <h2>subtitle</h2>
      <input type="text" v-model="subtitle" @input="draw()" />
      <input type="text" v-model="subtitleSize" @input="draw()" />
      <input type="text" v-model="subtitlePos[0]" @input="draw()" />
      <input type="text" v-model="subtitlePos[1]" @input="draw()" />
      <hr />
      <h2>link</h2>
      <input type="text" v-model="link" @input="draw()" />
      <input type="text" v-model="linkSize" @input="draw()" />
      <input type="text" v-model="linkPos[0]" @input="draw()" />
      <input type="text" v-model="linkPos[1]" @input="draw()" />
      <hr />
      <canvas
        ref="canvas"
        width="1800"
        height="400"
        style="width: 90%"
      ></canvas>
      <br />
      download by right clicking
      <Footer />
    </div>
  </div>
</template>

<script>
import banner from "~/assets/banner-blank.png";

export default {
  data() {
    return {
      width: 0,
      height: 0,
      heading: "ocular",
      headingSize: "200pt",
      headingPos: [1764, 224],
      subtitle: "forum search, statistics and more",
      subtitleSize: "50pt",
      subtitlePos: [1720, 290],
      link: "ocular.jeffalo.net",
      linkSize: "30pt",
      linkPos: [1715, 340],
      canvas: null,
      image: null,
    };
  },
  methods: {
    draw() {
      let canvas = this.canvas;
      let bg = new Image();

      bg.onload = () => {
        canvas.fillStyle = "#0FBD8C";
        canvas.fillRect(0, 0, this.width, this.height);

        canvas.drawImage(bg, 0, 0);
        canvas.fillStyle = "white";

        // heading
        canvas.textAlign = "right";
        canvas.font = `bold ${this.headingSize} Arial`;
        canvas.fillText(this.heading, ...this.headingPos);

        // subtitle
        canvas.font = `italic ${this.subtitleSize} Arial`;
        canvas.fillText(this.subtitle, ...this.subtitlePos);

        // link
        canvas.font = `${this.linkSize} Arial`;
        canvas.fillText(this.link, ...this.linkPos);
      };
      bg.src = banner;
    },
  },
  mounted() {
    var canvas = this.$refs.canvas;
    var ctx = canvas.getContext("2d");

    this.width = canvas.width;
    this.height = canvas.height;
    this.canvas = ctx;

    this.draw();
  },
};
</script>