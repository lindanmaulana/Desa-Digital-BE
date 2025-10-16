"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const logging_1 = require("./logging");
const web_1 = require("./web");
const PORT = 4000;
exports.server = web_1.app.listen(PORT, () => {
    logging_1.logger.info(`Listening on port ${PORT}`);
});
//# sourceMappingURL=index.js.map