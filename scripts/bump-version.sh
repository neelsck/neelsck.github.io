#!/bin/sh
# Stamps a fresh ?v= on the CSS and JS links so browsers load new files after each deploy.
# Run from the repo root before committing: sh scripts/bump-version.sh
V=$(date +%Y%m%d%H%M)
sed -i.bak -E "s#(styles\.css|content\.js|palette\.js)(\?v=[0-9]+)?\"#\1?v=$V\"#g" index.html 404.html && rm -f index.html.bak 404.html.bak
echo "version $V"
