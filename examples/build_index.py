#!/usr/bin/env python
import os

html_pages = []
for root, dirs, files in os.walk(os.path.curdir):
    for f in files:
        if f.endswith(".html"):
            html_pages.append(os.path.join(root, f))

template = """
<html>
<head><title>Examples</title></head>
<body>
<ul>
{links}
</ul>
</body>
</html>
"""

links = ["<li><a href='%s'>%s</a></li>" % (link, link) for link in html_pages]

with open('index.html', 'w') as of:
    of.write(template.format(links='\n'.join(links)))

