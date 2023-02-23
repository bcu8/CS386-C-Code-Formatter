//prototypes=============================================================================
#include "StandardConstants.h"
#include "File_Input_Utility.h"
#include "Console_IO_Utility.h"
#include "File_Output_Utility.h"

/*This program takes in a .c file of improperly formatted code then formats it 
according to Professor Leverington's preference. The output file has the same name 
as the input with "FORMATTED" appended to the original file name.

This program will make the students life easier as they no longer have to worry about 
how tabs will make their code look outside of the editor. 
It also notifies student if there are lines exceeding 80 charactes so that they may 
avoid those GUR reductions as well. 

The graders experience will also become easier and more efficient.
*/

//constants==============================================================================
const char *OUT_FILE_STAMP="FORMATTED.c";
const int LINE_LENGTH_CAP = 80;

//prototypes=============================================================================

/*function takes in an input file name and appends OUT_FILE_STAMP. Then returns 
resulting string using parameter outString*/
void createOutputFileName(const char *inString, char *outString);

/*function takes in pointer to input file, pointer to currentChar, pointer to lastChar, and 
iteration. Returns true if file has more data, false if file has ended. updates current 
and last char as return parameters*/   
bool getNextChar(FILE *filePtr, char *currentChar, char *lastChar);

//function to test if input char is a whitespace char
bool isWhiteSpace(char chr );

//function writes the formatted output file using GUR restrictions
bool writeFormattedFile(FILE *inputFilePtr, bool outputOpen, char *outFileName);

//begin main=============================================================================
int main ()
   {
	//initialize variables
	char fileName[40];
	char outFileName[41];
	FILE *inputFilePtr; 
	bool outputOpen;
	
	//print title and purpose
	printf("\n\nLeverington Safe Code Formatter\n");
	printf("===============================\n\n");
	
	printf("This program takes in a file name, formats the code\nthen outputs the formatted code to a new .c file with\n\"FORMATTED\" appended to the original file name\n\n");
	
	//prompt for name of input file
	printf("File Name (must end in .c): ");
	getInputString(fileName, false );
	printf("\n");
	
	//open input file 
	inputFilePtr = fopen(fileName, "r");
	
	//create output file name
	createOutputFileName(fileName, outFileName);
	
	//openOutput
	outputOpen = openOutputFile(outFileName);
	
	//write formatted code to output file
	writeFormattedFile(inputFilePtr, outputOpen, outFileName);
	
	//close input and output files
	closeOutputFile();
	fclose(inputFilePtr);
	
	//tell user new file name
	printf("\nName of output file: \"%s\"\n\n",outFileName);
	
	//notify user of program end
	printf("PROGRAM END\n");
	
	//end main
	return 0;
   }

//function implementation================================================================   
   
/*function takes in an input file name and appends OUT_FILE_STAMP. Then returns 
resulting string using parameter outString*/
void createOutputFileName(const char *inString, char *outString)
   {
	strcpy(outString,inString);

	outString[strlen(outString)-2]=NULL_CHAR;
	
	strcat(outString, OUT_FILE_STAMP);
   }
   
/*function takes in pointer to input file, pointer to currentChar, pointer to lastChar, 
and iteration. Returns true if file has more data, false if file has ended. updates 
current and last char as return parameters*/   
bool getNextChar(FILE *filePtr, char *currentChar, char *lastChar )
   {
	*lastChar = *currentChar;

	//otherwise update currentChar and return true
	*currentChar = fgetc(filePtr);
	
	//return false if end of file detected
	if ( feof( filePtr ) )
	   {
		return false;		
	   }
	   
	return true;
   }
   
bool isWhiteSpace(char chr )
   {
	   if (chr == '\t' || chr == '\r' || chr == '\v' || chr == '\f' || chr == ' ')
	      {
	   	   return true;   
	      }
	   return false;
   }
   
bool writeFormattedFile(FILE *inputFilePtr, bool outputOpen, char *outFileName)
   {
	//initialize variables
	char currentChar='S', lastChar, trashChar=' ';
	int indent = 0;
	int lineLength=0, currentLine=1;		   
	   
	//check if input and output files sucessfully opened
	if ( outputOpen && inputFilePtr!=NULL )
	   {		
		   
		//start while loop to get next char, loop ends when no more chars found
		while ( getNextChar( inputFilePtr, &currentChar, &lastChar) )
		   {						
			//if char is a new line
			if ( currentChar == '\n' )
			   {				
				//check line length
				if (lineLength > 80)
			       {
				    //if line length exceeds 80 notify user
				    printf("Line %d exceeds %d characters\n", currentLine, LINE_LENGTH_CAP);
			       }
				
				//reset line length
				lineLength=0;
				
				//increment current line
				currentLine++;
				
				//account for possibility of multiple new lines, loop through them.
				while ( currentChar == '\n')
				   {
					//write new line
					writeEndlineToFile();
					
					//read through characters until white space is gone
					while ( isWhiteSpace(trashChar) )
					   {
						trashChar = fgetc(inputFilePtr);
						
						//if file end detected return true
						if ( feof( inputFilePtr ) )
						   {
							return true;		
						   }
				       }
				
					//store new currentChar
					currentChar=trashChar;
					
					//reset trashChar
					trashChar=' ';	
				   }					

				//determine if change in leading spaces is necessary
				if ( currentChar == '{' )
					{
					indent+=3; 
				
					//print leading spaces
					writeCharactersToFile(indent, ' ');
			
					//print currentChar to outFile
					writeCharacterToFile(currentChar);
					}
				else if ( currentChar == '}' )
					{
						
					//print leading spaces
					writeCharactersToFile(indent, ' ');
			
					//print currentChar to outFile
					writeCharacterToFile(currentChar);
					
					indent-=3;								
					}
				else if (indent==0)
					{			
					//print currentChar to outFile
					writeCharacterToFile(currentChar);  
			        }			
				else
				   {
					//print leading spaces
					writeCharactersToFile(indent + 1, ' ');
			
					//print currentChar to outFile
					writeCharacterToFile(currentChar);
					
					//update line length
					lineLength=indent+1;
				   }										   
			   }
			else 
			   {
				//print currentChar to outFile
				writeCharacterToFile(currentChar);   
				
				//increment line length
				lineLength++;
			   }
		   }
	   }
	//if file didnt open, notify user
	else
	   {
		if (inputFilePtr==NULL)
		   {			
		    printf("Input file not found\n");
		   }
		   
		if (!outputOpen)
		   {			
		    printf("output file couldn\'t open\n");
		   }
		   
		//notify user of program end
		printf("PROGRAM END\n");
	
		//return false
		return false;
	   }
	
	return true;
   }
