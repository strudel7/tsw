See what this guy is doing with Chrome
http://stackoverflow.com/questions/36795273/visual-studio-code-debugging-chrome-breakpoints-wont-hit

  Transpile to CommonJS format using tsc (so at this point it can be bundled using Browserify.  Browserify will do its own transpilation)
  Use Loader or Bundler
    + SystemJS: Add script to 
    + 
  
  Bundle using Browserify 
  
  
  a. So write using TypeScript (ECMA2015)
  b. Set tsc to compile to AMD which is supported by WebPack by default
     The fact that you are using AMD is not relevant because the 
     bundler is going to transpile to a (set) of new new file(s) anyway.  
     Its just an interim syntax that WebPack understands by default.
  c. Create a build to 
       a. Run tsc using AMD
       b. Bundle output to one file
       c. Uglify output
       d. Minify output
     Each should be separate tasks consoliated as dependencies to one task.
  d. Refernece the bundle(s) from index.html