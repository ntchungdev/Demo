import faker from 'faker';

// ----------------------------------------------------------------------

const classrooms = [...Array(24)].map(() => ({
  id: faker.datatype.uuid(),
  username: faker.name.findName(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email()
}));

export default classrooms;
