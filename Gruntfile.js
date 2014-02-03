// vim: set ft=javascript:

'use strict';

module.exports = function(grunt) {

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // load assemble task
    grunt.loadNpmTasks('assemble');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        config: grunt.file.readJSON('config.json'),

        cacheBuster: grunt.template.today("yyyymmddHHMMss"),

        clean: {
            generated: ['dist/**/*'],
            dependencies: ['bower_components', 'node_modules']
        },

        assemble: {
            // Task-level options.
            options: {
                assets: 'dist',
                layout: 'src/views/layouts/default.hbs',
                partials: 'src/views/partials/**/*.hbs',
                data: 'src/data/*.{json,yml}'
            },
            // Templates to build into pages
            pages: {
                options: {
                    name: '<%= pkg.name %>',
                    version: '<%= pkg.version %>',
                    cacheBuster: '<%= cacheBuster %>',
                    analytics: {
                        'account': '<%= config.analytics.account %>',
                        'domain': '<%= config.analytics.domain %>'
                    },
                    year: grunt.template.today('yyyy')
                },
                files: [
                    {
                        expand: true,
                        cwd: 'src/views/pages/',
                        src: ['**/*.hbs'],
                        dest: 'dist'
                    }
                ]
            }
        },

        copy: {
            data: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/data',
                        src: '*.json',
                        dest: 'dist/data'
                    }
                ]
            },
            fonts: {
                files: [
                    {
                        expand: true,
                        src: 'fonts/**/*',
                        dest: 'dist/css'
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/font-awesome/',
                        src: 'font/**/*',
                        dest: 'dist'
                    }
                ]
            },
            ico: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: '*.ico',
                        dest: 'dist'
                    }
                ]
            },
            txt: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: '*.txt',
                        dest: 'dist'
                    }
                ]
            },
            xml: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: '*.xml',
                        dest: 'dist'
                    }
                ]
            }
        },

        browserify: {
            options: {
                transform: [
                    require('grunt-react').browserify
                ]
            },
            app: {
                src: 'src/js/main.js',
                dest: 'src/js/out.js'
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd-HH:MM:ss") %> */\n'
            },
            build: {
                src: [
                    'bower_components/firebase/firebase.js',
                    'bower_components/react/react.js',
                    'src/js/out.js'
                ],
                dest: 'dist/js/<%= pkg.name %>-<%= cacheBuster %>.min.js'
            }
        },

        less: {
            options: {
                yuicompress: true
            },
            components: {
                files: {
                    'dist/css/<%= pkg.name %>-<%= cacheBuster %>.min.css': [
                        'bower_components/bootstrap/dist/css/bootstrap.css',
                        'bower_components/bootstrap/dist/css/bootstrap-theme.css',
                        'src/less/**/*.less'
                    ]
                }
            }
        }

    });

    grunt.registerTask('default', ['clean:generated', 'browserify', 'uglify', 'less', 'copy', 'assemble']);

};
