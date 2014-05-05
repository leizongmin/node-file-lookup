/**
 * File Lookup Tests
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

var path = require('path');
var should = require('should');
var FileLookup = require('../');


describe('FileLookup', function () {

  it('#add', function () {
    var lookup = new FileLookup();
    should.equal(lookup._paths.length, 0);

    var lookup = new FileLookup('a');
    should.equal(lookup._paths.length, 1);
    should.equal(lookup._paths[0], path.resolve('a'));

    var lookup = new FileLookup(['a', 'b']);
    should.equal(lookup._paths.length, 2);
    should.equal(lookup._paths[0], path.resolve('a'));
    should.equal(lookup._paths[1], path.resolve('b'));

    var lookup = new FileLookup('a');
    lookup.add('b');
    lookup.add('c/d');
    should.equal(lookup._paths.length, 3);
    should.equal(lookup._paths[0], path.resolve('a'));
    should.equal(lookup._paths[1], path.resolve('b'));
    should.equal(lookup._paths[2], path.resolve('c/d'));
  });

  it('#resolve - 1', function (done) {
    var lookup = new FileLookup();
    lookup.resolve('FILE_A.txt', function (filename) {
      should.notEqual(typeof filename, 'string');
      done();
    });
  });

  it('#resolve - 2', function (done) {
    var lookup = new FileLookup();
    lookup.add(path.resolve(__dirname, 'path1/a/d'));
    lookup.resolve('FILE_A.txt', function (filename) {
      should.equal(typeof filename, 'string');
      should.equal(filename, path.resolve(__dirname, 'path1/a/d/FILE_A.txt'));
      done();
    });
  });

  it('#resolve - 3', function (done) {
    var lookup = new FileLookup();
    lookup.add(path.resolve(__dirname, 'path2/c'));
    lookup.add(path.resolve(__dirname, 'path3/e'));
    lookup.add(path.resolve(__dirname, 'path1/a/d'));
    lookup.resolve('FILE_A.txt', function (filename) {
      should.equal(typeof filename, 'string');
      should.equal(filename, path.resolve(__dirname, 'path3/e/FILE_A.txt'));
      done();
    });
  });

  it('#resolveSync - 1', function () {
    var lookup = new FileLookup();
    var filename = lookup.resolveSync('FILE_A.txt');
    should.notEqual(typeof filename, 'string');
  });

  it('#resolveSync - 2', function () {
    var lookup = new FileLookup();
    lookup.add(path.resolve(__dirname, 'path1/a/d'));
    var filename = lookup.resolveSync('FILE_A.txt');
    should.equal(typeof filename, 'string');
    should.equal(filename, path.resolve(__dirname, 'path1/a/d/FILE_A.txt'));
  });

  it('#resolveSync - 3', function () {
    var lookup = new FileLookup();
    lookup.add(path.resolve(__dirname, 'path2/c'));
    lookup.add(path.resolve(__dirname, 'path3/e'));
    lookup.add(path.resolve(__dirname, 'path1/a/d'));
    var filename = lookup.resolveSync('FILE_A.txt');
    should.equal(typeof filename, 'string');
    should.equal(filename, path.resolve(__dirname, 'path3/e/FILE_A.txt'));
  });

});
