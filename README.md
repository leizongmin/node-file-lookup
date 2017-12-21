node-file-lookup
================

[![Greenkeeper badge](https://badges.greenkeeper.io/leizongmin/node-file-lookup.svg)](https://greenkeeper.io/)

指定一组目录，依次搜索指定文件（相对路径），返回其绝对文件路径，支持同步和异步方法

使用方法：

```JavaScript
var FileLookup = require('file-lookup');

var lookup = new FileLookup();

// 添加一系列目录，按添加顺序搜索
loolup.add('/path/1');
loolup.add('/path/2');

// 取实际文件名
lookup.resolve('file', function (filename) {
  if (filename) {
    console.log('Path: %s', filename);
  } else {
    console.log('Cannot lookup file');
  }
});

// 同步版本
var filename = lookup.resolveSync('file');
if (filename) {
  console.log('Path: %s', filename);
} else {
  console.log('Cannot lookup file');
}
```