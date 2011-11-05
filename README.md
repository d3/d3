# D3

**D3** is a small, free JavaScript library for manipulating HTML documents
based on data. D3 can help you quickly visualize your data as HTML or SVG,
handle interactivity, and incorporate smooth transitions and staged animations
into your pages. You can use D3 as a visualization framework (like Protovis),
or you can use it to build dynamic pages (like jQuery).

### Browser Support

D3 should work on any browser, with minimal requirements such as JavaScript
and the [W3C DOM](http://www.w3.org/DOM/) API. By default D3 requires the
[Selectors API](http://www.w3.org/TR/selectors-api/) Level 1, but you can
preload [Sizzle](http://sizzlejs.com/) for compatibility with older browsers.
Some of the included D3 examples use additional browser features, such as
[SVG](http://www.w3.org/TR/SVG/) and [CSS3
Transitions](http://www.w3.org/TR/css3-transitions/). These features are not
required to use D3, but are useful for visualization! D3 is not a
compatibility layer. The examples should work on Firefox, Chrome (Chromium),
Safari (WebKit), Opera and IE9.

Note: Chrome has strict permissions for reading files out of the local file
system. Some examples use AJAX which works differently via HTTP instead of local
files. For the best experience, load the D3 examples from your own machine via
HTTP. Any static file web server will work; for example you can run Python's
built-in server:

    python -m SimpleHTTPServer 8888

Once this is running, go to: <http://localhost:8888/examples/>

### Development Setup

This repository should work out of the box if you just want to create new
visualizations using D3. On the other hand, if you want to extend D3 with new
features, fix bugs, or run tests, you'll need to install a few more things.

D3's test framework uses [Vows](http://vowsjs.org), which depends on
[Node.js](http://nodejs.org/) and [NPM](http://npmjs.org/). If you are
developing on Mac OS X, an easy way to install Node and NPM is using
[Homebrew](http://mxcl.github.com/homebrew/):

    brew install node
    brew install npm

Next, from the root directory of this repository, install D3's dependencies:

    make install

You can see the list of dependencies in package.json. NPM will install the
packages in the node_modules directory.
