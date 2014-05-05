/**
 * File Lookup
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

var fs = require('fs');
var path = require('path');
var async = require('async');
var debug = require('debug')('file-lookup');


module.exports = FileLookup;

function FileLookup (paths) {
  var me = this;
  me._paths = [];
  if (typeof paths === 'string') {
    me.add(paths);
  } else if (Array.isArray(paths)) {
    paths.forEach(function (item) {
      me.add(item);
    });
  }
}

FileLookup.prototype._relativePath = function (file) {
  return file.trim().replace(/^(\/|\\)*/, '');
};

FileLookup.prototype.add = function (dir) {
  dir = path.resolve(dir);
  if (this._paths.indexOf(dir) === -1) {
    debug('add: %s', dir);
    this._paths.push(dir);
  }
};

FileLookup.prototype.resolve = function (file, callback) {
  file = this._relativePath(file);
  debug('resolve: %s', file);
  var paths = this._paths;
  var resolveFilename;
  async.eachSeries(paths, function (dir, next) {
    var f = path.resolve(dir, file);
    debug(' - lookup path: %s', dir);
    fs.exists(f, function (exists) {
      if (exists) {
        debug('   - exists: %s', f);
        resolveFilename = f;
        next(f);
      } else {
        next();
      }
    });
  }, function (err) {
    callback(resolveFilename);
  });
};

FileLookup.prototype.resolveSync = function (file) {
  file = this._relativePath(file);
  debug('resolve: %s', file);
  var paths = this._paths;
  for (var i = 0; i < paths.length; i++) {
    var dir = paths[i];
    var f = path.resolve(dir, file);
    debug(' - lookup path: %s', dir);
    if (fs.existsSync(f)) {
      return f;
    }
  }
};
