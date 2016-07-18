#About
This repository holds the code base for the Xpanxion wallboard project.  

The project was transitioned from a traditional Java/Spring/JSP/JQuery application to this project: a single page application (SPA). The project may host 2 or more SPA's dedicated to different sections for the application.  

For example, the following apps can be found:  

1. **Wallboard Display** - Displays the primary wallboard view. 
2. **Wallboard Administration** - Configures data for wallboard view.

# Download the Source Code
1. Fork the project to your Github account.
2. Clone the code using the following:  
```bash
git clone https://github.com/USERNAME/wallboard-angular.git
```

Most of the forward development will be done on the development branch. So at this time, execute the following:  
```bash
git checkout develop
```

# Running the Application
Below are the steps necessary to install and run the application.  

## Tools
Below are the tools required to install and run the application.  
* **IDE** - Use whichever you prefer. Please be sure to add any project ignores to the .gitignore file (if necessary). Below are examples of a few that have been used thus far:    
  * Eclipse
  * IntelliJ
  * WebStorm  
* **Node.js** - Primarily used to build/deploy the project

## Installation
The project's dependencies are not committed directly into the repository. We use Node.js' **npm** to handle the dependency management for the project. To install the dependencies, execute the following inside the repository directory:  
```bash
npm install
```

## Start the Server
Now that the dependencies are installed, we can start the server.  
*Note: Running ```npm install``` is not necessary, as ```npm start``` will execute the installation process, if it has not already been done.*  

```bash
npm start
```

*Note: You will want to be sure that the [Everest](https://github.com/xpanxion/everest) application is up and running.*  

# Miscellaneous
None.
