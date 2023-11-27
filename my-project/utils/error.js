function error(msg, statusCode){
    const e = new Error()
    e.message=msg
    e.status = statusCode;
    return e;
}
module.exports = error

/**
 * function error(msg = 'Something error occured', status = 500) {
    const e = new Error(msg)
    e.status = status
    return e;
}
module.exports = error
 */