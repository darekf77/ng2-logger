"use strict";
function contain(arr, item) {
    return arr.filter(l => l === item || ((item.match && typeof item.match === 'function') ? item.match(l) : false)).length > 0;
}
exports.contain = contain;
;
//# sourceMappingURL=include.js.map