//prototypes

/*function takes in an input file name and appends OUT_FILE_STAMP. Then returns resulting string using parameter outString*/
void createOutputFileName(const char *inString, char *outString)
   {
	strcpy(outString,inString);

	outString[strlen(outString)-2]=NULL_CHAR;
	
	strcat(outString, OUT_FILE_STAMP);
   }
   
/*function takes in pointer to input file, pointer to currentChar, pointer to lastChar, and iteration. Returns true if file has more data, false if file has ended. updates current and last char as return parameters*/   
bool getNextChar(FILE *filePtr, char *currentChar, char *lastChar, int i )
   {
	//if not first iteration, update lastChar
	if ( i != 0 )
	   {
	    *lastChar = *currentChar;
	   }
	
	//return false if end of file detected
	if ( feof( filePtr ) )
	   {
		return false;		
	   }
	//otherwise update currentChar and return true
	*currentChar = fgetc(filePtr);
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
	char currentChar, lastChar, trashChar=' ';
	int leadingSpaces = 0;
	int i=0,lineLength=0, currentLine=1;	
	   
	   
	//check if input and output files sucessfully opened
	if ( outputOpen && inputFilePtr!=NULL )
	   {		
		   
		//start while loop to get next char, loop ends when no more chars found
		while ( getNextChar( inputFilePtr, &currentChar, &lastChar, i ) )
		   {						
			//if char is a new line
			if ( currentChar == '\n' )
			   {
				//write new line
				writeEndlineToFile();
				
				//check line length
				if (lineLength > 80)
			       {
				    //if line length exceeds 80 notify user
				    printf("Line %d exceeds 80 characters\n", currentLine);
			       }
				
				//reset line length
				lineLength=0;
				
				//increment current line
				currentLine++;
				
				//read through characters until white space is gone
				while ( isWhiteSpace(trashChar) )
				   {
					trashChar = fgetc(inputFilePtr);
				   }
				
				//store new currentChar
				currentChar=trashChar;
				
				//reset trashChar
				trashChar=' ';							   

				//determine if change in leading spaces is necessary
				if ( currentChar == '{' )
					{
					leadingSpaces+=3; 
				
					//print leading spaces
					writeCharactersToFile(leadingSpaces, ' ');
			
					//print currentChar to outFile
					writeCharacterToFile(currentChar);
					}
				else if ( currentChar == '}' )
					{
						
					//print leading spaces
					writeCharactersToFile(leadingSpaces, ' ');
			
					//print currentChar to outFile
					writeCharacterToFile(currentChar);
					
					leadingSpaces-=3;								
					}
				else if (leadingSpaces==0)
					{			
					//print currentChar to outFile
					writeCharacterToFile(currentChar);  
			        }
				else
				   {
					//print leading spaces
					writeCharactersToFile(leadingSpaces + 1, ' ');
			
					//print currentChar to outFile
					writeCharacterToFile(currentChar);
					
					//update line length
					lineLength=leadingSpaces+1;
				   }					
					   
			   }
			else 
			   {
				//print currentChar to outFile
				writeCharacterToFile(currentChar);   
				
				//increment line length
				lineLength++;
			   }
			   			
			//increment iteration
			i++;
		   }
		   
		//close input and output files
		closeOutputFile();
		fclose(inputFilePtr);
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
	
	//tell user new file name
	printf("\nName of output file: \"%s\"\n\n",outFileName);
	
	//notify user of program end
	printf("PROGRAM END\n");
	
	return true;
   }
