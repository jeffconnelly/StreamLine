'use strict';

exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://TriciaF:tjandsam01@ds011278.mlab.com:11278/streamline';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-streamlineDb';
exports.PORT = process.env.PORT || 8080;