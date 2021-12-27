module.exports = async (documents, name, data) => {
    const documentChecker = await documents.findOne({
        where: {
            name
        }
    });

    if (documentChecker) {
        return {
            error: true,
            message: 'Document Already Exist'
        }
    }

    else {
        const response = await documents.create({
            name, document: data
        });

        return response.dataValues;
    }
}