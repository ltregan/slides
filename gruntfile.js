const sass = require('node-sass');

module.exports = grunt => {

	require('load-grunt-tasks')(grunt);

	let port = grunt.option('port') || 8000;
	let root = grunt.option('root') || '.';

	if (!Array.isArray(root)) root = [root];

	// Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		meta: {
			banner:
				'/*!\n' +
				' * reveal.js <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd, HH:MM") %>)\n' +
				' * http://revealjs.com\n' +
				' * MIT licensed\n' +
				' *\n' +
				' * Copyright (C) 2019 Hakim El Hattab, http://hakim.se\n' +
				' */'
		},

		uglify: {
			options: {
				banner: '<%= meta.banner %>\n',
				ie8: true
			},
			build: {
				src: 'js/reveal.js',
				dest: 'build/js/reveal.min.js'
			}
		},

		sass: {
			options: {
				implementation: sass,
				sourceMap: false
			},
			core: {
				src: 'css/reveal.scss',
				dest: 'build/css/reveal.css'
			},
			themes: {
				expand: true,
				cwd: 'css/theme/source',
				src: ['*.sass', '*.scss'],
				dest: 'build/css/theme',
				ext: '.css'
			}
		},

		copy: {
			main: {
				expand: true,
				src: [
					'lib/**',
					'downloads/**',
					'images/**',
					'plugin/**',
					'css/**/*.css', '!css/theme/**',
					'favicon.ico'
				],
				dest: 'build',
			},
		},

		includes: {
			options: {
				wrapper: '_wrapper.html'
			},
			files: {
				src: ['*.html', '{workshop,events,internal}/**/*.html', '!**/_*.html'],
				dest: 'build',
				flatten: false,
				cwd: '.',
				options: {
					silent: true,
				}
			}
		},

		autoprefixer: {
			core: {
				src: 'css/reveal.css'
			}
		},

		cssmin: {
			options: {
				compatibility: 'ie9'
			},
			compress: {
				src: 'css/reveal.css',
				dest: 'build/css/reveal.min.css'
			}
		},

		jshint: {
			options: {
				curly: false,
				eqeqeq: true,
				immed: true,
				esnext: true,
				latedef: 'nofunc',
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				eqnull: true,
				browser: true,
				expr: true,
				loopfunc: true,
				globals: {
					head: false,
					module: false,
					console: false,
					unescape: false,
					define: false,
					exports: false,
					require: false
				}
			},
			files: [ 'gruntfile.js', 'js/reveal.js' ]
		},

		connect: {
			server: {
				options: {
					port: port,
					base: root + '/build',
					livereload: true,
					open: true,
					useAvailablePort: true,
					middleware: (connect, options, middlewares) => {
						middlewares.unshift((req, res, next) => { console.log(req.url); next(); });
						return middlewares;
					}
				}
			}
		},

		zip: {
			bundle: {
				src: [
					'index.html',
					'css/**',
					'js/**',
					'lib/**',
					'images/**',
					'plugin/**',
					'**.md'
				],
				dest: 'reveal-js-presentation.zip'
			}
		},

		watch: {
			js: {
				files: [ 'gruntfile.js', 'js/reveal.js' ],
				tasks: 'js'
			},
			theme: {
				files: [
					'css/theme/source/*.sass',
					'css/theme/source/*.scss',
					'css/theme/template/*.sass',
					'css/theme/template/*.scss'
				],
				tasks: 'css-themes'
			},
			css: {
				files: [ 'css/reveal.scss' ],
				tasks: 'css-core'
			},
			test: {
				files: [ 'test/*.html' ],
				tasks: 'test'
			},
			html: {
				files: [ '**/*.html', '!build/**' ],
				tasks: 'includes'
			},
			markdown: {
				files: root.map(path => path + '/*.md')
			},
			options: {
				livereload: true
			}
		}

	});

	// Default task
	grunt.registerTask( 'default', [ 'css', 'js', 'includes', 'copy' ] );

	// JS task
	grunt.registerTask( 'js', [ 'jshint', 'uglify' ] );

	// Theme CSS
	grunt.registerTask( 'css-themes', [ 'sass:themes' ] );

	// Core framework CSS
	grunt.registerTask( 'css-core', [ 'sass:core', 'autoprefixer', 'cssmin' ] );

	// All CSS
	grunt.registerTask( 'css', [ 'sass', 'autoprefixer', 'cssmin' ] );

	// Package presentation to archive
	grunt.registerTask( 'package', [ 'default', 'zip' ] );

	// Serve presentation locally
	grunt.registerTask( 'serve', [ 'default', 'connect', 'watch' ] );

	// Run tests
	grunt.registerTask( 'test', [ 'jshint' ] );

};
