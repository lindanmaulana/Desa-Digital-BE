// utils/user.factory.ts (Contoh Sederhana)
import { faker } from '@faker-js/faker';
import { UserRole } from '@prisma/client';

const ROLES = ['RESIDENT'];

export const generateFakeUser = () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    return {
        name: `${firstName} ${lastName}`,
        email: faker.internet.email({ firstName, lastName }),
        // PENTING: Hash password jika Anda menggunakan bcrypt atau sejenisnya
        password: faker.internet.password(),
        role: UserRole.RESIDENT,
        is_active: faker.datatype.boolean(),
        is_first_login: false,
    };
}
