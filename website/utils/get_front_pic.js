/** 
 * this file should be set as a scheduled task
 * for example, once a day
 * 
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const env = require('jsdom').env;

const targetPath = path.join(__dirname, "images.json");
// 链接可修改
const baseUrl = 'http://www.gratisography.com/';

function parse_url(url_addr) {
  http.get(url_addr, (res) => {
    var html = '';
    res.on('data', (chunk) => {
      html += chunk;
    }).on('end', () => {
      env(html, (err, window) => {
        const $ = require('jquery')(window);
        let urls = [];
        var imgUrl;
      	$('.lazy').each((i, ele) => {
          imgUrl = $(ele).attr('data-original');
          if (imgUrl) {
            console.log($(ele).attr('data-original'));
            if (!imgUrl.startsWith("http"))
              imgUrl = baseUrl + imgUrl;
          	urls.push(imgUrl);
          }
  	    });
	      fs.writeFile(targetPath, JSON.stringify(urls), {encoding: 'utf8'}, (err) => {

  	    });
      });
    }).on('error', (e) => {
      console.log("ERROR");
      return;
    });
  });
}

parse_url(baseUrl);