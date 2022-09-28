import React from 'react';

export default function Ajax() {
  function myAjax(options) {
    const xhr = new XMLHttpRequest();

    const { method = 'GET', url, data, success, fail } = options;

    xhr.onreadystatechange = function (e) {
      const { readyState, status, responseXML, responseText } = xhr;
      if (readyState === 4 && status === 200) {
        success(responseXML);
      } else {
        fail(responseText);
      }
    };

    xhr.open(method, url);
    xhr.send(data);
  }

  myAjax({ method: 'test' });

  return <div>ajax</div>;
}
