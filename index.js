/* jshint node: true */
'use strict';
var vulcanize   = require('broccoli-vulcanize');
var mergeTrees  = require('broccoli-merge-trees');
var log = require('broccoli-stew').log;

module.exports = {
  name: 'poc-ember-cli-polymer',
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
    return mergeTrees([tree, polymerVulcanize]);

  },
  contentFor: function(type, config) {
    if(type==='head') {
      return '<link rel="import" href="'  + this.outputDir + 'vulcanized.html">';
    }
  }
};
