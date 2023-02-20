# Requirements

## 1. Positioning
### 1.1. Problem Statement :
	The problem of inconsistent formatting between programmers affects their grade in classes and other programmers, the impact of which costs student programmers grade reductions for assignments  as well as impacts readability for programmers from one program to the next.


### 1.2. Product Position Statement :
	For users of C who want a standardized and simple way for formatting code. The C-Code Formatter is a code formatter that integrates the GUR formatting and usage requirements from CS136 and CS249. Unlike most ide formatters, our product will show where GUR violations occur as well as how many points the fix is worth in addition to applying general formatting for readability.

### 1.3. Value Proposition & Consumer Segments:
	Value Propositions: C Code Formatter is an application that can format C code to specific guidelines that allows programmers to focus less on formatting and more on coding, prioritizing the quality of a program over the adherence to formatting guidelines.
	Consumer Segments: Computer Science related college students.

## 2. Stakeholders
**Users**: 
* Student Programmers - student programmers may need to implement certain guidelines respective to the C programming language for assignments or projects
* C Program Users - general C program users might need a specific way of formatting their code so that it is readable, consistent, and efficient
* Teachers - teachers may use this software in order to grade or track the organization and consistency of a students code
	
**Competitors**: 
* Other C code formatters - these other competitors provide a different set of guidelines and rules

**Detractors**: People who don’t want to format their guide

**Developers**: Kane Davidson, Ryley Fernandez, Nick Wiltshire, Ian Tuohy, Brandon Udall, and Ethan Ikhifa 




## 3. Functional Requirements
Ability to upload .c files
Search through uploaded file and markdown GUR/Formatting violations
Return edited file with suggestions, comments, and conclusive GUR summary
Potential Ideas
* Allow insertion of other templates to be used
* Allow folder submission of whole collection of valid .c files



## 4. Non-Functional Requirements
Website with descriptions, rubrics, and examples provided
User provided files must not be altered by the program
Formatted code will be placed in a file with name, <user_program_name>FORMATTED.c.
A list of GUR violations will be viewable in the main interface of the program (non-downloadable).

## 5. MVP
The MVP should be a program which formats input files’ spacing and adds comments that include where GUR violations occurred as well as adds up how many points the detected violations are worth.

## 6. Use Cases

### 6.1 Use Case Diagram

