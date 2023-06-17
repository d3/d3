<template>
  <svg viewBox="0 -10 116 111" width="400" style="margin: 1em 0; max-width: 100%; overflow: visible; height: auto;">
    <path fill="currentColor" fill-opacity="0.3" d="M0,0 h7.75 a45.5,45.5 0 1 1 0,91 h-7.75 v-20 h7.75 a25.5,25.5 0 1 0 0,-51 h-7.75 z m36.2510,0 h32 a27.75,27.75 0 0 1 21.331,45.5 a27.75,27.75 0 0 1 -21.331,45.5 h-32 a53.6895,53.6895 0 0 0 18.7464,-20 h13.2526 a7.75,7.75 0 1 0 0,-15.5 h-7.75 a53.6895,53.6895 0 0 0 0,-20 h7.75 a7.75,7.75 0 1 0 0,-15.5 h-13.2526 a53.6895,53.6895 0 0 0 -18.7464,-20 z" />
    <g fill="none" stroke="currentColor" stroke-width="0.2" stroke-opacity="0.3">
      <line x1="-100" x2="110" y1="0" y2="0" />
      <line x1="-100" x2="110" y1="20" y2="20" />
      <line x1="-100" x2="110" y1="35.5" y2="35.5" />
      <line x1="-100" x2="110" y1="45.5" y2="45.5" />
      <line x1="-100" x2="110" y1="55.5" y2="55.5" />
      <line x1="-100" x2="110" y1="71" y2="71" />
      <line x1="-100" x2="110" y1="91" y2="91" />
      <line x1="0" x2="0" y1="-10" y2="101" />
      <line x1="7.75" x2="7.75" y1="-10" y2="101" />
      <line x1="60.5" x2="60.5" y1="-10" y2="101" /> <!-- XXX  -->
      <line x1="68.25" x2="68.25" y1="-10" y2="101" />
      <line x1="96" x2="96" y1="-10" y2="101" />
    </g>
    <g fill="var(--vp-c-brand)">
      <circle cx="7.75" cy="45.5" r="0.75" />
      <circle cx="68.25" cy="27.75" r="0.75" />
      <circle cx="68.25" cy="63.25" r="0.75" />
    </g>
    <g fill="currentColor">
      <!-- Intersecting horizontal lines with the r=53.6895 circle. -->
      <circle cx="36.2510" cy="0" r="0.75" />
      <circle cx="54.9974" cy="20" r="0.75" />
      <circle cx="60.5" cy="35.5" r="0.75" />
      <circle cx="60.5" cy="55.5" r="0.75" />
      <circle cx="54.9974" cy="71" r="0.75" />
      <circle cx="36.2510" cy="91" r="0.75" />
      <!-- Intersecting the two r=27.75 circles. -->
      <circle cx="89.5807" cy="45.5" r="0.75" />
    </g>
    <g fill="none" stroke="currentColor" stroke-width="0.2">
      <circle cx="7.75" cy="45.5" r="25.5" />
      <circle cx="7.75" cy="45.5" r="45.5" />
      <!-- Radius is computed to intersect at the intended x=60.5. -->
      <circle cx="7.75" cy="45.5" r="53.6895" />
      <circle cx="68.25" cy="27.75" r="7.75" />
      <circle cx="68.25" cy="27.75" r="27.75" />
      <circle cx="68.25" cy="63.25" r="7.75" />
      <circle cx="68.25" cy="63.25" r="27.75" />
    </g>
  </svg>
</template>
