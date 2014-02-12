### html-include

语法：

1. 相对于当前路径，引用file.html

@@include('file')，如果当前路径没有，会在项目根路径的components下找


2. 如果引用的是components目录下的文件，会将该文件对应的file.css写入css/components.css中（如果file.css没有找到，则认为该组件不需要css）

所以，components目录其实是一些常用组件，而工作目录下通常是源码


3. 配置
  `options: {
    workingDir: 'test/fixtures',
    componentCSS: 'css/components.css'
  },
  files: {
    'dest/index.html': 'test/fixtures/testing.html',
  }`

  其中，workingDir是源码路径，componentsCSS是生成的组件css文件位置

  files是源码和生成代码之间的对应文件


3. 在模板文件中，还可以试用@@var@@来设置变量，@@include的时候可以传入第二个参数，以支持变量，如：

  @@include('people', {"name": "Liuda", "age": 26})

  甚至，第二个参数的键值对还能再次填入@@include，如：

  @@include('column_670_300', {"left": "@@include('leftContent')", "right": "@@include('rightContent')"})

  从而实现模板嵌套