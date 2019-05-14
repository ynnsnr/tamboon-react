global.fetch = require('jest-fetch-mock')

process.on('unhandledRejection', (reason) => {
//   console.log('REJECTION', reason)
})
