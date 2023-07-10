/**
 * @file hw7.c
 * @author Hyun Hee Park
 * @brief structs, pointers, pointer arithmetic, arrays, strings, and macros
 * @date 2021-03-xx
 */

// DO NOT MODIFY THE INCLUDE(S) LIST
#include <stdio.h>
#include "hw7.h"
#include "my_string.h"

// Global array of student structs
struct student class[MAX_CLASS_SIZE];

int size = 0;

/** addStudent
 *
 * @brief creates a new student struct and adds it to the array of student structs, "class"
 *
 *
 * @param "name" name of the student being created and added
 *               NOTE: if the length of name (including the null terminating character)
 *               is above MAX_NAME_SIZE, truncate name to MAX_NAME_SIZE
 * @param "age" age of the student being created and added
 * @param "gpa" gpa of the student being created and added
 * @param "id" id of the student being created and added
 * @return FAILURE on failure, SUCCESS on success
 *         Failure if any of the following are true:
 *         (1) the length of "id" is less than MIN_ID_SIZE
 *         (2) a student with the name "name" already exits in the array "class"
 *         (3) adding the new student would cause the size of the array "class" to
 *             exceed MAX_CLASS_SIZE
 */
int addStudent(const char *name, int age, double gpa, const char *id)
{

  struct student newStudent;

  my_strncpy(newStudent.name, name, MAX_NAME_SIZE);

  if (my_strlen(newStudent.name) > MAX_NAME_SIZE) {
    newStudent.name[MAX_NAME_SIZE - 1] = '\0';
  }

  my_strncpy(newStudent.id, id, MAX_ID_SIZE);

  if (my_strlen(newStudent.id) < MIN_ID_SIZE) { 
    return FAILURE;
  }
  
  else if (my_strncmp(newStudent.name, class->name, my_strlen(newStudent.name)) == 0) {
    return FAILURE;
  }

  else if (size == MAX_CLASS_SIZE) {
    return FAILURE;
  }

  else {
    newStudent.age = age;
    newStudent.gpa = gpa;
    class[size] = newStudent;
    size++;
    return SUCCESS;
  }

}

/** updateStudentName
 *
 * @brief updates the name of an existing student in the array of student structs, "class"
 *
 * @param "s" student struct that exists in the array "class"
 * @param "name" new name of student "s"
 *               NOTE: if the length of name (including the null terminating character)
 *               is above MAX_NAME_SIZE, truncate name to MAX_NAME_SIZE
 * @return FAILURE on failure, SUCCESS on success
 *         Failure if any of the following are true:
 *         (1) the student struct "s" can not be found in the array "class"
 */
int updateStudentName(struct student s, const char *name)
{
  for (int i = 0; i < size; i++) {
    if (my_strncmp(class[i].name, s.name, (my_strlen(class[i].name) + 1)) == 0) { 

      if (my_strlen(name) >= MAX_NAME_SIZE) {
        my_strncpy(class[i].name, name, MAX_NAME_SIZE - 1); 
        class[i].name[MAX_NAME_SIZE - 1] = '\0';
      } else {
        my_strncpy(class[i].name, name, my_strlen(name) + 1); 
      }

      return SUCCESS;
    }
  }
  return FAILURE;
}

/** swapStudents
 *
 * @brief swaps the position of two student structs in the array of student structs, "class"
 *
 * @param "index1" index of the first student struct in the array "class"
 * @param "index2" index of the second student struct in the array "class"
 * @return FAILURE on failure, SUCCESS on success
 *         Failure if any of the following are true:
 *         (1) "index1" and/or "index2" are negative numbers
 *         (2) "index1" and/or "index2" are out of bounds of the array "class"
 */
int swapStudents(int index1, int index2)
{
  if (index1 < 0 || index2 < 0 || index1 >= size || index2 >= size) {
    return FAILURE;
  } else {
    
    char name[MAX_NAME_SIZE];

    my_strncpy(name, class[index1].name, my_strlen(class[index1].name) + 1);
    my_strncpy(class[index1].name, class[index2].name, my_strlen(class[index2].name) + 1);
    my_strncpy(class[index2].name, name, my_strlen(name) + 1);


    int age = class[index1].age;
    class[index1].age = class[index2].age;
    class[index2].age = age;

    double gpa = class[index1].gpa;
    class[index1].gpa = class[index2].gpa;
    class[index2].gpa = gpa;


    char id[MAX_ID_SIZE];
    my_strncpy(id, class[index1].id, my_strlen(class[index1].id) + 1);
    my_strncpy(class[index1].id, class[index2].id, my_strlen(class[index2].id) + 1);
    my_strncpy(class[index2].id, id, my_strlen(id) + 1);


    return SUCCESS;
  }
}

/** removeStudent
 *
 * @brief removes an existing student in the array of student structs, "class"
 *
 * @param "s" student struct that exists in the array "class"
 * @return FAILURE on failure, SUCCESS on success
 *         Failure if any of the following are true:
 *         (1) the student struct "s" can not be found in the array "class"
 */
int removeStudent(struct student s)
{
  for (int i = 0; i < size; i++) {
    if (my_strncmp(class[i].name, s.name, (my_strlen(class[i].name) + 1)) == 0) { 

      for (int j = i; j < size; j++) {
        swapStudents(j, j+1);
      }
      size--;

      return SUCCESS;
    }
  }
  return FAILURE;
}

/** compareStudentID
 *
 * @brief using ASCII, compares the last three characters (not including the NULL
 * terminating character) of two students' IDs
 *
 * @param "s1" student struct that exists in the array "class"
 * @param "s2" student struct that exists in the array "class"
 * @return negative number if s1 is less than s2, positive number if s1 is greater
 *         than s2, and 0 if s1 is equal to s2
 */
int compareStudentID(struct student s1, struct student s2)
{
  int len1 = my_strlen(s1.id);
  int len2 = my_strlen(s2.id);

  const char *last_four1 = &s1.id[len1 - 3];
  const char *last_four2 = &s2.id[len2 - 3];

  return my_strncmp(last_four1, last_four2, 3);
}

/** sortStudents
 *
 * @brief using the compareStudentID function, sort the students in the array of
 * student structs, "class," by the last three characters of their student IDs
 *
 * @param void
 * @return void
 */
void sortStudents(void)
{
  int i, j, min_idx;

  for (i = 0; i < size - 1; i++) {
    min_idx = i;

    for (j = i + 1; j < size; j++) {
      if ((compareStudentID(class[j], class[min_idx]) < 0)) {
        min_idx = j;
      }
    }
    swapStudents(i, min_idx);

  }
}
