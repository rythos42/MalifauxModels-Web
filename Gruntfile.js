/* jshint node: true */
module.exports = function (grunt) {
	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			all: [
				'Gruntfile.js',
				'js/app/**/*.js',
				'js/test/**/*.js'
			],
			options: {
				jshintrc: '.jshintrc'
			},
		},
		jasmine: {
			src: [
				'js/app/Model/TextFieldSearchOption.js',
				'js/app/Model/*.js',
				'js/app/Model/Assemblers/*.js',
				'js/app/Mappers/*.js',
				'js/app/Managers/*.js',
				'js/app/ViewModels/*.js',
				'js/app/CustomBinders/*.js',
			],
			options: {
				specs: 'js/test/**/*.js',
				vendor: 'js/lib/**/*.js',
				display: 'short',
				summary: true
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-jasmine');

	grunt.registerTask('test', ['jshint', 'jasmine']);
	grunt.registerTask('default', ['test']);
	
	grunt.registerTask('deploy', 'deploy', function() {
		/*var ftpUsername = grunt.option('ftpUsername'),
			ftpPassword = grunt.option('ftpPassword'),
			ftpServer = grunt.option('ftpServer');*/
			
		//grunt.log.write(ftpUsername + ' ' + ftpPassword + ' ' + ftpServer);
	});
};