const parseRequest = data  => {
    const parsedBody = data.split('\r\n');
    const method = parsedBody[0].match(/^\w+[^\s]/)[0];
    const url =  parsedBody[0].match(/\s(.*)\s/)[0].trim();

    const headers = parsedBody.slice(1);

    const reducedHeaders = headers.reduce((result, current) => {
        const key = current.match(/\w+\-*\w*[^\:]/);
        const value = current.match(/[\:]+\s(.*)/g)
        return key && value ? {
            ...result,
            [key[0]]: value[0].slice(2)
        } : result
    }, {})
    //console.log('|method',method, '|url',url, '|headers', reducedHeaders);

    return {
        url,
        method,
        headers: reducedHeaders
    }
}

module.exports = parseRequest;