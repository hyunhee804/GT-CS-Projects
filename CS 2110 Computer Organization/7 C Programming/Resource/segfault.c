// This is an optional file for you to understand, at this time in the class.
// It will not run properly, and it will crash.

// It shows an example of a run-time error in C.
// "Segmentation Fault" (segfault)
// You tried to write to a protected memory location.
// This is a common error when working with pointers in C.


#include <stdio.h>
#include <string.h>

int main() {
	
	// This works
	char *s = "Caleb"; // s is a string
	printf("%s\n", s);

	// This works.
	// s is a pointer to a char (an array of char, or a string)
	// We assign the memory address to point to wherever C put the array (.stringz) "Caleb"
	// And then we can read it (and read to printf)


	// This fails, and causes a segmentation fault
	// Illegal memory access
	// Why?
	// s[2] = 'x'; // try to change the character at string index 2 to an 'x'
	// printf("%s\n", s);
	// Comment out the above two lines to make this not crash in run-time


	// C literally did this: 
	// s .stringz "Caleb"
	// That string lives in reserved memory, let's say at adress x2500
	// So s is a pointer to a string (a memory address)
	// The value of s is x2500 (an address in reserved memory)

	// The C system (and linux OS) do not allow us to modify memory in reserved areas
	// s[2] is at memory address x2502 (base address plus array index, pointer arithmetic)

	// So it crashes the program (segfault)
	// A segfault means trying to write to protected memory
	// It is a run-time error (the compiler won't catch it)


	// Comment out the above two lines. 
		//s[2] = 'x';
		//printf("%s\n", s);


	//Then try this.
	char myString[10];
	strcpy(myString, s); // copy the string at mem location s into memory at location mystring

	// Now we can do what the above two lines (commented out) were trying to do
	myString[2] = 'x';
	printf("%s\n", myString);

	// Why does this work?
	// We allocated space for myString. 
	// It is not a literal string (read-only) located in reserved memory.
	// Rather, it lives on the stack frame for main(), as a local variable (and we can change the values there)

	// We copied s into myString (a loop in assembly language)
	// We are allowed to modify values in memory where myString lives (on our stack frame)
	// So this is allowed in C, and not a segfault at run-time.

	return 0;

}