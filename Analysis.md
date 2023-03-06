# Analysis

## System Description

The program we are building aims to solve the problem of formatting issues in C code. The system's position is to provide users with an automated solution for identifying and fixing GUR issues in their code, improving its readability, maintainability, and functionality. Our value proposition is to save developers' time and effort in manually reviewing and correcting their code, allowing them to focus on the more critical aspects of their development work.

The system’s key requirements include allowing the ***user*** to upload their *C code* to the system along with their *user ID*, which will then use a ***code formatter*** to analyze it for formatting issues. The code formatter will provide *current line numbers*, *characters in a line*, and *error messages*. The user may consist of C programmers(***students***) or instructors. The students will *submit their files* and receive a specific *grade*. The system will track the *upload date* and *file name*. The system will then provide comments on the uploaded file which will guide the user in fixing any violations of the ***general usage rubric(GUR)***, such as *incorrect indentation*, *missing semicolons*, *improper use of spaces*, etc. After making these corrections, the system will provide the user with an ***output file***, which will contain the *comments* and ***points fixed report*** on the uploaded file. The points fixed report will have *descriptions* of the overall score and *deductions* based on the GUR. The system will also be able to handle multiple files and will provide comments for each file individually in order to assist ***instructors*** and graders who deal with multiple files. 

To achieve this, the system must scan the code to identify the relevant components of the code and analyze its syntax. The system must also have a knowledge base that contains information on proper formatting practices and the most common GUR issues. Finally, the system must have a user-friendly interface, allowing users to upload, review, and download their corrected code with ease.

## Model

![image](https://user-images.githubusercontent.com/123568619/222996371-b3c5baf3-f807-4f39-b695-36d918d60454.png)
