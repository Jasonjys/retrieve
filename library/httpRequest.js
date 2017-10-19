export default function(path, parameters, callback) {
    function encodeURI(uri, path) {
        if (uri.match(/\/$/)) {
            return uri + path;
        } else{
            return uri + "/" + path
        }
    }

    const serverURL = 'http://ec2-35-182-227-27.ca-central-1.compute.amazonaws.com'

    fetch(encodeURI(serverURL, path), {
        method: 'POST',
        hearders: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(parameters)
    })
    .then((response) => response.json())
    .then((responseData) => {
        callback(responseData)
    })
    .catch((error) => {
        console.log(error);
    })
}