"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFakeUser = void 0;
// utils/user.factory.ts (Contoh Sederhana)
const faker_1 = require("@faker-js/faker");
const client_1 = require("@prisma/client");
const ROLES = ['RESIDENT'];
const generateFakeUser = () => {
    const firstName = faker_1.faker.person.firstName();
    const lastName = faker_1.faker.person.lastName();
    return {
        name: `${firstName} ${lastName}`,
        email: faker_1.faker.internet.email({ firstName, lastName }),
        // PENTING: Hash password jika Anda menggunakan bcrypt atau sejenisnya
        password: faker_1.faker.internet.password(),
        role: client_1.UserRole.RESIDENT,
        is_active: faker_1.faker.datatype.boolean(),
        is_first_login: false,
    };
};
exports.generateFakeUser = generateFakeUser;
//# sourceMappingURL=user.factory.js.map