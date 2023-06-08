# Selecting elements

Transitions are derived from [selections](../d3-selection.md) via [*selection*.transition](#selection_transition). You can also create a transition on the document root element using [d3.transition](#transition).

## *selection*.transition(*name*) {#selection_transition}

[Source](https://github.com/d3/d3-transition/blob/main/src/selection/transition.js) · Returns a new transition on the given *selection* with the specified *name*. If a *name* is not specified, null is used. The new transition is only exclusive with other transitions of the same name.

If the *name* is a [transition](#transition) instance, the returned transition has the same id and name as the specified transition. If a transition with the same id already exists on a selected element, the existing transition is returned for that element. Otherwise, the timing of the returned transition is inherited from the existing transition of the same id on the nearest ancestor of each selected element. Thus, this method can be used to synchronize a transition across multiple selections, or to re-select a transition for specific elements and modify its configuration. For example:

```js
const t = d3.transition()
    .duration(750)
    .ease(d3.easeLinear);

d3.selectAll(".apple").transition(t)
    .style("fill", "red");

d3.selectAll(".orange").transition(t)
    .style("fill", "orange");
```

If the specified *transition* is not found on a selected node or its ancestors (such as if the transition [already ended](./control-flow.md#the-life-of-a-transition)), the default timing parameters are used; however, in a future release, this will likely be changed to throw an error. See [#59](https://github.com/d3/d3-transition/issues/59).

## transition(*name*) {#transition}

[Source](https://github.com/d3/d3-transition/blob/main/src/transition/index.js) · Returns a new transition on the root element, `document.documentElement`, with the specified *name*. If a *name* is not specified, null is used. The new transition is only exclusive with other transitions of the same name. The *name* may also be a [transition](#transition) instance; see [*selection*.transition](#selection_transition). This method is equivalent to:

```js
d3.selection()
  .transition(name)
```

This function can also be used to test for transitions (`instanceof d3.transition`) or to extend the transition prototype.

## *transition*.select(*selector*) {#transition_select}

[Source](https://github.com/d3/d3-transition/blob/main/src/transition/select.js) · For each selected element, selects the first descendant element that matches the specified *selector* string, if any, and returns a transition on the resulting selection. The *selector* may be specified either as a selector string or a function. If a function, it is evaluated for each selected element, in order, being passed the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element. The new transition has the same id, name and timing as this transition; however, if a transition with the same id already exists on a selected element, the existing transition is returned for that element.

This method is equivalent to deriving the selection for this transition via [*transition*.selection](#transition_selection), creating a subselection via [*selection*.select](../d3-selection/selecting.md#selection_select), and then creating a new transition via [*selection*.transition](#selection_transition):

```js
transition
  .selection()
  .select(selector)
  .transition(transition)
```

## *transition*.selectAll(selector) {#transition_selectAll}

[Source](https://github.com/d3/d3-transition/blob/main/src/transition/selectAll.js) · For each selected element, selects all descendant elements that match the specified *selector* string, if any, and returns a transition on the resulting selection. The *selector* may be specified either as a selector string or a function. If a function, it is evaluated for each selected element, in order, being passed the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element. The new transition has the same id, name and timing as this transition; however, if a transition with the same id already exists on a selected element, the existing transition is returned for that element.

This method is equivalent to deriving the selection for this transition via [*transition*.selection](#transition_selection), creating a subselection via [*selection*.selectAll](../d3-selection/selecting.md#selection_selectAll), and then creating a new transition via [*selection*.transition](#selection_transition):

```js
transition
  .selection()
  .selectAll(selector)
  .transition(transition)
```

## *transition*.selectChild(*selector*) {#transition_selectChild}

[Source](https://github.com/d3/d3-transition/blob/main/src/transition/select.js) · For each selected element, selects the first child element that matches the specified *selector* string, if any, and returns a transition on the resulting selection. The *selector* may be specified either as a selector string or a function. If a function, it is evaluated for each selected element, in order, being passed the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element. The new transition has the same id, name and timing as this transition; however, if a transition with the same id already exists on a selected element, the existing transition is returned for that element.

This method is equivalent to deriving the selection for this transition via [*transition*.selection](#transition_selection), creating a subselection via [*selection*.selectChild](../d3-selection/selecting.md#selection_selectChild), and then creating a new transition via [*selection*.transition](#selection_transition):

```js
transition
  .selection()
  .selectChild(selector)
  .transition(transition)
```

## *transition*.selectChildren(*selector*) {#transition_selectChildren}

[Source](https://github.com/d3/d3-transition/blob/main/src/transition/selectAll.js) · For each selected element, selects all children that match the specified *selector* string, if any, and returns a transition on the resulting selection. The *selector* may be specified either as a selector string or a function. If a function, it is evaluated for each selected element, in order, being passed the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element. The new transition has the same id, name and timing as this transition; however, if a transition with the same id already exists on a selected element, the existing transition is returned for that element.

This method is equivalent to deriving the selection for this transition via [*transition*.selection](#transition_selection), creating a subselection via [*selection*.selectChildren](../d3-selection/selecting.md#selection_selectChildren), and then creating a new transition via [*selection*.transition](#selection_transition):

```js
transition
  .selection()
  .selectChildren(selector)
  .transition(transition)
```

## *transition*.filter(*filter*) {#transition_filter}

[Source](https://github.com/d3/d3-transition/blob/main/src/transition/filter.js) · For each selected element, selects only the elements that match the specified *filter*, and returns a transition on the resulting selection. The *filter* may be specified either as a selector string or a function. If a function, it is evaluated for each selected element, in order, being passed the current datum (*d*), the current index (*i*), and the current group (*nodes*), with *this* as the current DOM element. The new transition has the same id, name and timing as this transition; however, if a transition with the same id already exists on a selected element, the existing transition is returned for that element.

This method is equivalent to deriving the selection for this transition via [*transition*.selection](#transition_selection), creating a subselection via [*selection*.filter](../d3-selection/selecting.md#selection_filter), and then creating a new transition via [*selection*.transition](#selection_transition):

```js
transition
  .selection()
  .filter(filter)
  .transition(transition)
```

## *transition*.merge(*other*) {#transition_merge}

[Source](https://github.com/d3/d3-transition/blob/main/src/transition/merge.js) · Returns a new transition merging this transition with the specified *other* transition, which must have the same id as this transition. The returned transition has the same number of groups, the same parents, the same name and the same id as this transition. Any missing (null) elements in this transition are filled with the corresponding element, if present (not null), from the *other* transition.

This method is equivalent to deriving the selection for this transition via [*transition*.selection](#transition_selection), merging with the selection likewise derived from the *other* transition via [*selection*.merge](../d3-selection/joining.md#selection_merge), and then creating a new transition via [*selection*.transition](#selection_transition):

```js
transition
  .selection()
  .merge(other.selection())
  .transition(transition)
```

## *transition*.transition() {#transition_transition}

[Source](https://github.com/d3/d3-transition/blob/main/src/transition/transition.js) · Returns a new transition on the same selected elements as this transition, scheduled to start when this transition ends. The new transition inherits a reference time equal to this transition’s time plus its [delay](./timing.md#transition_delay) and [duration](./timing.md#transition_duration). The new transition also inherits this transition’s name, duration, and [easing](./timing.md#transition_ease). This method can be used to schedule a sequence of chained transitions. For example:

```js
d3.selectAll(".apple")
  .transition() // First fade to green.
    .style("fill", "green")
  .transition() // Then red.
    .style("fill", "red")
  .transition() // Wait one second. Then brown, and remove.
    .delay(1000)
    .style("fill", "brown")
    .remove();
```

The delay for each transition is relative to its previous transition. Thus, in the above example, apples will stay red for one second before the last transition to brown starts.

## *transition*.selection() {#transition_selection}

[Source](https://github.com/d3/d3-transition/blob/main/src/transition/selection.js) · Returns the [selection](../d3-selection/selecting.md#selection) corresponding to this transition.

## active(node, name) {#active}

[Examples](https://observablehq.com/@d3/chained-transitions) · [Source](https://github.com/d3/d3-transition/blob/main/src/active.js) · Returns the active transition on the specified *node* with the specified *name*, if any. If no *name* is specified, null is used. Returns null if there is no such active transition on the specified node. This method is useful for creating chained transitions. For example, to initiate disco mode:

```js
d3.selectAll("circle").transition()
    .delay((d, i) => i * 50)
    .on("start", function repeat() {
        d3.active(this)
            .style("fill", "red")
          .transition()
            .style("fill", "green")
          .transition()
            .style("fill", "blue")
          .transition()
            .on("start", repeat);
      });
```
