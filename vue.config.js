module.exports = {
    chainWebpack: (config) => {
        // 发行或运行时启用了压缩时会生效
        config.optimization.minimizer('terser').tap((args) => {
            const compress = args[0].terserOptions.compress
            // 非 App 平台移除 console 代码(包含所有 console 方法，如 log,debug,info...)
            compress.drop_console = true
            compress.pure_funcs = [
                '__f__', // App 平台 vue 移除日志代码
                // 'console.debug' // 可移除指定的 console 方法
            ]
            return args
        })
        // const oneOfsMap = config.module.rule('scss').oneOfs.store
        // oneOfsMap.forEach(item => {
        //     item
        //         .use('sass-resources-loader')
        //         .loader('sass-resources-loader')
        //         .options({
        //             // Provide path to the file with resources（这里是你.scss文件所在路径）
        //             resources: './path/to/resources.scss',
        //
        //             // Or array of paths（这个可以删掉）
        //             resources: ['./path/to/vars.scss', './path/to/mixins.scss']
        //         })
        //         .end()
        // })
    }
}
