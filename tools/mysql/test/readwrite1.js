const ReadWriteLock = require('rwlock');
const lock = new ReadWriteLock();

lock.writeLock('0', function(cb) {
  console.log('write lock 0 ' + new Date().toLocaleString());
  setTimeout(function() {
    cb();
    console.log('write lock 0 release ' + new Date().toLocaleString());
  }, 5000);
});


lock.readLock('1', function(cb) {
  console.log('read lock 1 ' + new Date().toLocaleString());
  setTimeout(function(){
    cb();
    console.log('read lock 1 release ' + new Date().toLocaleString());
  }, 3000);
});
 
lock.readLock('1', function(cb) {
  console.log('read lock 2 ' + new Date().toLocaleString());
  setTimeout(function(){
    cb();
    console.log('read lock 2 release ' + new Date().toLocaleString());
  }, 3000);
});

lock.writeLock('1', function(cb) {
  console.log('write lock 1 ' + new Date().toLocaleString());
  setTimeout(function() {
    cb();
    console.log('write lock 1 release ' + new Date().toLocaleString());
  }, 5000);
});

lock.writeLock('1', function(cb) {
  console.log('write lock 2 ' + new Date().toLocaleString());
  setTimeout(function() {
    cb();
    console.log('write lock 2 release ' + new Date().toLocaleString());
  }, 5000);
});
