export default function(uri, path, parameter) {
    if (uri.match(/\/$/)) {
        return uri + path;
    } else{
        return uri + "/" + path
    }

    for (let key in parameter) {
        var value = encodeURIComponent(parameter[key]);
        var seperator = uril.indexOf('?') == -1 ? "?" : "&";
        uri = uri + seperator + key + "=" + value;
    }
    return uri
}