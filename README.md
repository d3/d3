# d3.js / Data-Driven Documents

**D3.js** is a small, free JavaScript library for manipulating HTML documents
based on data. D3 can help you quickly visualize your data as HTML or SVG,
handle interactivity, and incorporate rich animations into your pages. You can
use D3 as a visualization framework, or you can just use it to build dynamic
pages. Unlike other systems, D3 doesn&rsquo;t tie you to a proprietary
representation, so you are free to exercise the full capabilities of modern
browsers.

See <http://mbostock.github.com/d3/> to learn more!

These examples should run in any browser which supports SVG; D3 is officially
supported on Firefox, Chrome (Chromium), Safari (WebKit), Opera and IE9.

## NOTICE FOR CHROME USERS

Chrome has strict permissions for reading files out of the local file system.
To view some of the examples locally, you will need to start a local web
server. One easy way to do that is to install Tornado:

    cd ..
    git clone https://github.com/facebook/tornado.git
    sudo python setup.py install

We have provided a Tornado script for serving static files:

    python examples

Once this is running, go to: <http://0.0.0.0:8888/examples/index.html>
