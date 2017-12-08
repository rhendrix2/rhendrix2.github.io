#include <stdlib.h>
#include <stdio.h>
#include <string.h>

void printUsage()
{
	printf("Usage: lineconv [OPTION] inputfile outputfile\n");
	printf("\tOPTION: -unixtodos\n");
	printf("\t        -dostounix\n");
	return;
}

void unixtodos(FILE *inf, FILE *outf)
{
	char *line = NULL;
	size_t len = 0;
	ssize_t read;

	while((read = getline(&line, &len, inf)) != -1)
	{
		if(line[read-1] == '\n')
		{
			line[read-1] = 0;
			fprintf(outf, "%s\r\n", line);
		}
		else
		{
			fprintf(outf, "%s", line);
		}
	}

	if(line) free(line);

	return;
}

void dostounix(FILE *inf, FILE *outf)
{
	char *line = NULL;
	size_t len = 0;
	ssize_t read;

	while((read = getline(&line, &len, inf)) != -1)
	{
		if(line[read-1] == '\n') 
		{
			line[read-2] = 0;
			fprintf(outf, "%s\n", line);
		}
		else
		{
			fprintf(outf, "%s", line);
		}
	}

	if(line) free(line);

	return;
}

int main(int argc, char **argv)
{
	//Check for the right number of arguments
	if(argc != 4)
	{
		printUsage();
		return 1;
	}
	//check if inpurfile and output file are the same
	else if(!strcmp(argv[2], argv[3]))
	{
		printf("Error: Input and output file must be different.\n");
		return 1;
	}

	//open the input file and make sure it exists
	FILE *inf = fopen(argv[2], "r");
	if(inf == NULL)
	{
		printf("Error: File \"%s\" could not be opened.\n", argv[2]);
		return 1;
	}

	//open the output file and make sure it exists
	FILE *outf = fopen(argv[3], "w");
	if(outf == NULL)
	{
		printf("Error: File \"%s\" could not be opened.\n", argv[3]);
		return 1;
	}

	if(!strcmp(argv[1], "-unixtodos"))
	{
		unixtodos(inf, outf);
	}
	else if(!strcmp(argv[1], "-dostounix"))
	{
		dostounix(inf, outf);
	}
	//if neither of the valid arguments matches print error
	else
	{
		printf("Error: Option \"%s\" is not a valid option. Run without arguments for usage.\n", argv[1]);
		return 1;
	}

	//close files
	fclose(inf);
	fclose(outf);

	return 0;
}
