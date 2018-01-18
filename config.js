'use strict';

exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/streamlineDb';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-streamlineDb';
exports.PORT = process.env.PORT || 8080;