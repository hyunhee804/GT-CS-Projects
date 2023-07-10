#ifndef MAIN_H
#define MAIN_H

#include "gba.h"
#include <stdbool.h>

typedef struct player {
	int row;
	int col;
	int width;
	int height;
} PLAYER;

struct monster {
	int row;
	int col;
	int width;
	int height;
	bool rightDirection;
	bool leftDirection;
	bool upDirection;
	bool downDirection;
} *currMonster, *oldMonster;

struct state {
	int money;
	int size;
	struct player player;
	struct monster monster;
} cs, ps;

//Prototypes
void initStage(void);
void playerSetting(void);
void monsterCollisionWall(void);
void moveMonster(void);
void monsterCollisionPlayer(void);




#endif
