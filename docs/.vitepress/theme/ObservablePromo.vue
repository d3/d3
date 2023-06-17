<template>
  <div :class="`vp-doc ${$style.promo}`">
    <h1 :class="$style.hed">Build your best work with D3 on Observable</h1>
    <div :class="$style.subhed">The only data workflow platform capable of supporting the full power of D3</div>
    <div :class="$style.columns">
      <div :class="$style.column">
        <span :class="$style['column-header']">Connect to your data instantly</span>
        <span :class="$style['column-body']">Pull live data from the cloud, files, and databases into one secure place — without installing anything, ever.</span>
      </div>
      <div :class="$style.column">
        <span :class="$style['column-header']">Code faster than you thought possible</span>
        <span :class="$style['column-body']">Get everything you need and none of what you don’t with lightweight automatic versioning, instant sharing, and real-time multiplayer editing.</span>
      </div>
      <div :class="$style.column">
        <span :class="$style['column-header']">Accelerate your team’s analysis</span>
        <span :class="$style['column-body']">Create a home for your team’s data analysis where you can spin up charts, maps, and data apps to explore, analyze, and iterate on together.</span>
      </div>
    </div>
    <a :class="$style.button" href="https://observablehq.com?utm_source=d3js-org&utm_medium=promo&utm_campaign=try-observable" target="_blank">Build with D3 on Observable →</a>
  </div>
</template>

<style scoped>

h1 {
  border-top: none;
}

</style>

<style module>

.promo {
  margin: 96px auto 0 auto;
  max-width: 1152px;
  padding: 0 24px;
  text-align: center;
}

.column {
  margin: 2rem 0;
}

.column-header {
  font-weight: 600;
}

.hed,
.subhed,
.column {
  padding: 0 24px;
}

.hed,
.subhed,
.column-header {
  text-wrap: balance;
}

.subhed {
  margin-top: 1rem;
  opacity: 0.7;
}

a.button {
  display: inline-block;
  border: 1px solid transparent;
  text-align: center;
  font-weight: 600;
  white-space: nowrap;
  background-color: var(--vp-c-neutral);
  color: var(--vp-c-neutral-inverse);
  border-radius: 20px;
  padding: 0 20px;
  line-height: 38px;
  font-size: 14px;
  margin: 0 24px;
}

a.button:hover {
  text-decoration: none;;
}

@media (min-width: 640px) {
  .promo {
    padding: 0 48px;
  }
}

@media (min-width: 768px) {
  .promo {
    margin-top: 128px;
  }
}

@media (max-width: 959px) {
  .promo {
    max-width: 768px;
  }
  .column-header::after {
    content: " · ";
  }
  .columns {
    text-align: initial;
  }
}

@media (min-width: 960px) {
  .promo {
    padding: 0 64px;
  }
  .subhed {
    margin-top: 0.5rem;
  }
  .columns {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
  .column {
    margin: 4rem 0;
  }
  .column-header {
    margin-bottom: 0.5rem;
  }
  .column-header,
  .column-body {
    display: block;
  }
}

</style>
