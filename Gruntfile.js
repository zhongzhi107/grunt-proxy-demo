module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({

		connect: {
			server: {
				options: {
					port: 9000,
					base: 'app',
					keepalive: true,
					middleware: function (connect, options) {
						var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
						return [
							// Include the proxy first
							proxy,
							// Serve static files.
							connect.static(options.base),
							// Make empty directories browsable.
							connect.directory(options.base)
						];
					}
				},

				proxies: [
					{
						context: '/api',
						host: 'localhost',
						port: 8080
					}
				]
			},


		}

	});

	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-connect-proxy');

	// Default task(s).
	grunt.registerTask('default', ['configureProxies:server', 'connect']);

};