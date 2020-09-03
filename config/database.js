let dbUrl = ''
if (process.env.DB_URL) {
    dbUrl = process.env.DB_URL
    console.log(`Connecting to ${dbUrl}`);
} else {
    dbUrl='mongodb+srv://amelie:test1234@cluster0.kuvj1.azure.mongodb.net/simplonPdfGen?retryWrites=true&w=majority';
    console.log(`Connecting to ${dbUrl}`);
}

module.exports = {
  url : dbUrl
}
