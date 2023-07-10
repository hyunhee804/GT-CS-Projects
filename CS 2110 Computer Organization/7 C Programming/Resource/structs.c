// >gcc -o structs structs.c
// >./structs

#define NAME_SIZE 10
#include <string.h>
#include <stdio.h>

// type declaration of struct person
// Does not create a variable here, just specifies the type
struct person {
	char name[NAME_SIZE];
	int age;
};


void birthday1(struct person p) {

	// Everything in C is pass by value (copies of arguments on stack frame)
	// This will change only the local copy of the struct, which lives on the stack
	// It will not change the original

	p.age++; 
	printf("In birthday1: %s is now age %d.\n", p.name, p.age);

}

void birthday2(struct person *p) {

	// pass by reference, C-style
	// p is a pointer to struct person
	// Pass in a pointer to a struct person, so we can change the original from the caller

	// Dereference the pointer, then get the struct member field, age
	//(*p).age++

	// Or, use -> alternate C syntax, works with a pointer to a struct
	p->age++; 
	printf("In birthday2: %s is now age %d.\n", p->name, p->age);

}


int main() {

	struct person caleb;
	// caleb is a variable of type struct person

	caleb.age = 50;

	// Don't do this, compiler error
	// array caleb.name is a constant pointer, cannot assign a new value to it
	//caleb.name = "Caleb";

	// Do this instead	
	strcpy(caleb.name, "Caleb");
	printf("Before birthday1: %s is age %d.\n\n", caleb.name, caleb.age);

	// pass by value (will not change the struct caleb)
	birthday1(caleb);
	printf("After birthday1: %s is now age %d.\n\n", caleb.name, caleb.age);

	// pass by reference (passing the pointer)
	// will change the original struct, caleb
	birthday2(&caleb); // pass in address of Caleb
	printf("After birthday2: %s is now age %d.\n\n", caleb.name, caleb.age);


}