var {series,parallel,watch} = require('gulp');
var gulp = require('gulp');
var ts = require('gulp-typescript');
var tsProject = ts.createProject("tsconfig.json");
var nodemon = require('gulp-nodemon');
var babel = require("gulp-babel");


/* test GULP SANDBOX start */

function defaultTask(){
    return new Promise((resolve,reject)=>{
        console.log('defaultTask 1')
            resolve('foo');
    })
}

function testTask2(){
    return new Promise((resolve,reject)=>{
        console.log('testTask2 1')

        resolve('boo');
})
}

/* test end */

gulp.task('start', async function (done) {
    tsProject.src().pipe(tsProject()).js.
    pipe(babel({
        presets: ["@babel/preset-env"]
      })). 
    pipe(gulp.dest("dist")).on('end',function(){
        nodemon({
            script: 'dist/server.js'
          , ext: 'js html'
          , env: { 'NODE_ENV': 'development' }
          , done: done
          });
    })
    watch('**/*.ts',{   events:'change', delay:500},function (cb){
        tsProject.src().pipe(tsProject()).js.
        pipe(babel({
            presets: ["@babel/preset-env"]
        })). 
        pipe(gulp.dest("dist"))
        cb();
    })
   
})

exports.default = parallel(defaultTask,testTask2);