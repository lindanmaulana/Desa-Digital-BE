"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notfound = (req, res) => {
    res.status(400).send({ errors: "Route does not exist" });
};
exports.default = notfound;
//# sourceMappingURL=notfound.js.map