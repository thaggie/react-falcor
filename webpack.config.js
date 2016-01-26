module.exports = {
    entry: {
        main: './js/main'
    },
    output: {
        filename: 'public/[name].js'
    },
    resolve: {
    	extensions: ['', '.js', '.jsx']
	},
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            }
        ]
    }

};
