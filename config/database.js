let dbUrl = ''
if (process.env.DB_URL) {
    dbUrl = process.env.DB_URL
    console.log(`Connecting to ${dbUrl}`);
} else {
    dbUrl='mongodb://localhost:27017/simplonPdfGen';
    console.log(`Connecting to ${dbUrl}`);
}

module.exports = {
  url : dbUrl
}
