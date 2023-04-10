# Project Design

_Group 05 – “C Code Formatter”
Date: April 9, 2023
Group Members: Kane Davidson, Nick Wiltshire, Ian Tuohy, Ryley Fernandez, Brandon Udall, Ethan Ikhifa 

## 1. Description

__Provide 1-2 paragraphs to describe your system. This will help understand the context of
your design decisions. You can reuse and update the text from the previous deliverables.__

__Grading: 2 points. Criteria: Completeness (1 pt); Consistency with the rest of the document (0.5 pt); Language (0.5 pt).__

Our system is a C code formatter which will recommend changes to a given .c file based on a series of pre-set guidelines; it will not directly change any files, only provide the user with recommendations to change parts of their code.
Our system is an application that can format C code to specific guidelines that allows programmers to focus less on formatting and more on coding, prioritizing the quality of a program over the adherence to formatting guidelines.
The C code formatter makes organization for programs easier. 

Project repo: [https://github.com/bcu8/CS386-C-Code-Formatter](https://github.com/bcu8/CS386-C-Code-Formatter)

## 2. Architecture

__Present a diagram of the high-level architecture of your system. Use a UML package diagram to describe the main modules and how they interrelate. Provide a brief rationale of your architecture explaining why you designed it that way.__

__Grading: 5 points. Criteria: Adequate use of UML (2 pts); Adequate design of an architecture for the system (2 pts); Adequate description of the rationale (1 pt).__

Our system architecture consists of three layers. The first layer is the presentation layer, which is the only layer the user will directly interact with; this solely contains our website interface. 
From there, the presentation layer interacts with the logic layer, which is the layer that the majority of the file analysis is done in. In this layer, the user file is uploaded, the code in the file is analyzed, and feedback is given to the user based on their file. 
The final layer is the data layer, which contains the core data our system needs to operate. In this layer, the coding guidelines along with the file the user uploaded, and any feedback the users provide. 

![image](https://user-images.githubusercontent.com/116871920/230804411-1e39cff7-a04e-4794-ad1a-6dff65337eca.png)

## 3. Class diagram

__Present a refined class diagram of your system, including implementation details such as visibilities, attributes to represent associations, attribute types, return types, parameters, etc. 
The class diagram should match the code you have produced so far, but not be limited to it (e.g., it can contain classes not implemented yet). The difference between this class diagram and the one that you presented in D.3 is that the last focuses on the conceptual model of the domain while the former reflects the implementation.
Therefore, the implementation details are relevant in this case.__

__Grading: 6 points. Criteria: Adequate use of UML (2 pts); Adequate choice of classes and relationships (2 pts); Completeness of the diagram (1 pt); Adequate presentation of implementation details (1.0).__



![image](https://user-images.githubusercontent.com/116871920/230804455-077153cf-572a-490e-ae83-98842d275f55.png)

## 4. Sequence diagram

__Present a sequence diagram that represents how the objects in your system interact for a specific use case. Also include the use case description in this section. The sequence diagram should be consistent with the class diagram and architecture.__

__Grading: 5 points. Criteria: Adequate use of UML (1 pt); Adequate design of the sequence diagram (2 pts); Consistency with the class diagram (1 pt); Consistency with the use case description (1 pt); Not including the use case description (-1.5 pt); Over simplistic diagram (-1 pt).__

__Use Case Description:__

Use Case: Formatting a C code file based on pre-set guidelines 

Actor: Programmer

Description: How a programmer uses the C code formatter application to format a given .c file based on pre set guidelines. 

Preconditions: Access to website and C program has no errors. 

Postconditions: User can view suggestions and recommendations for possible GUR formatting violations. 

Main Flow:
User visits C code formatter website
User chooses to upload file
Program parses through file and makes suggestions where possible GUR violations are identified
Program displays code with new suggestions on website 




![image](https://user-images.githubusercontent.com/116871920/230804486-fc6f144b-9297-43ef-90dd-d9a23bf05580.png)


## 5. Design Patterns

__Split this section into 2 subsections. For each subsection, present a UML class diagram showing the application of a design pattern to your system (a different pattern for each section). 
Each class diagram should contain only the classes involved in the specific pattern (you don’t need to represent the whole system). Choose patterns from two different categories: Behavioral, Structural, and Creational.
You are not limited to design patterns studied in class.__ 

__Your system may not be appropriate for any design pattern. In this case, for didactic purposes, be creative and extend a little bit the scope of your system to make the design patterns appropriate.__


Behavioral: Observer Pattern (one-to-many dependency)


![image](https://user-images.githubusercontent.com/116871920/230804539-65dae371-2998-4642-b3fd-fd04a212d156.png)




Creational: Builder Pattern (same construction process can create different representations )

![image](https://user-images.githubusercontent.com/116871920/230804567-c4e5b906-2a8d-4031-9d5e-562b5fedcbfd.png)

## 6. Design Principles

__How does your design observe the SOLID principles? Provide a short description of the following principles giving concrete examples from your classes.__

__Grading: 6 points. Criteria: Show correct understanding of SOLID principles (3 pts); Provide enough details to justify how the principles were observed (3 pts).__

Our design follows the first SOLID principle, Single-Responsibility, as the “line” class only has the function of storing the data of each line, and that’s its single responsibility that it has. 
The second principle, Open-Closed, as the Line class is available to be extended and implemented through that if another format needed to be used, and is closed to outside modification done by other functions.
The fourth design principle, the Interface Segregation Principle, is implemented through our software only requiring the single interface used by the user, and the user isn’t forced to go through other interfaces not required. 
The third and fifth design principles, the dependency inversion principle and the liskov substitution principle are not implemented through our software implementation because we have no extended classes.
The liskov substitution principle states that classes must be substitutable for their parent class, and we don’t have parent/child classes, and the dependency inversion principle isn’t implemented through our software as we only have the one class, and nothing depends on a non-abstract class or interface.

