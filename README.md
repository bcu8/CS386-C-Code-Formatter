# C Code Formatter
Our system is a C code formatter which will recommend changes to a given .c file based on a series of pre-set guidelines; it will not directly change any files, only provide the user with recommendations to change parts of their code. Our system is an application that can format C code to specific guidelines that allows programmers to focus less on formatting and more on coding, prioritizing the quality of a program over the adherence to formatting guidelines. The C code formatter makes organization for programs easier. 

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites
- Github 
- IDE to edit files 
- Test file to be formatted 
- Terminal to work with the system 

### Installing
1. Fork the [repository]([https://github.com/ChrisKeefe/DontPanic](https://github.com/bcu8/CS386-C-Code-Formatter)), then clone to your local machine.
2. Run the system using the command line on your local machine. 

## Running the tests
In order to run the tests, make sure you have Node.js installed. To execute testing, ```cd``` into the program directory and run ```npm test```.

### Break down into end to end tests
Each test runs a specific GUR testing function, and determines if it returns the proper suggestions for different use cases. The tests run strings through the functions, determining if the results are correct for the given parameter. One of the tests focuses on the checkSingleLetterVariables function. Here are some example test cases that it runs through:

#### Test case 1: should suggest more descriptive names for single-letter variables

In this test case, the checkSingleLetterVariables function is called with a code string that contains two single-letter variables (x and y): const codeString = 'int x = 5; char y = "a";';. The function returns a suggestion string that contains suggestions for both of these variables: "Consider using a more descriptive name for variable 'x'. Consider using a more descriptive name for variable 'y'. ". This means that the function correctly suggests more descriptive names for single-letter variables.

#### Test case 2: should not suggest more descriptive names for multi-letter variables

In this test case, the checkSingleLetterVariables function is called with a code string that contains two multi-letter variables (num and letter): const codeString = 'int num = 5; char letter = "a";';. The function returns an empty suggestion string: ''. This means that the function correctly does not suggest more descriptive names for multi-letter variables.

## Built With
- Node.js
- Jest
- VSCode Live Server
- Chrome Dev Tools
- Hostwinds
- Infinity Free Web Hosting
- FileZilla
- ZeroSSL

## Contributing
Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to get involved.

## Versioning
We use [SemVer](http://semver.org/) for versioning. 

## Authors
* **Kane Davidson** - *Initial work* - [kcd1001](https://github.com/kcd1001)
* **Nick Wiltshire** - *Initial work* - [nwwiltshire](https://github.com/nwwiltshire)
* **Ian Tuohy** - *Initial work* - [ipt6](https://github.com/ipt6)
* **Ethan Ikhifa** - *Initial work* - [eji24](https://github.com/eji24)
* **Ryley Fernandez** - *Initial work* - [rnf45](https://github.com/rnf45)
* **Brandon Udall** - *Initial work* - [bcu8](https://github.com/bcu8)

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments
* Professor Leverington, provided the GUR and multiple C utility files used early in development.
* Professor Chaves, assigned this team project.
