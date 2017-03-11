var bundles = __$buildBundles$__;

requirejs.config({
    bundles
});

const scripts: string[] = [
    'manifest.bundle',
    'vendor.bundle',
];

console.log('loaded1, yay');
require(['./main'], (m) => {
    console.log('loaded, yay', m);
    new m.Foo();
});