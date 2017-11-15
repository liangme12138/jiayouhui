'use strict';

/*
	利用gulp-sass编译css
		* requie(): 导入模块
 */

var gulp = require('gulp');
var sass = require('gulp-sass');


// 创建一个任务
// 用来编译sass
gulp.task('compileSass',function(){
	// 查找文件位置
	gulp.src('./src/sass/*.scss') //得到文件流（文件在内存中的状态）

		.pipe(sass({outputStyle:'expanded'}).on('error', sass.logError))	//编译sass文件
		.pipe(gulp.dest('./src/css/'))			//输出到硬盘
});


// 监听文件的任务
gulp.task('jtSass',function(){
	// 监听home.scsss文件
	// 如果有修改，则执行compileSass任务
	gulp.watch('./src/sass/*.scss',['compileSass'])
})


//运行任务
//命令行输入（项目根目录）：gulp 任务名

// 自动刷新
var browserSync = require('browser-sync');
gulp.task('server',function(){
    browserSync({
        // 静态服务器
        // server:'./src/',

        // 代理服务器
        proxy:'http://localhost:2008',

        // 端口
        port:2008,

        // 监听文件修改，自动刷新浏览器
        files:['./src/**/*.html','./src/css/*.css','./src/api/*.php']
    });



    // 开启服务器的同时，监听sass的修改
    gulp.watch('./src/**/*.scss',['compileSass']);
})
