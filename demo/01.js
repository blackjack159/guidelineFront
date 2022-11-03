console.log('hello node.js')

export default{
    getList(){
        console.log("获取数据列表2");
    },
    save(){
        console.log("保存数据2");
    }
}
const path = require("path"); //Node.js内置模块
module.exports = {
    entry: './src/main.js', //配置入口文件，main.js文件中已经引入了另外两个js文件
    output: {
    path: path.resolve(__dirname, './dist'), //输出路径，__dirname：当前文件所在路
    径,
    filename: 'bundle.js' //输出文件
    }
}

const path = require("path"); //Node.js内置模块
module.exports = {
    //...,
    output:{},
    module: {
        rules: [
            {
                test: /\.css$/, //打包规则应用到以css结尾的文件上
                use: ['style-loader', 'css-loader']
            }
        ]
    }
}
