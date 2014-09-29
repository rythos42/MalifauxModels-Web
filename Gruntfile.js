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
		},
		'ftp-deploy': {
			build: {
				auth: {
					host: 'ftp.geeksong.com',
					port: 21,
					authKey: 'key1'
				},
				src: '.',
				dest: 'public_html/Malifaux',
				exclusions: ['.gitignore', '.jshintrc', '.travis.yml', 'config.xml', 'Gruntfile.js', 'notes.txt', 'package.json', 'README.md', '.ftppass', 'LICENSE',
					'node_modules', 'drawable-hdpi', '.git', 'test']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-ftp-deploy');

	grunt.registerTask('test', ['jshint', 'jasmine']);
	grunt.registerTask('default', ['test']);
	grunt.registerTask('deploy', ['create-ftp-file', 'ftp-deploy']);
	
	grunt.registerTask('create-ftp-file', 'Create an authentication file for FTP', function() {
		var ftpUsername = grunt.option('ftpUsername'),
			ftpPassword = grunt.option('ftpPassword'),
			ftpServer = grunt.option('ftpServer');
			
		var contents = '{"key1":{"username":"' + ftpUsername + '", "password":"' + ftpPassword + '"}}';
			
		grunt.file.write('.ftppass', contents);
			
		//grunt.log.write(ftpUsername + ' ' + ftpPassword + ' ' + ftpServer);
	});
};