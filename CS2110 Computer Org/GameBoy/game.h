#ifndef GAME_H
#define GAME_H

#include "gba.h"
#include <stdbool.h>


/* TODO: */
// Create any necessary structs //

/*
* For example, for a Snake game, one could be:
*
* typedef struct snake {
*   int heading;
*   int length;
*   int row;
*   int col;
* } Snake;
*
*
*
*
*
* Example of a struct to hold state machine data:
*
* typedef struct state {
*   int currentState;
*   int nextState;
* } State
*
*/
typedef struct yellowJacket{
    int col, row;
    int width, height;
    bool hasGuide;
} YELLOWJACKET;

typedef struct covidVirus{
    bool alive;
    int col, row;
    int width, height;
    bool right;
    bool left;
    bool up;
    bool down;
} COVID_VIRUS;

typedef struct studyGuide{
    int col, row;
    int width, height;
    bool deleted;
} STUDY_GUIDE;

struct state {
    int score;
    int hp;
    struct yellowJacket yellowJacket;
    struct covidVirus covidVirus[5];
    struct studyGuide studyGuide;
} cs, ps;

void stageSetter(int);
void nextStageGraphicSetting(int);
void yellowJacketSetter(void);
void studyGuideSetter(int, int);
void showFinalGrade(int, bool);

#endif
