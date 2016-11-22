module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-assemble');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
		/**
	   * Clean build directory
	   */
		clean: {
			build: [
	   			'build/*'
	   		]
		},

		/**
	   * Assemble HTML
	   */
		assemble: {
		  options: {
			partials: ['src/modules/**/*.hbs'],
			layout: ['src/layouts/default.hbs'],
			flatten: true
		  },
		  build: {
			src: ['src/pages/*.hbs'],
			dest: 'build/'
		  }
		},

		/**
	   * Compile CSS
	   */
		sass: {
		  build: {
			files: [{
			  expand: true,
			  cwd: 'src/styles',
			  src: ['styles.scss'],
			  dest: 'build/styles',
			  ext: '.css'
			}]
		  }
		},

		/**
	   * Copy javascript and assets to build directory
	   */
		copy: {
			build: {
			    files: [
						{
							cwd: 'src/scripts',
							src: ['**/*'],
							dest: 'build/scripts',
							expand: true
						},
						{
							src: ['node_modules/jquery/dist/jquery.min.js'],
							dest: 'build/scripts/lib',
							expand: true,
							flatten: true
						},
						{
							src: ['scripts/map.js'],
							dest: 'build/scripts',
							expand: true
						},
						{
							src: ['src/images'],
							dest: 'build/images',
							expand: true,
							flatten: true
						},
						{
							cwd: 'src/icons/fonts',
							src: ['**/*'],
							dest: 'build/styles/fonts',
							expand: true
						}
			  	]
		  	}
		},

		/**
	   * Start server
	   */
		connect: {
			server: {
	      options: {
	        port: 9001,
	        base: 'build',
		      open: true,
					hostname: 'localhost',
					livereload: 35729 // default grunt-contrib-watch livereload port
	      }
	    }
		},

		/**
	   * Watch files
	   */
		watch: {
		  pages: {
		    files: [
					'src/pages/*.hbs',
					'src/layouts/*.hbs',
					'src/modules/*.hbs',
					'src/styles/**/*.scss',
					'src/scripts/**/*.js'
				],
		    tasks: [
					'assemble:build',
			  	'sass:build',
			  	'copy:build'
				],
				options: {
		      livereload: true
		    }
		  }
		}
  });

  grunt.registerTask('build', [
	  'clean:build',
	  'assemble:build',
	  'sass:build',
	  'copy:build'
  ]);

  grunt.registerTask('server', [
	  'clean:build',
   	'assemble:build',
   	'sass:build',
	  'copy:build',
   	'connect:server',
   	'watch'
  ]);

};
