# d3-array: Adders {#top}

## new Adder() {#Adder}

Creates a full precision adder for [IEEE 754](https://en.wikipedia.org/wiki/IEEE_754) floating point numbers, setting its initial value to 0.

## *adder*.add(number) {#adder_add}

Adds the specified *number* to the adder’s current value and returns the adder.

## *adder*.valueOf() {#adder_valueOf}

Returns the IEEE 754 double precision representation of the adder’s current value. Most useful as the short-hand notation `+adder`.
