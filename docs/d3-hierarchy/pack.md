# Pack {#Pack}

[<img alt="Circle-Packing" src="https://raw.githubusercontent.com/d3/d3-hierarchy/main/img/pack.png">](https://observablehq.com/@d3/circle-packing)

[Examples](https://observablehq.com/@d3/circle-packing) · Enclosure diagrams use containment (nesting) to represent a hierarchy. The size of the leaf circles encodes a quantitative dimension of the data. The enclosing circles show the approximate cumulative size of each subtree, but due to wasted space there is some distortion; only the leaf nodes can be compared accurately. Although [circle packing](http://en.wikipedia.org/wiki/Circle_packing) does not use space as efficiently as a [treemap](./treemap.md), the “wasted” space more prominently reveals the hierarchical structure.

## pack() {#pack}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/pack/index.js) · Creates a new pack layout with the default settings.

### *pack*(*root*) {#_pack}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/pack/index.js) · Lays out the specified *root* [hierarchy](./hierarchy.md), assigning the following properties on *root* and its descendants:

* *node*.x - the *x*-coordinate of the circle’s center
* *node*.y - the y coordinate of the circle’s center
* *node*.r - the radius of the circle

You must call [*root*.sum](./hierarchy.md#node_sum) before passing the hierarchy to the pack layout. You probably also want to call [*root*.sort](./hierarchy.md#node_sort) to order the hierarchy before computing the layout.

## *pack*.radius(*radius*) {#pack_radius}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/pack/index.js) · If *radius* is specified, sets the pack layout’s radius accessor to the specified function and returns this pack layout. If *radius* is not specified, returns the current radius accessor, which defaults to null. If the radius accessor is null, the radius of each leaf circle is derived from the leaf *node*.value (computed by [*node*.sum](./hierarchy.md#node_sum)); the radii are then scaled proportionally to fit the [layout size](#pack_size). If the radius accessor is not null, the radius of each leaf circle is specified exactly by the function.

## *pack*.size(*size*) {#pack_size}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/pack/index.js) · If *size* is specified, sets this pack layout’s size to the specified two-element array of numbers [*width*, *height*] and returns this pack layout. If *size* is not specified, returns the current size, which defaults to [1, 1].

## *pack*.padding(*padding*) {#pack_padding}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/pack/index.js) · If *padding* is specified, sets this pack layout’s padding accessor to the specified number or function and returns this pack layout. If *padding* is not specified, returns the current padding accessor, which defaults to the constant zero. When siblings are packed, tangent siblings will be separated by approximately the specified padding; the enclosing parent circle will also be separated from its children by approximately the specified padding. If an [explicit radius](#pack_radius) is not specified, the padding is approximate because a two-pass algorithm is needed to fit within the [layout size](#pack_size): the circles are first packed without padding; a scaling factor is computed and applied to the specified padding; and lastly the circles are re-packed with padding.

## packSiblings(*circles*) {#packSiblings}

[Source](https://github.com/d3/d3-hierarchy/blob/main/src/pack/siblings.js) · Packs the specified array of *circles*, each of which must have a *circle*.r property specifying the circle’s radius. Assigns the following properties to each circle:

* *circle*.x - the *x*-coordinate of the circle’s center
* *circle*.y - the y coordinate of the circle’s center

The circles are positioned according to the front-chain packing algorithm by [Wang *et al.*](https://dl.acm.org/citation.cfm?id=1124851)

## packEnclose(*circles*) {#packEnclose}

[Examples](https://observablehq.com/@d3/d3-packenclose) · [Source](https://github.com/d3/d3-hierarchy/blob/main/src/pack/enclose.js) · Computes the [smallest circle](https://en.wikipedia.org/wiki/Smallest-circle_problem) that encloses the specified array of *circles*, each of which must have a *circle*.r property specifying the circle’s radius, and *circle*.x and *circle*.y properties specifying the circle’s center. The enclosing circle is computed using the [Matoušek-Sharir-Welzl algorithm](http://www.inf.ethz.ch/personal/emo/PublFiles/SubexLinProg_ALG16_96.pdf). (See also [Apollonius’ Problem](https://observablehq.com/@d3/apollonius-problem).)
