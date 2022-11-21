const gulp = require('gulp');
const GulpSsh = require('gulp-ssh');

let sshConfig = '';

switch (process.env.UMI_ENV) {
  case 'local':
    sshConfig = require('./.sshConfig.local');
    break;
  default:
    sshConfig = require('./.sshConfig.local');
    break;
}

const gulpSSH = new GulpSsh({
  ignoreErrors: false,
  sshConfig: sshConfig.options,
});

gulp.task('sftp-clear', function(done) {
  gulpSSH.shell([`rm -rf ${sshConfig.remoteDirectory}/*`]);
  done();
});

gulp.task('sftp-update', done => {
  return gulp.src('./dist/**').pipe(gulpSSH.dest(sshConfig.remoteDirectory));
  done();
});

gulp.task('sftp-deploy', gulp.series('sftp-clear', 'sftp-update'));
gulp.task('sftp-test', function() {
  gulp.src('./gulpTest.js').pipe(gulpSSH.dest(sshConfig.remoteDirectory));
});
