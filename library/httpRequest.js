import encodeURI from './encodeURI';

export default function(path, parameter) {
    const serverURL = 'http://ec2-35-182-227-27.ca-central-1.compute.amazonaws.com'

    return new Promise((resolve, reject) => {
        fetch(encodeURI(serverURL, path, parameter), {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.status === 200) {
                resolve(response.json());
            } else {
                reject(response);
            }
        }).catch((error) => {
            reject(error);
        })
    })
}