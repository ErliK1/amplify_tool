This is a script that will make possible creating lambda functions (for now only lambda functions, later will be added the possibility to create different resources and different triggers) inside your amplify project 
The amplify_function should first be set up as a command of your terminal. 

1) Clone the repository in your computer (to make things easier just clone it into ~ directory).
2) Update the amplify_create file by inserting the shebang in the first line (the directory of the program that will execute the script) of the directory of the python version you are using
3) After that, add the directory and location of amplify_create inside the path variable.
4) To update the path variable, open the .rc file (if you are using zsh shell, open the .zshrc) and update the path with the new directory, ex: export PATH="/Path/To/amplify_tool:$PATH"
5) You are ready to run the script inside your amplify project.

To run the script you should execute the command like this:

  amplify_create <type_of_resource> <name>

For the moment, the only type of resource available is function, so it would look something like this:

  amplify_create function my-function

If you would like that the name of the function would look something like this: theFunctionName, then you should pass the name of the directory that will hold the resource.ts and handle.ts
in kebab form (the-function-name). If you pass it like that, the script will take care itself to name the function as theFunctionName.

This will create the function directory and its resources and handles and will also populate the handle.ts and resource.ts files with the proper data, while it will update the backend.ts with the new additions.

Enjoy!
