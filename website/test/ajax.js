
      function urlParamsEncode(obj) {
        var param = '';
        for (key in obj) {
          param += (encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]) + '&');
        }
        return param.substring(0, param.length - 1);
      }
      function fetch(url, {
          data = {}, 
          type = 'get', 
          dataType = 'text', 
          success = function(){}, 
          error = function(){}, 
          complete = function(){}}) {
        var xhr;
        if (window.XMLHttpRequest)
          xhr = new XMLHttpRequest();
        } else {
          // copy 来的，但我觉得是没有必要适配的
          xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        if (xhr == null) return;
        var params = urlParamsEncode(data);
        if (type == 'get') {
          if (!url.endsWith('?')) url += '?';
          url += params;
        }
        xhr.open(type, url);
        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4) {
            complete();
            if (xhr.status == 200) {
              switch (dataType) {
                case 'json':
                  success(JSON.parse(xhr.responseText));
                  break;
                case 'xml':
                  success(xhr.responseXML);
                  break;
                case 'text':
                default:
                  success(xhr.responseText);
                  break;
              }
            } else {
              // 此处没有参数
              error();
            }
          }
        };
        if (type == 'post') {
          xhr.send(params)
        } else {
          xhr.send();
        }
      }

      fetch('/admin/datas/articles/get', {
        type: 'get', 
        dataType: 'json', 
        success: function(dt) {
          addData(dt.data);
        }
      });