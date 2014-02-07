module.exports = {
    dist: {
        files: [
            {
                expand: true,
                dot: true,
                cwd: '<%%= yeoman.client %>',
                dest: '<%%= yeoman.dist %>',
                src: [
                    '*.{ico,png,txt}',
                    '.htaccess',
                    'images/{,*/}*.{webp,gif}',
                    'styles/fonts/*'
                ]
            },
            {
                expand: true,
                cwd: '.tmp/images',
                dest: '<%%= yeoman.dist %>/images',
                src: [
                    'generatred/*'
                ]
            }
        ]
    }
}
