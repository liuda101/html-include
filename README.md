### html-include

##### How to use

1. `@@include('filename')`

    Write the content of `./filename.html` here.

    If `./filename.html` doesn't exist, it will search for it in the directory of `/components`.

    Besides, the `/components/filename.css` will be writeen to `/css/components.css`. So that,

    you should put your common HTML components and CSS in the directory of `/components`

2. `@@include('filename', {"title": "HTML Include"})`

    This will replace all the `@@title@@` in `./filename.html` with `HTML Include`.

3. `@@include('filename', {"left": "@@include('leftContent')", "right": "@@include('rightContent')"})`

    Support nesting include.

4. You could use `@@include` in the including file.

5. Configuration

    `options: {`

      `workingDir: 'src',`

      `componentCSS: 'css/components.css'`

    `},`

    `files: {`

      `'dest/index.html': 'src/index.html'`

    `}`

    `workingDir`: the html source directory

    `componentCSS`: the file of components.css

    `files`: the files to 'html-include'