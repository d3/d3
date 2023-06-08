<script>

function render(canvas, color, n) {
  canvas.width = n;
  canvas.height = 1;
  const context = canvas.getContext("2d");
  for (let i = 0; i < n; ++i) {
    context.fillStyle = color(i / (n - 1));
    context.fillRect(i, 0, 1, 1);
  }
}

export default {
  props: {
    color: {type: Function},
    n: {type: Number, default: 256}
  },
  mounted() {
    render(this.$el, this.color, this.n);
  },
  updated() {
    render(this.$el, this.color, this.n);
  }
}

</script>

<template>
  <canvas style="width: 100%; height: 40px; image-rendering: -moz-crisp-edges; image-rendering: pixelated;"></canvas>
</template>
