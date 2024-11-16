const prismaClient = require('@prisma/client');

prismaClient.prisma = new prismaClient.PrismaClient();

module.exports = prismaClient;



