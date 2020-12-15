const proConfig = require('../../src/share/pro-config');

module.exports = function freePort(port) {
  if (process.platform && process.platform !== 'win32') {
    const args = process.argv.slice(2);

    let protArg = args && args[0];
    if (protArg && protArg.indexOf('--') > 0) {
      prot = protArg.split('--')[1];
    }
    let order = `lsof -i :${port}`;
    let exec = require('child_process').exec;
    exec(order, { shell: '/bin/zsh' }, (err, stdout, stderr) => {
      if (err) {
        return console.log(`查看端口命令出错 ${err}`);
      }
      stdout.split('\n').filter(line => {
        let p = line.trim().split(/\s+/);
        let address = p[1];
        if (address != undefined && address != 'PID') {
          exec('kill -9 ' + address, (err, stdout, stderr) => {
            if (err) {
              return console.log('释放指定端口失败！！');
            }
            console.log('port kill');
          });
        }
      });
    });
  }
};
