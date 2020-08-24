let dbUrl = ''
console.log("process.env")
console.log(process.env.DB_URL)
if (process.env.DB_URL) {
     dbUrl = process.env.DB_URL
} else {
  dbUrl='mongodb://localhost:27017/simplonPdfGen';
}

module.exports = {
  url : dbUrl
}
