# TypeScript Workflow (tsw)

----------


## Overview
This is a sample project configuration that assumes you are using [TypeScript](http://www.typescriptlang.org/) in [Visual Studio Code](https://code.visualstudio.com) with respect to workflow.  There are many more dependencies of course by these are the main two. Other major dependencies include

+ [Node.js](https://nodejs.org/en/)
+ [Gulp](http://gulpjs.com/)
+ [SASS](http://sass-lang.com/)   

You can download as-is can begin to tweak things specific to your web project.  

# Build
The build uses [Gulp](http://gulpjs.com/) as its task runner. The tasks, registered in gulpfile.js, can be accessed from the VS Code command palette by typing "task" and the name of the task (e.g. task transpile).  The following lists the tasks that are available

 + Transpilation from TypeScript to JavaScript
 + CSS Compiliation using SASS
 + HTML Injection
 + Deletion of Transpiled Output
 + Code Quality Checking for both TypeScript and JavaScript
 + Automatic Web Server Restart
 + Automatic Browser Refresh
 + Production Build Pipeline
 + Version Bumping
 + Automated Testing
  
The folder structure assumes nothing about whether you are doing client or server development or both.  The src folder is subdivided between tools, TypeScript (ts), and JavaScript output (js).  If you change the folder structure you will have to change the gulpconfig.js file to match your new set of directories. 


