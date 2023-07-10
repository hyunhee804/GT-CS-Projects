// >gcc -o args args.c
// >./args hello there

// need this for printf()
#include <stdio.h>

int main(int argc, char *argv[]) {

	// the command line passes in two arguments to the main function
	// it is like in assembly: push argv; push argc; jsr main

	// argc is the argument count
	// argv is basically an array of strings
	// linux passes the program name from the command line as the first argument, argv[0]

	for(int i=0; i<argc; i++) {
		printf("arg# %d: '%s'\n", i, argv[i]);
	}

	return 0; // error code 0 means success, returned to the linux shell
	// after running your program, type echo $? to see the return value from main()
}