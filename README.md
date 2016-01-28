# livereload-inject-cli
livereload-inject-cli is a super simple CLI tool to inject the [livereload JS
snippet](http://feedback.livereload.com/knowledgebase/articles/86180-how-do-i-add-the-script-tag-manually-)
into a specified file, nothing more. By default the injection is done at the end
of `<body>`. I originally wrote it for a project using npm as a build tool,
in need of livereload, and couldn't find a good already existing solution.

An npm scripts use case could maybe look something like this;

```
"scripts": {
  "watch": "build && (watch-js & watch-scss & livereload & wait)",
  "livereload": "livereload-inject-cli src/index.html dist/index.html && tiny-lr-it ."
}
```

## Usage

`livereload-inject-cli <target file path> <destination path> [OPTIONS]`

Where;
```
<target file path>
    The file to be injected with the livereload <script> snippet

<destination path>
    Optional. The destination to where the injected file will be written.
    If no destination path is provided it the target file will be overwritten.

[OPTIONS]
    -h, --head    Inject the <script> snippet at the end of <head> instead of
                  <body>, as is the default if this option is omitted.
```

## Contribution
Very welcome! Go nuts.

## License
MIT
