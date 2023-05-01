
# Implementation 2

### Introduction

Our product is aimed at saving programmers time writing professional code. Users are allowed to create a personal account and upload their files to view formatting suggestions. Users may store as many files in our system as they like which can be accessed and downloaded later 

**Our product checks for violations of the following best practices:**
* Line lengths exceeding 80 characters.
* Non-descriptive variable names. 
* Misaligned curly braces
* Use of tabs causing readability issues
* 

**The source code for our project is viewable on [Github](https://github.com/bcu8/CS386-C-Code-Formatter).**

### Implemented Requirements

** Requirement:** As a programmer, I would like to have the option to download and/or delete any files I have stored on the formatter website. 

**Issue:** [issue](https://github.com/bcu8/CS386-C-Code-Formatter/issues/60)

**Pull request:** [pull request](https://github.com/bcu8/CS386-C-Code-Formatter/pull/52)

**Implemented by:** Kane Davidson

**Approved by:** Brandon Udall 

**Print screen: **
![unnamed (2)](https://user-images.githubusercontent.com/102091712/235412628-c7c66847-107f-48ba-8e9c-35f3f2b6237c.png)


**Requirement:** As a programmer, I would like to have a convenient way to access the suggestions of past files submitted to the formatter website. 

**Issue:** [issue](https://github.com/bcu8/CS386-C-Code-Formatter/issues/59)

**Pull request:** [issue](https://github.com/bcu8/CS386-C-Code-Formatter/pull/50)

**Implemented by:** Brandon Udall

**Approved by:** Brandon Udall

Print screen: 
![unnamed (1)](https://user-images.githubusercontent.com/102091712/235412599-a4884390-3afb-49bc-adec-fa94d62f0210.png)


**Requirement:** As a programmer, I’d like to be able to view my formatting errors and correct them off of the website.

**Issue:** [issue](https://github.com/bcu8/CS386-C-Code-Formatter/issues/25)

**Pull Request** [pull request](https://github.com/bcu8/CS386-C-Code-Formatter/pull/43)

**Implemented by:** Ian Tuohy

**Approved by:** Brandon Udall

**Print Screen:**
![unnamed](https://user-images.githubusercontent.com/102091712/235412566-6ae08262-dde3-4b80-84cf-730eb36f2633.png)



**Requirement:** As a grader for a C program class, I would like to easily give feedback and suggestions for the student’s code formatting so that they are able to fix their mistakes and create more readable code

**Issue:** [issue](https://github.com/bcu8/CS386-C-Code-Formatter/issues/57)(https://github.com/bcu8/CS386-C-Code-Formatter/issues/55)

**Pull request:** [issue](https://github.com/bcu8/CS386-C-Code-Formatter/pull/54) 

**Implemented by:** Ryley Fernandez

**Approved by:** Brandon Udall

**Print Screen:** 

![fileoptions](https://user-images.githubusercontent.com/102091712/235412489-a1aa38fb-0355-4964-8222-7d6149a98804.png)

**Requirement:** As a c programmer, I would like to be able to easily receive formatting suggestions by uploading my files to a website.\

**Issue:**[issue]https://github.com/bcu8/CS386-C-Code-Formatter/issues/40

**Pull Request:**[issue]https://github.com/bcu8/CS386-C-Code-Formatter/pull/32

**Implemented by:** Nick Wiltshire

**Approved by:** Nick Wiltshire


**Print Screen**
![js](https://user-images.githubusercontent.com/102091712/235412440-b36088a8-928f-4e79-893f-1c4552f01399.png)


### Tests
We used the Jest testing framework for testing our Javascript functions that look for formatting errors in user submitted code. 

Link to testing environment: https://github.com/bcu8/CS386-C-Code-Formatter/tree/main/Testing_Environment

One of our test cases was for the function checkRedundantBooleanTests, which tests each line individually. One of our test cases was the code string “ if (x == true) {y = 5} “ which should cause the function to return “ Consider removing the redundant '== true' or '== false' test\n “. The second test case for the checkRedundantBooleanTests function was “ if (x) {y = 5} “ which should cause the function to return an empty string.

Link to class: https://github.com/bcu8/CS386-C-Code-Formatter/blob/main/Testing_Environment/Testing%20Environment/testMethods.js
Link to test: https://github.com/bcu8/CS386-C-Code-Formatter/blob/main/Testing_Environment/Testing%20Environment/methods.test.js

Print screen of result of automated test: 

### Demo
[Demo](https://youtu.be/1rftiBm3Zms) ![tests](https://user-images.githubusercontent.com/102091712/235412361-815a1eda-f1a9-4f0a-9127-930e72079f2b.png)


### Code Quality
To maintain high code quality members of our team made use of heavy documentation in the form of pseudo-code. This helped with readability as members who were not directly involved with the development of certain portions of the project could get caught up by reading the pseudo-code. For the most part, our pseudo-code outlines exactly what the author was trying to accomplish with each specific portion of their code. This also helps with code maintainability as we can detect exactly which portion of the code is failing in its intended purpose. 

### Lessons Learned
After this release of our product our team learned about the importance of organization. The github page got cluttered with multiple peoples code and it wasn't clear what was what as things were titled with similar names. There was also a lack of cleanup of obsolete files that are no longer needed. It took some time to sort out the mess and reorganize the github. If our team were to continue development on this project we should aim to get better about maintaining organization in the github. 

