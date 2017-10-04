export default function(uri, path, parameter) {
  if (uri.match(/\/$/)) {
  	uri = uri + path;
  } else{
  	uri = uri + "/" + path
  }
  for (let key in parameter) {
  	var value = encodeURIComponent(parameter[key]);
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    uri = uri + separator + key + "=" + value;
  }
  return uri;
}