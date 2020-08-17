//
const gulp = require('gulp');
const GulpSsh = require('gulp-ssh');
// const ftp = require('vinyl-ftp')

let sshConfig = '';

switch (process.env.UMI_ENV) {
  case 'local':
    sshConfig = require('./.sshConfig.local');
    break;
  case 'dev':
    sshConfig = require('./.sshConfig.dev');
    break;
  case 'prod':
    sshConfig = require('./.sshConfig.prod');
    break;
  default:
    sshConfig = require('./.sshConfig.local');
    break;
}

const gulpSSH = new GulpSsh({
  ignoreErrors: false,
  sshConfig: sshConfig.options,
});

// gulp Did you forget to signal async completion? 这里的要当前的task 进行结束
// 清除服务器上的文件
gulp.task('sftp-clear', function(done) {
  gulpSSH.shell([`rm -rf ${sshConfig.remoteDirectory}/*`]);
  done();
});

// 上传
gulp.task('sftp-update', done => {
  return gulp.src('./dist/**').pipe(gulpSSH.dest(sshConfig.remoteDirectory));
  done();
});

gulp.task('sftp-deploy', gulp.series('sftp-clear', 'sftp-update'));

// const ftpConfig = require('./.ftpConfig')
// var conn = ftp.create(ftpConfig.options)

gulp.task('sftp-test', function() {
  gulp.src('./gulpTest.js').pipe(gulpSSH.dest(sshConfig.remoteDirectory));
});
