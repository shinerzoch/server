module.exports = async (documents, document) => {
    const response = await documents.findOne({
        where: {
            name: document
        }
    })

    if (!response) {
        return null
    }

    else {
        return response.dataValues.document;
    }
}