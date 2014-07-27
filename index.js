var http = require('http'),
    util = require('util'),
    fs = require('fs'),
    path = require('path'),
    chalk = require('chalk');

var urlTemplate = 'http://download.dogwood.com.cn/online/grechjx/WordList%s.mp3',
    start = 1,
    end = 42,
    fileBasePath = './download/',
    fileTemplate = 'WordList%s.mp3';

console.log(chalk.red('G') + chalk.green('R') + chalk.yellow('E')
            + chalk.blue(' 词汇精选音频')
            + chalk.cyan('  开始下载！！！'));

console.log(chalk.green('Tips: 每个list的音频大概是13M，所以下载速度会因网速而异，'
            + '请耐心等待哦~ 下载完成的list都在download文件夹中。') )

for (var i = start; i <= end; i++) {
    download(i);
}

function download (i) {
    var str = (i < 10 ? '0' : '') + i,
    url = util.format(urlTemplate, str),
    filename = util.format(fileTemplate, str),
    filePath = path.normalize(fileBasePath + filename);

    fs.exists(filePath, function (exists) {
        if(exists) {
            console.log(chalk.yellow('% ') + chalk.white(filename) + chalk.yellow(' 已存在，不再下载'));
        } else {
            http.get(url, function (res) {
                // console.log(chalk.magenta('$ ') + chalk.white('开始下载 ') + chalk.white(filename));
                res.on('data', function (chunk) {
                    fs.appendFileSync(filePath, chunk);
                });

                res.on('end', function () {
                    console.log(chalk.green('✓ ') + chalk.yellow('下载 ') + chalk.blue(filename) + chalk.green(' 成功!'));
                });
            })
            .on('error', function (err) {
                console.log(chalk.red('X ') + chalk.yellow('下载 ') + chalk.blue(filename) + chalk.red(' 失败!'));
                console.log(err);
            });
        };
    });
}


