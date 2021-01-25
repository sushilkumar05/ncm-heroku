const express = require("express")
const dotenv = require('dotenv')
const cors = require("cors")
const HttpException = require('./utils/HttpException.utils')
const errorMiddleware = require('./middleware/error.middleware')
let path = require("path")

//routes
const userRouter = require('./routes/user.route')
const countryRouter = require('./routes/country.route')
const stateRouter = require('./routes/state.route')
const deviceRouter = require('./routes/device.route')
const vendorRouter = require('./routes/vendor.route')
const roleRouter = require('./routes/role.route')
const organizationRouter = require('./routes/organization.route')
const roleEntityRouter = require('./routes/roleEntity.route')

const categoriesTypeRouter = require('./routes/categoriesType.route')
const configRouter = require('./routes/config.route')
const deviceLogRouter = require('./routes/deviceLog.route')
const jobLogRouter = require('./routes/jobLog.route')
const jobMasterRouter = require('./routes/jobMaster.route')
const orgDevicesRouter = require('./routes/orgDevices.route')
const reportsRouter = require('./routes/reports.route')
const roleDetailsRouter = require('./routes/roleDetails.route')
const userRolesMappingRouter = require('./routes/userRolesMapping.route')

const app = express()

// Init environment
dotenv.config()
// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.json())
// enabling cors for all requests by using cors middleware
app.use(cors())
// Enable pre-flight
app.options("*", cors())

const port = Number(process.env.PORT || 3331)

app.use(`/api/v1/users`, userRouter)
app.use(`/api/v1/countries`, countryRouter)
app.use(`/api/v1/states`, stateRouter)
app.use(`/api/v1/devices`, deviceRouter)
app.use(`/api/v1/vendors`, vendorRouter)
app.use(`/api/v1/roles`, roleRouter)
app.use(`/api/v1/organizations`, organizationRouter)
app.use(`/api/v1/roleentities`, roleEntityRouter)

app.use(`/api/v1/categoriestype`, categoriesTypeRouter)
app.use(`/api/v1/configs`, configRouter)
app.use(`/api/v1/devicelogs`, deviceLogRouter)
app.use(`/api/v1/joblog`, jobLogRouter)
app.use(`/api/v1/jobmaster`, jobMasterRouter)
app.use(`/api/v1/orgdevices`, orgDevicesRouter)
app.use(`/api/v1/reports`, reportsRouter)
app.use(`/api/v1/roledetails`, roleDetailsRouter)
app.use(`/api/v1/userrolesmapping`, userRolesMappingRouter)

app.use(express.static(path.join(__dirname, 'build')));


// 404 error
// app.all('*', (req, res, next) => {
//     const err = new HttpException(404, 'Endpoint Not Found')
//     next(err)
// })

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
// Error middleware
app.use(errorMiddleware)

// starting the server
app.listen(port, () =>
    console.log(`🚀 Server running on port ${port}!`))


module.exports = app