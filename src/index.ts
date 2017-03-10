requirejs.config({
    bundles: {
        'vendor.bundle': ['jquery'],
        'app.bundle': ['bar']
    },
});

const scripts: string[] = [
    'manifest.bundle',
    'vendor.bundle',
];

require(scripts, () => {
    console.log('loaded1, yay');
    require(['app.bundle'], () => {
        require(['./main'], () => {
            console.log('loaded, yay');
        });
    });
});