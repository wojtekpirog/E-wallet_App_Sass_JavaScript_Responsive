module.exports = {
  plugins: [
    require('autoprefixer')({
      cascade: false,
      grid: "autoplace",
    }),
    require('cssnano')({
      preset: ['default', {
        discardComments: {
        removeAll: true,
        },
      }]
    }),
  ],
};