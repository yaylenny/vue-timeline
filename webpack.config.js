
module.exports={
  entry: "./src",
  output:{
    library: "VueTimeline",
    libraryTarget: "umd",
    path: __dirname + '/dist',
    filename: 'vue-timeline.js'
  },
  module:{
    loaders:[
      { test: /\.js$/, loader: 'babel-loader' },
      { test: /\.scss$/, loaders: [ "style-loader", "css-loader", "sass-loader"] },
      { test: /\.vue$/, loader: 'vue-loader',
        options:{
          scss: 'style!css!sass'
        }
      },
      { test: /\.css$/, loaders: [ "style-loader", "css-loader"] }
    ]
  }
}
