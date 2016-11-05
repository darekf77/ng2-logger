"use strict";
function contain(arr, item) {
    return arr.filter(function (l) { return l === item || item.match(l); }).length > 0;
}
exports.contain = contain;
;
//# sourceMappingURL=include.js.map