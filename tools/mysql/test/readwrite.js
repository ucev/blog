var ReadWriteLock = require('rwlock');
var lock = new ReadWriteLock();

var i = 0;

lock.writeLock(i, function(cb) {
  console.log('writing 1...');
  i++;
  console.log(i);
  lock.writeLock(i, function(cb) {
    console.log('writing 2...');
    i++;
    console.log(i);
    cb();
    i++;
    console.log(i);
    console.log('done 2.');
  });
  cb();
  i++;
  console.log(i);
  console.log('done 1.');
});
