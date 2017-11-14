export default function(uri, path, parameter) {
    if (uri.match(/\/$/)) {
        uri = uri + path;
    } else{
        uri = uri + "/" + path
    }

    for (let key in parameter) {
        if (parameter[key]) {
            const value = typeof(parameter[key]) === 'object' ?
                encodeURIComponent(JSON.stringify(parameter[key])) :
                encodeURIComponent(parameter[key]);
            const seperator = uri.indexOf('?') == -1 ? "?" : "&";
            uri = uri + seperator + key + "=" + value;
        }
    }
    return uri
}