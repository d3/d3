<script>

function render(canvas, colors) {
  const n = colors.length;
  const r = 40;
  canvas.width = n * r;
  canvas.height = r;
  const context = canvas.getContext("2d");
  for (let i = 0; i < n; ++i) {
    context.fillStyle = colors[i];
    context.fillRect(i * r, 0, r, r);
  }
}

export default {
  props: ["colors"],
  mounted() {
    render(this.$el, this.colors);
  },
  updated() {
    render(this.$el, this.colors);
  }
}

</script>

<template>
  <canvas style="height: 40px;"></canvas>
</template>
