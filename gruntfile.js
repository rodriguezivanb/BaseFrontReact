module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            build: {
                src: 'app.js',
                dest: 'app.js'
            }
        },
        browserify: {
            dist: {
                options: {
                    transform: [
                        ['babelify', {presets: ['es2015','react']}]
                    ]
                },        
                src: ["js/app.jsx"],
                dest: "www/app.js"       
            }
        },
        watch:{
            scripts: {
                files: ['js/**/*.jsx'],
                tasks: ['browserify']
            },
            css: {
                files: ['stylus/**/*.styl'],
                tasks: ['stylus']
            }
        },
        stylus:{
            compile: {
                options: {
                    use:[
                        require('nib')
                    ],
                    import: ['nib']
                },
                files: {
                    'www/main.css' : 'stylus/**/*.styl'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-stylus');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['uglify']);

};