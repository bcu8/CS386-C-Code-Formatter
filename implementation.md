### 1. Introduction

**Provide a short paragraph that describes your system. This paragraph should contain the value proposition and the description of the main features of the software. At the end of the introduction, include links to your project on GitHub and Trello.**

Our system is a C code formatter which will recommend changes to a given .c file based on a series of pre-set guidelines; it will not directly change any files, only provide the user with recommendations to change parts of their code. Our system is an application that can format C code to specific guidelines that allows programmers to focus less on formatting and more on coding, prioritizing the quality of a program over the adherence to formatting guidelines. The C code formatter makes organization for programs easier. 

[Project Repo](https://markdownlivepreview.com/).

### 2. Implemented requirements

**List in this section, the requirements (user stories, issues, or use cases) that you
implemented for this release. We expect that you implement/prototype features you
specified in your MVP (c.f. D.2 Requirements). Include who worked on each of the
features. We expect that all the members of the group have been involved in some
programming activities. BTW, we will check if you are using Trello to manage the
implementation tasks.**

Requirement: “As a C programming student, I frequently lose points on GUR formatting issues, and would like to be able to scan my code for errors before I submit.”
Issue: Nick - 2 User Stories · Issue #15 · bcu8/CS386-C-Code-Formatter · GitHub
Pull Request: https://github.com/bcu8/CS386-C-Code-Formatter/pull/32
Implemented by: Nick Wiltshire
Approved by: Nick Wiltshire

Requirement: Easily accessible file with formatting errors
Issue: Decide delivery method for users · Issue #25 · bcu8/CS386-C-Code-Formatter (github.com)
Pull Request: https://github.com/bcu8/CS386-C-Code-Formatter/pull/30
Implemented by: Brandon Udall
Approved by: Brandon Udall

Requirement: “As someone new to programming, I would like an easy way to ensure my code is always formatted the same way to help keep track of the code.”
Issue: https://github.com/bcu8/CS386-C-Code-Formatter/issues/13
Pull request: https://github.com/bcu8/CS386-C-Code-Formatter/pull/6
Implemented by: Kane Davidson
Approved by: Nick Wiltshire




### 3. Tests

*3.1.3 Test Example
	* Link to testing above.
	*Test case example:
One of the tests focuses on the checkSingleLetterVariables function. Here are some example test cases that it runs through:

Test case 1: should suggest more descriptive names for single-letter variables

In this test case, the checkSingleLetterVariables function is called with a code string that contains two single-letter variables (x and y): const codeString = 'int x = 5; char y = "a";';. The function returns a suggestion string that contains suggestions for both of these variables: "Consider using a more descriptive name for variable 'x'. Consider using a more descriptive name for variable 'y'. ". This means that the function correctly suggests more descriptive names for single-letter variables.

Test case 2: should not suggest more descriptive names for multi-letter variables

In this test case, the checkSingleLetterVariables function is called with a code string that contains two multi-letter variables (num and letter): const codeString = 'int num = 5; char letter = "a";';. The function returns an empty suggestion string: ''. This means that the function correctly does not suggest more descriptive names for multi-letter variables.
*3.1.4 Test Results
![image](https://user-images.githubusercontent.com/116871920/227813367-9d9b58ed-8ab1-4be7-a58a-11a4108c9575.png)



### 4. Adopted technologies

* JavaScript 
        * The program used to analyze input files and provide feedback is written in JavaScript. This was decided due to the ease of using JavaScript within web pages.
* Web Hosting technologies (html/css/php)
        * Used to deliver our product to users. Web sites are convenient for us because everyone has immediate access to our product if given a link.
* SSH & FTP
        * These are the technologies we use for getting our code to the website's server for deployment. 
* Jest
        * We are using Jest to test our JavaScript program for correct outputs given a specific input.

### 5. Learning/training

* Peer instruction
       * If one member knows a technology they can demonstrate and explain the parts of that technology that we need for the project to the other members.
* General internet research
        * If one member wants to brush up on a technology on a wider scale they could read/watch relevant online sources.
* Trial and error via localhost
        * A big part of web development is just trying things. We can use the VSCode live server extension to test website behavior on localhost before publishing changes to the actual site.

### 6. Deployment

**Your system should use containers and Docker. Describe how you are deploying your
system in production. Remember that AWS Educate offers free credits for students. See
the tutorial at https://docker-curriculum.com/ on how to create a container and deploy
it on AWS. Provide a link for the system in production.**

As the system for our software runs on a website, we’re unable to run it on a container separately from the website.

### 7. Licensing

**Inform the license you adopted for your source code (remember to configure GitHub
accordingly) and why you adopted this license. For more information, check [https://choosealicense.com/](https://choosealicense.com/) and [http://redhat.slides.com/glikins/open-sourcelicensing-101#/](http://redhat.slides.com/glikins/open-sourcelicensing-101#/)**

**MIT License**

- [MIT license overview](https://choosealicense.com/licenses/mit/)

- [Our License](https://github.com/bcu8/CS386-C-Code-Formatter/blob/main/LICENSE.md)

We chose to adopt the MIT license in order to make it as accessible as possible to anyone who would like to work with it. 

### 8. Readme File

**You should also prepare your repository for receiving new contributors. See an example
of a Readme.md file at [https://gist.github.com/PurpleBooth/109311bb0361f32d87a2](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)
Besides the Readme.md file, your repository should contain a CONTRIBUTING.md
file, a LICENSE file, and a CODE_OF_CONDUCT.md file. Search online for some
examples of these files. In this section of the deliverable, put links to these files on GitHub.**

- [README.md](https://github.com/bcu8/CS386-C-Code-Formatter/blob/main/README.md)

- [CONTRIBUTING.md](https://github.com/bcu8/CS386-C-Code-Formatter/blob/main/CONTRIBUTING.md)

- [CODE_OF_CONDUCT.md](https://github.com/bcu8/CS386-C-Code-Formatter/blob/main/CODE_OF_CONDUCT.md)

- [LICENSE.md](https://github.com/bcu8/CS386-C-Code-Formatter/blob/main/LICENSE.md)

### 9. Look & feel

**Describe the approach you adopted to design your user interface. Include some
Screenshots.**

![image](https://user-images.githubusercontent.com/116871920/227813007-67df9c3a-38c0-4d8d-ae87-149bdd48fc12.png)

![image](https://user-images.githubusercontent.com/116871920/227813112-2effc49a-d7c5-4d12-b854-e13217b0f98f.png)


We chose to use a user interface that was clean and easy to use, as well as an interface that was simple and without an unnecessary amount of pages. The results interface could be improved, but for now it displays the user’s code back to them with highlighting and injected suggestions. It shows the user what issues the formatter found in red and suggestions on how to fix them in blue.



### 10. Lessons learned

**In retrospective, describe what your team learned during this first release and what you
are planning to change for the second release.**

The C code formatter project faced several problems throughout the early stages of development. Some particular problems that we ran into include understanding and coding in a new language, figuring out and planning ahead of how we wanted to do everything, and assigning or splitting tasks that are more suitable to the respective team member. To work on these problems before and during the second release, all members will invest more time in learning and practicing the language. This includes online courses, reading books or tutorials, and working on similar projects. The team will also include more specifications of tasks during meetings, and exactly what issues or functions the team member plans to work on. This will clear confusion, and allow for more work to be distributed among the team. To help team members who specialize in certain areas, we will try to assign work as closely related to their strengths as possible. This will make the team member less frustrated, and allow them to contribute to their full capacity. 


### 11. Demo

**Include a link to a video showing the system working.**

Try it here: http://nwiltshire.com/cformatter/

https://youtu.be/AkuTitF8bJQ 
