import httpsRequest from './httpsRequest';

export default async function(uri) {
    let path = "upload";
    let method = "POST";
  
    let body = new FormData();
    let uriParts = uri.split('.');
    let fileType = uri[uri.length - 1];
    body.append('photo', {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
    };

    return httpsRequest(path, {}, method, body, headers);
  }
  