![image](https://user-images.githubusercontent.com/123568619/220022903-3ced4163-1ddd-406c-99c8-f0aece24e72e.png)


### 6.2 Use Case Descriptions and Interface Sketch

**Use Case**: Viewing File with Comments on website
**Actor**: C Code Formatting User  
**Description**: The user will be able to see their uploaded file along with additional comments and an evaluation regarding GUR violations and formatting suggestions   
**Preconditions**: The user properly uploaded their file to the formatter 
**Postconditions**: The user can download the edited file with GUR suggestions 
**Main Flow**:
1. The use case begins when the C Code Formatting user has finished uploading their .c file 
2. After uploading, the software will read in the file and insert comments and suggestions regarding GUR violations and improper formatting.
3. The user will also be presented with an overall performance and deduction calculation relating to General Usage Rubric violations
4. The use case ends.
**Alternative Flow**:
N/A
**User Interface Sketch**

![image](https://user-images.githubusercontent.com/123568619/220023166-fb1798ef-fb0e-4a5d-b366-8fdcfe8f3926.png)

**Use Case**: Upload File
**Actor**: C Code Formatting User  
**Description**: The user can upload their file to be then tested by the software for formatting issues.   
**Preconditions**: The user has a .c file that can compile correctly 
**Postconditions**: The user can initiate the testing and formatting of the file. 
**Main Flow**:
1. The use case begins when the C Code Formatting user has opened the website to upload their file. 
2. Afterwards, the user will upload their file to be read in by the software.
3. The user can then begin the process to edit and check the file’s formatting.
4. The use case ends.
**Alternative Flow**:
N/A
**User Interface Sketch**

![image](https://user-images.githubusercontent.com/123568619/220023304-1e04c67c-e05b-445e-bede-d9c3dc4c5f70.png)


**Use Case**: Academic Comparative Research Reference 
**Actor**: C Code Formatting User  
**Description**: The user will be able to conduct research and test or complete their own uncut C-code file and run the formatter for a valuable learning reference. The user can input their code and have the software identify formatting issues that need to be fixed.
**Preconditions**: The user properly uploaded their file to the formatter reference file or just pull it up in a text-editor. The user has a code file that can compile correctly.
**Main Flow**:
1. The use case starts when a C Code Formatting user decides they need a reference or  academic comparative research and when the user opens the software. 
2. After upload, the software will read in the file and insert comments and suggestions allowing the user to .
3. The user will also be presented with an overall performance and deduction calculation relating to General Usage Rubric violations
4. The use case ends.
**Alternative Flow**:
N/A
**User Interface Sketch**

![image](https://user-images.githubusercontent.com/123568619/220023421-830e05e2-7d8d-4084-a79d-da91fb2440e7.png)


**Use Case**: Download edited file 
**Actor**: C-code formatter user 
**Description**: The user downloads the formatted .c file after uploading it to be formatted.  
**Preconditions**: The user uploaded their pre-formatted file to the formatter. 
**Postconditions**: The user can download their formatted .c file. 
**Main Flow**:
The use case begins after the user uploads their file to be formatted. 
The user downloads their formatted file. 
The user checks their file to ensure it has been formatted correctly.
The use case ends.  

**Alternative Flow**:
N/A
**User Interface Sketch**

![image](https://user-images.githubusercontent.com/123568619/220023530-083ba075-45e7-442a-add1-4db56c75a74b.png)


**Use Case** : Viewing GUR Guidelines
**Actor** : C-Code Formatting User
**Description** :  The user can click to see the GUR that will be referenced by the program. In other words only the violations on the referenced GUR will be flagged by program.
**Preconditions** : NA
**Postconditions** : NA
**Main Flow** : 
The user clicks to view the GUR
The user views the GUR
The user exits the GUR view
The use case ends

**Alternative Flow** : NA
**User Interface Sketch**

![image](https://user-images.githubusercontent.com/123568619/220023643-a84faa01-907d-48e7-a32a-187866a05bc7.png)


**Use Case**: Sending Feedback to the developers
**Actor** :C-Code Formatter user
**Description** :  The user will have a panel where they can submit anonymous feedback to the devs. It could be suggestions, bugs, complaints etc.
**Preconditions** : NA
**Postconditions** : NA
**Main Flow** : 
Click add comment button in main interface
Type comment in text box
Submit
**Alternative Flow** : NA
**User Interface Sketch**

![image](https://user-images.githubusercontent.com/123568619/220023728-3f15fa97-38dc-40bd-af80-b545688d1246.png)


**Use Case**: View Source Code
**Actor** :C-Code Formatter user
**Description** :  User can view the github page and look at the source code.
**Preconditions**:NA 
**Postconditions**: NA
**Main Flow**:
Click link to view source code from the main interface
**Alternative Flow**: NA
**User Interface Sketch**

![image](https://user-images.githubusercontent.com/123568619/220023809-68c7216e-b924-4f66-9395-fb7543ddc3ec.png)


## 7. User Stories

**User story 1**: “As a C programming student, I frequently lose points on GUR formatting issues, and would like to be able to scan my code for errors before I submit.” Priority 6, Est. Hours: 4.

**User story 2**: “As a C programming professor, I spend a lot of time grading my students’ C files on GUR, and would like a tool that can quickly scan code for errors.” Priority 6, Est. Hours: 4.


**User story 3**: “As an amateur programmer, I’d like to be able to select certain GUR requirements to have fixed, so I can work on improving certain aspects of my code.” Priority: 8, Est. Hours: 2

**User story 4**: “As a programmer working on a large team, I’d like to be able to automatically format code added to our repository, to be efficient.” Priority: 6, Est. Hours: 10

**User story 5**: “As a grader for a C program class, I would like to easily give feedback and suggestions for the student’s code formatting so that they are able to fix their mistakes and create more readable code.” Priority: 7, Est. Hours: 8
**User story 6**: “As a student programmer, I want an environment where I can easily upload code to be quickly checked for bad formatting so that I can fix bad practices without searching through every line of code myself.” Priority: 5, Est. Hours: 6

**User story 7**: “As a member of a group project, I would like the program setup to be simple or non-existent so all members can seamlessly implement formatting.” Priority: 5, Est. Hours: 6.
 
**User story 8**: As a student expecting an internship this summer, I would like to impress my new employers by following the best coding practices and formatting whenever I code in C.” Priority 6, Est. Hours: 4.

 
**User story 9**: “As someone new to programming, I would like an easy way to ensure my code is always formatted the same way to help keep track of the code.“ Priority 6, Est. Hours: 4.

**User story 10**:“As a project manager, I would like a way to have each program I review be formatted the same way so I can easily read each line of code.” Priority 6,  Est. Hours: 4.

**User story 11**: “Despite the fact that I rarely struggle styling simple C programs I still would enjoy a code formatter/styler that takes care of rudimentary and implicit formatting necessary to understand basic C programs.“ Priority: 5, Estimated hours: 6. 

**User story 12**: “As a student in the computer science program here at NAU working hard everyday to complete my degree I believe Saving Time anywhere you can is crucial to success. a program like this could optimize that and help me spend time on the things that need it most.” Priority: 5, Estimated hours: 6. 



## 8. Issue Tracker

https://github.com/bcu8/CS386-C-Code-Formatter/issues?q=is%3Aissue+is%3Aclosed 
![image](https://user-images.githubusercontent.com/123568619/220024304-94f7b7a4-ec20-436e-8420-c2ec1869cf9b.png)


