// >gcc -o strings strings.c
// >./strings

// Need this for printf()
#include <stdio.h>

// Need this for strlen()
#include <string.h>

// Each printChars() function will print the characters and ASCII codes 
// for each char of the string s, one per line

// Play with the different implementatons of printChars()
// How does each one work?

// How are arrays and pointers alike? How are they different?
// What is the difference between passing in an array char s[] and a pointer char *s as the argument?
// Try it both ways with each version.

// There is also a bonus implementation of captialize().


void printChars1(char s[]) {

	// This is the familiar way to iterate through a string, like in other languages.

	printf("\nprintChars1()\n");

	// What is the parameter s that is pushed on the stack?
	// How many bytes does it take up on the stack frame?
	//printf("sizeof(s): %d\n", (int)sizeof(s));

	for (int i=0; i < strlen(s); i++) {

		// Print each character, and its ASCII value.
		// Remember that a char is really an int in C, so the value of s[i] is the integer number of its ASCII value
		printf("%c %d\n", s[i], s[i]);

	}

	// Although it works, this is a terrible implementation.
	// What is the O(n) execution time for a string of length n?
	// How many times is strlen() called? How does strlen() work?

	// We can write a much better implemention that runs in O(n) time. See below.

}


void printChars2(char s[]) {

	// This version uses index numbers of the array to iterate through the string

	// Note: this will also work if the argument is char *s, rather than an array char s[]
	// Why is that so?
	// Try it out.

	printf("\nprintChars2()\n");

	// What is the parameter s that is pushed on the stack?
	// How many bytes does it take up on the stack frame?
	//printf("sizeof(s): %d\n", (int)sizeof(s));

	int i=0; // the index of the string, start at 0

	while (s[i] != '\0') {
		// Break out of the loop when the current char is the null terminator
		printf("%c %d\n", s[i], s[i]);
		i++; // increment the index number
	}

	// But wait! For a string of length 4, the values of i would be 0,1,2,3,4
	// Index 4 is out of bounds.
	// But C does not do bounds checking, so this code works, and is correct.
	// s[4] is the null terminator ('\0', or the number 0)

}


void printChars3(char *s) {

	// This version takes an argument s, a pointer to char
	// It iterates through the string using the pointer (address), rather than an array index

	// Note: s is a copy pushed on the stack

	printf("\nprintChars3()\n");

	// What is the parameter s that is pushed on the stack?
	// How many bytes does it take up on the stack frame?
	//printf("sizeof(s): %d\n", (int)sizeof(s));

	char c;
	int i = 0; // starting index

	c = *s;	// dereference s, and get the first character, e.g. s[0], store it in c

	while (c != '\0') {
		printf("%c %d\n", c, c);
		i = i+1; // increment the integer i (index of array) 
		
		//c = *(s+i); //pointer arithmetic, s is a pointer, i is an integer
		c = s[i];
		// (s+i) is the memory address of element i, e.g. address of s[i], or &s[i]
		// Then dereference that memory address, to get the character itself
		// Note the parentheses (for order of operations).
		// *(s+i) means the same thing as s[i]
	}

}

void printChars4(char *s) {

	// C does not have a boolean type
	// Instead a condition is an int
	// 0 means False, any non-zero value means True

	// '\0' (the null character) is just the number 0
	// Recall that a char is really an int in C
	// So we don't have to say while (c != '\0')
	// Instead, we can just say while (c) 
	// It means exactly the same thing
	// In other words, the loop exits when the current character is 0 (or '\0')


	printf("\nprintChars4()\n");

	// What is the parameter s that is pushed on the stack?
	// How many bytes does it take up on the stack frame?
	//printf("sizeof(s): %d\n", (int)sizeof(s));

	char c;
	int i = 0; // starting index

	c = *s;	// dereference s, and get the first character, e.g. s[0], store it in c

	while (c) {
		printf("%c %d\n", c, c);
		i++; // increment the integer i (index of array) 
		
		c = *(s+i); //pointer arithmetic, s is a pointer, i is an integer
		//same thing as
		// c = s[i];
	}

}

// void printChars5(char *s) {

// 	// This version is written in the K&R style for C strings.
// 	// It is very terse, tight code.

// 	printf("\nprintChars5()\n");
	
// 	char c;

// 	while (c = *s++)
// 		printf("%c %d\n", c, c);

// 		// The argument s is a pointer to a char
// 		// s is a copy placed on the stack frame, so we can change its value like a local variable
// 		// *s is the char pointed to by s
// 		// We can assign this char to the variable c.
// 		// C treats assignments as expressions, with the value that was assigned as the value of the expression
// 		// So the value of c=*s is the character c

// 		// The ++ will post-increment the pointer s, done after we dereference *s


// 		// Think about how you could implement strlen() using this style.

// }

void capitalizeUsingArray(char *s) {

	// while (*s) {
	// 	if (*s >= 'a' && *s <= 'z')
	// 		*s = *s - 'a' + 'A';
	// 	s++;
	// }

	// Parameter s is a copy of the address of the start of the string
	// So we can change s in our subroutine, without impacting the orginal caller's string

	// 'a' is a literal char, which means it is an int in C
	// So 'a' really means 97 (the ASCII code for 'a')
	// and 'A' means 65
	// So we can do integer math on char types
	// *s - 97 + 65
	// The compiler reduces this to: *s - 32
while(*s) {

  if (*s >= 'a' && *s <= 'z') {

     *s = *s - 'a' + 'A';
 }

s++;

s++;

}
}

void spongebobFont(char *meme, char *result) {

while(*meme) {

  if (*meme >= 'a' && *meme <= 'z') {

     *result = *meme - 'a' + 'A';
 }

meme++;

meme++;

}
}

void capitalizeUsingCharAsterik(const char *s) {

	char myString[20];

	strcpy(myString, s);

	int i = 0;

	while (myString[i] != '\0') {
		if (myString[i] >= 'a' && myString[i] <= 'z')
			myString[i] = myString[i] - 'a' + 'A';
		i++;
	}

	printf("\ncapitalizeUsingCharAsterik()\n%s\n", myString);

	// Parameter s is a copy of the address of the start of the string
	// So we can change s in our subroutine, without impacting the orginal caller's string

	// 'a' is a literal char, which means it is an int in C
	// So 'a' really means 97 (the ASCII code for 'a')
	// and 'A' means 65
	// So we can do integer math on char types
	// *s - 97 + 65
	// The compiler reduces this to: *s - 32
}

char *backReverse(char *dest, char *src, size_t n) {
	char *p = dest;
	if (strlen(src) < n - 1) {
		for (int i = strlen(src) - 1; i >= 0; i--) {
			*dest = src[i];
			dest++;
		}
		*dest = '\0';
	} else {
		for (int i = strlen(src) - 1; i > strlen(src) - n; i--) {
			*dest = src[i];
			dest++;
		}
		*dest = '\0';
	}

	return p;
}


int main() {

	// Try different test strings.
	// As a bonus, accept a string from a command line argument.
	char myStr1[] = "hoRSE on Balcony";

	// char *myStr2 = "okieee";

	char result[22];

	// // printChars1(myStr);
	// // printChars2(myStr);
	// // printChars3(myStr);
	// // printChars4(myStr);
	// //printChars5(myStr);

	spongebobFont("hoRSE on Balcony", result);
	printf("%s\n", result );

	// // capitalizeUsingCharAsterik(myStr2);


	// char dest[strlen("helloWorld") + 1];
	// backReverse(dest, "helloworld", 10);
	// printf("%s\n", dest);
	// printf("%c\n", dest[9]);


	return 0;
}