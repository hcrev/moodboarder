module.exports = {
    files: {
        javascripts: {
            joinTo: {
                'vendor.js': /^vendor\//,
                'app.js': 'app/application.js'
            },
            order: {
                before: [
                        'vendor/jquery.js',
                        'vendor/jquery.easing.js',
                        'vendor/bootstrap.js'
                    ]
            }
        },
        stylesheets: {
            joinTo: {
                'vendor.css': /^vendor\//,
                'app.css': /^app\//

            }
        }
    },
    npm: {
        enabled: false
    },
    modules: {
        wrapper: false,
        definition: false
    }
};
