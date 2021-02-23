let createPOST = (body) => {
    let header = createHeader();
    body = JSON.stringify(body);
    let post = {
        method: 'POST',
        headers: header,
        mode: 'cors',
        cache: 'default',
        body: body
    };
    return post;
};

let createHeader = () => {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    return header;
};

module.exports.createPOST = (body) => { return createPOST(body); };
