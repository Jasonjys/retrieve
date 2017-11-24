import encodeURI from './encodeURI';

export default function(path, parameter, method, body, headers) {
    const serverURL = 'https://ec2-35-182-227-27.ca-central-1.compute.amazonaws.com'
    method = method || "GET";
    body = body || {};
    headers = headers || {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    const options = method === "GET" ? {
        method: method,
        headers: headers
    } : {
        method: method,
        body: body,
        headers: headers
    }

    return new Promise((resolve, reject) => {
        fetch(encodeURI(serverURL, path, parameter), options)
        .then((response) => {
            if (response.status === 200) {
                resolve(response.json());
            } else {
                reject(response);
            }
        })
        .catch((error) => {
            reject(error);
        })
    })
}