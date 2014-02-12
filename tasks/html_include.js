/*
 * grunt-html-include
 * https://github.com/qifeng4/html-include
 *
 * Copyright (c) 2014 Liu Qifeng
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var _ = grunt.util._;
  var path = require('path');

  grunt.registerMultiTask('html_include', 'The best Grunt plugin ever.', function() {

    var options = this.options({
      workingDir: 'src',
      componentCSS: 'css/components.css'
    });

    grunt.log.debug('Options', options);

    // Variables available in ALL files
    var globalVars = options.globals;

    var includeRegExp = new RegExp('@@include\\(\\s*["\'](.*?)["\'](,\\s*({[\\s\\S]*?})){0,1}\\s*\\)');

    function replace(contents, localVars){
      localVars = localVars || {};
      var varNames = Object.keys(localVars);
      var varRegExps = {};

      varNames.forEach(function(varName) {

        varRegExps[varName] = varRegExps[varName] || new RegExp('@@' + varName + '@@', 'g');

        contents = contents.replace(varRegExps[varName], localVars[varName]);
      });

      return contents;
    }

    function include(contents){
      var matches = includeRegExp.exec(contents);

      function createReplaceFn (replacement) {
        return function () {
          return replacement;
        };
      }


      while(matches){
        var match = matches[0];
        var includePath = matches[1];
        var localVars = matches[3] ? JSON.parse(matches[3]) : {};

        var realPath = path.resolve(path.join(options.workingDir, includePath)) + '.html';

        if(!grunt.file.isFile(realPath)){
          realPath = path.resolve('components/' + includePath) + '.html';
          try{
            componentCSSContents.push(grunt.file.read(path.resolve('components/' + includePath) + '.css'));
          }catch(e){
          }
        }

        var includeContents = grunt.file.read(realPath);
        includeContents = replace(includeContents, localVars);

        includeContents = include(includeContents, path.dirname(realPath));

        contents = contents.replace(match, createReplaceFn(includeContents));

        matches = includeRegExp.exec(contents);
      }

      return contents;
    }

    var componentCSSContents = [];

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      
      f.src.forEach(function(src){
        if(!grunt.file.isFile(src)){
          return;
        }

        var contents = grunt.file.read(src);

        contents = include(contents);
        
        grunt.file.write(f.dest, contents);
        grunt.file.write(options.componentCSS, componentCSSContents.join('\n'));
      });

    });
  });

};
