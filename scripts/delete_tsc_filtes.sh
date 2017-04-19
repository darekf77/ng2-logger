if [ -d " index.js" ]; then
    rm " index.js"
fi
if [ -d " index.js.map" ]; then
    rm " index.js.map"
fi
if [ -d " index.d.ts" ]; then
    rm " index.d.ts"
fi
find src/ -type f -name '*.js' -delete
find src/ -type f -name '*.js.map' -delete
find src/ -type f -name '*.d.ts' -delete
