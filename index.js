/* jshint node: true */
'use strict';
var vulcanize   = require('broccoli-vulcanize');
var pickFiles   = require('broccoli-static-compiler');
var mergeTrees  = require('broccoli-merge-trees');
var log = require('broccoli-stew').log;

module.exports = {
  name: 'ember-cli-polymer',
  get outputDir() {
    return this.name + '/assets/';
  },
  treeForPublic: function(tree) {
    var vOpts = {
      input: 'elements.html',
      output: this.outputDir + 'vulcanized.html',
      csp: true,
      inline: true,
      strip: false,
      excludes: {
        imports: ["(^data:)|(^http[s]?:)|(^\/)"],
        scripts: ["(^data:)|(^http[s]?:)|(^\/)"],
        styles: ["(^data:)|(^http[s]?:)|(^\/)"]
      }
    };

    var polymerVulcanize = vulcanize('addon', vOpts);

    var polymer = pickFiles('bower_components/', {
      srcDir: '',
      files: [
        'webcomponentsjs/webcomponents.js',
        'polymer/polymer.js',
        'polymer/polymer.html'
      ],
      destDir: this.outputDir
    });

    return mergeTrees([tree, polymerVulcanize, polymer]);

  },
  contentFor: function(type, config) {
    if(type==='head') {
      return '<link rel="import" href="'  + this.outputDir + 'vulcanized.html">\n<script src="'+ this.outputDir +'webcomponentsjs/webcomponents.js"></script>';
    }
  }
};
