---
layout: docs
title: 'filter'
---

## <tt>filter(<i>f</i>)</tt>

![filter](filter.png)

Filters the current selection, applying the given filter function <i>f</i>. The
function <i>f</i> is invoked for each node in the current selection. The
arguments to the function <i>f</i> are the current data stack, and the context
is the current node. The function <i>f</i> must return true for nodes that
should appear in the filtered selection.
