# starter-gulp-browserify-sass-php
Front-end starter kit with tools for development:

- gulp as task runner
- browserify for javascript module management with ES6 enabled
- sass as css preprocessor
- php for templating and future CMS integration

## Usage
```
git clone https://github.com/garousianstudio/starter-gulp-browserify-sass-php.git
cd starter-gulp-browserify-sass-php

generate a .env file based on .env-sample.
set BASEURL to the root of project folder in local

# install dependencies
npm install

# start development server, run browserSync and open browser
npm run dev
```

## Tasks
```
npm run dev => start dev server and gulp tasks for js and css
npm run build => use it for production
npm run serv => start dev server
npm run disc => evaluate minified output script and generate a visual chart to see what takes up space in bundle
```

## Notes
- This starter is using 'iransans' as its default font type. If you want to use that, uncomment importing `fonts` in `src/scss/base/_base.scss` file and add files to fonts folder `public/fonts`. To use 'iransans' font visit their [home page](http://fontiran.com)

## License
MIT, see [LICENSE.md](https://github.com/garousianstudio/starter-gulp-browserify-sass-php/blob/master/LICENSE) for details.


