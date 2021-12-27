module.exports = async (documents, document) => {
    const response = await documents.findOne({
        where: {
            name: document
        }
    })

    console.log(response)

    if (!response) {
        return {
            error: true,
            message: 'Document Not Found'
        }
    }

    else {
        return response;
    }
}