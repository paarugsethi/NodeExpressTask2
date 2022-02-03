const timeLogger = (req, res, next) => {
    const response = {
        "request_time": new Date().toTimeString(),
        "data": res
    }
    console.log(response)
    next();
}

module.exports = timeLogger;