

export const decodeJwt = (jwt) => {
    const base64Url = jwt.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const buff = new Buffer(base64Url, 'base64');
    const payloadinit = buff.toString('ascii');
    return JSON.parse(payloadinit);
}