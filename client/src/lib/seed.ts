const { PrismaClient } = require("@prisma/client");
const faker = require("faker");

const prisma = new PrismaClient();

async function main() {
  // Create a basic user with random personal information
  const admin = await prisma.user.create({
    data: {
      id: "1",
      name: "Admin",
      username: "admin",
      email: "admin@admin.com",
      password: "12345",
      personal: {
        create: {
          age: faker.datatype.number({ min: 18, max: 40 }),
          gender: faker.name.gender(),
          address: faker.address.streetAddress(),
          phone_number: faker.phone.phoneNumber(),
        },
      },
    },
  });

  const roman = await prisma.user.create({
    data: {
      id: "2",
      name: "Roman",
      username: "roman",
      email: "jgdevromank@gmail.com",
      password: "12345",
      personal: {
        create: {
          age: faker.datatype.number({ min: 18, max: 65 }),
          gender: "male",
          address: faker.address.streetAddress(),
          phone_number: faker.phone.phoneNumber(),
        },
      },
    },
  });

  const ada = await prisma.user.create({
    data: {
      id: "3",
      name: "Ada",
      username: "ada",
      email: "ada@ada.com",
      password: "chiken",
      personal: {
        create: {
          age: faker.datatype.number({ min: 18, max: 65 }),
          gender: "female",
          address: faker.address.streetAddress(),
          phone_number: faker.phone.phoneNumber(),
        },
      },
    },
  });

  const erik = await prisma.user.create({
    data: {
      id: "4",
      name: "Erik",
      username: "erik",
      email: "erik@erik.com",
      password: "12345",
      githubId: "",
      personal: {
        create: {
          age: faker.datatype.number({ min: 18, max: 65 }),
          gender: "male",
          address: faker.address.streetAddress(),
          phone_number: faker.phone.phoneNumber(),
        },
      },
    },
  });

  const manou = await prisma.user.create({
    data: {
      id: "5",
      name: "Manou",
      username: "manou",
      email: "manou@manou.com",
      password: "12345",
      personal: {
        create: {
          age: faker.datatype.number({ min: 18, max: 65 }),
          gender: "female",
          address: faker.address.streetAddress(),
          phone_number: faker.phone.phoneNumber(),
        },
      },
    },
  });

  console.log({ admin, roman, ada, erik, manou });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
