module.exports = function(grunt){
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		sass: {
			dist: {
				options: {
					style: 'compressed',
					sourcemap: 'none',
					precision: 2,
					update: true
				},
				files: {
					'css/style.css' : 'src/scss/style.scss'
				}
			}
		},
		/*POST CSS*/
		postcss: {
			options: {
				map: false,
				processors: [
				require('autoprefixer')({browsers: 'last 2 versions'}),
				require('cssnano')()
				]
			},
			dist: {
				src: 'css/*.css'
			}
		},
		babel: {
			options: {
        		sourceMap: true,
        		presets: ['babel-preset-es2015']
    		},
    		dist: {
        		files: [{
                	expand: true,
                	cwd: 'src/js/',
                	src: ['*.js'],
                	dest: 'ec5/'
            	}]
       		}
		},
		/* CONCAT 
		concat: {
			options: {
				separator: '\n'
			},
			dist: {
				src: ['ecs/planet.js', 'ecs/planet.js'],
				dest: 'src/build/script.js'
			}
		},*/
		/* UGLIFY*/
		uglify: {
			options: {
				beautify: false,
				preserveComments: false,
				quoteStyle: 1,
				compress: {
					drop_console: true
				}
			},
			build: {
				files: [{
					expand: true,
					src: 'ec5/*.js',
					dest: 'js/',
					flatten: true,
					rename: function(destBase, destPath){
						return destBase+destPath.replace('.js', '.min.js');
					}
				}]
			}
		},
		/* WATCH */
		watch: {
			css: {
				files: ['**/*.scss'],
				tasks: ['sass', 'postcss']
			},
			ec5: {
				files: ['src/js/*.js'],
				tasks: ['babel']
			},
			js: {
				files: ['ec5/*.js'],
				tasks: [/*'concat',*/ 'uglify']
			}

		}
	});
	grunt.registerTask('default', ['watch']);
}