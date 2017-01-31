const path = require('path')

module.exports = {
    name: 'Server',
    entry: path.join(__dirname, '/src/app.ts'),
    output: {
        filename: path.join(__dirname, '/src/app.js'),
        library: true,
        libraryTarget: 'commonjs'
    },
    externals: [
        /^(?!\.|\/).+/i
    ],
    target: 'node',
    stats: {
        colors: true,
        reasons: true,
        chunks: true
    },
    module: {
        preLoaders: [
            {
                test: /\.ts$/,
                loader: "tslint-loader"
            }
        ],
        loaders: [
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.ts$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                loader: 'ts-loader'
            }
        ]
    },
    resolve: {
        extensions: ['', '.ts']
    },
    node: {
        __filename: true,
        global: true,
        process: true
    },
    tslint: {
        //failOnHint: true,
        tsConfigFile: 'tslint.json',
        formattersDirectory: 'node_modules/tslint-loader/formatters/'
    }
}