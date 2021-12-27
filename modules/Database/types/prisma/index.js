class Prisma {}

Prisma.hook = (client) => Prisma.client = client;

Prisma.table = (tableName) => {
    return {
        findOne: async (where) => await Prisma.client[tableName].findUnique({ where }),
        findAll: (data) => Prisma.client[tableName].findMany({ where: data }),
        create: async (data) => {
            try {
                return await Prisma.client[tableName].create({ data: data })
            }
            catch(err) {
                console.error(err.message);
                return {
                    error: true,
                    message: err
                }
            }
        },
        update: (data) => Prisma.client[tableName].update(data),
        delete: (data) => Prisma.client[tableName].delete({ where: data })
    }
}

module.exports = Prisma