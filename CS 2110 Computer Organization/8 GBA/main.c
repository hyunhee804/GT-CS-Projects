#include "main.h"

#include <stdio.h>
#include <stdlib.h>

#include "gba.h"

#include "images/start.h"
#include "images/playscreen.h"
#include "images/you.h"
#include "images/monster.h"
#include "images/money.h"

typedef enum {
  START,
  PLAY,
  WIN,
} GBAState;

int collisionOccur;

int main(void) {

  // Set video mode to MODE3 //
  REG_DISPCNT = BG2_ENABLE | MODE3;   //BG2_ENABLE | MODE3 = 1027

  // Save current and previous state of button input.
  u32 previousButtons = BUTTONS;
  u32 currentButtons = BUTTONS;

  // Load initial application state
  GBAState state = START;
  
  //Start screen
  waitForVBlank();
  drawFullScreenImageDMA(start);
  drawString(10, 84, "CS 2110 GBA", WHITE);
  drawString(70, 77, "Earn Coin Game", CYAN);
  drawString(85, 60, "Press Enter to Start", YELLOW);

  while (1) {
    ps = cs;
    currentButtons = BUTTONS; // Load the current state of the buttons

    if (KEY_DOWN(BUTTON_SELECT, currentButtons)) {
      state = START;
      waitForVBlank();
      drawFullScreenImageDMA(start);
      drawString(10, 84, "CS 2110 GBA", WHITE);
      drawString(70, 77, "Earn Coin Game", CYAN);
      drawString(85, 60, "Press Enter to Start", YELLOW);
    }

    switch (state) {
      case START:

        if (KEY_DOWN(BUTTON_START, currentButtons)) {
          cs.player.col = 0;
          cs.player.row = 0;
          cs.player.width = 18;
          cs.player.height = 18;

          cs.monster.col = 90;
          cs.monster.col = 90;
          cs.monster.width = 25;
          cs.monster.height = 25;

          cs.monster.leftDirection = true;
          cs.monster.rightDirection = false;
          cs.monster.upDirection = false;
          cs.monster.downDirection = true;

          cs.money = 0;
          collisionOccur = 1;
          state = PLAY;
        }
        break;

      case PLAY:

        if (KEY_DOWN(BUTTON_LEFT, currentButtons)) {
          cs.player.col -= 1;
        }
        if (KEY_DOWN(BUTTON_RIGHT, currentButtons)) {
          cs.player.col += 1;
        }
        if (KEY_DOWN(BUTTON_UP, currentButtons)) {
          cs.player.row -= 1;
        }
        if (KEY_DOWN(BUTTON_DOWN, currentButtons)) {
          cs.player.row += 1;
        }

        if (cs.player.col >= 222) {
          cs.player.col = 222;
        }

        if (cs.player.col < 0) {
          cs.player.col = 0;
        }

        if (cs.player.row >= 100) {
          cs.player.row = 100;
        }

        if (cs.player.row < 0) {
          cs.player.row = 0;
        }

        monsterCollisionPlayer();
        moveMonster();

        char buffer[100];
        sprintf(buffer, "money: %d", cs.money);

        waitForVBlank();
        fillScreenDMA(BLACK);
        drawImageDMA(cs.monster.row, cs.monster.col, 25, 25, monster);
        drawImageDMA(cs.player.row, cs.player.col, 18, 18, you);
        drawString(130, 10, buffer, YELLOW);


        if (cs.money == 3) {
          state = WIN;
          waitForVBlank();
          drawFullScreenImageDMA(playscreen);
        }

        break;

      case WIN:
        waitForVBlank();
        drawString(55, 95, "Congrats!", MAGENTA);
        drawString(70, 73, "You Became Rich!", MAGENTA);
      
        break;
    }

    previousButtons = currentButtons; // Store the current state of the buttons
  }

  UNUSED(previousButtons); // You can remove this once previousButtons is used

  return 0;
}

void moveMonster(void) {
  if (cs.monster.rightDirection) {
    cs.monster.col += 1;
  }

  if (cs.monster.leftDirection) {
    cs.monster.col -= 1;
  }

  if (cs.monster.upDirection) {
    cs.monster.row -= 1;
  }

  if (cs.monster.downDirection) {
    cs.monster.row += 1;
  }

  monsterCollisionWall();
}

void monsterCollisionWall(void) {
  if (cs.monster.row > 100) {
    cs.monster.row = 100;
    cs.monster.downDirection = false;
    cs.monster.upDirection = true;
  }

  if (cs.monster.row < 0) {
    cs.monster.row = 0;
    cs.monster.downDirection = true;
    cs.monster.upDirection = false;
  }

  if (cs.monster.col > 220) {
    cs.monster.col = 220;
    cs.monster.leftDirection = true;
    cs.monster.rightDirection = false;
  }

  if (cs.monster.col < 0) {
    cs.monster.col = 0;
    cs.monster.leftDirection = false;
    cs.monster.rightDirection = true;
  }
}

void monsterCollisionPlayer(void) {
  if (cs.player.row < cs.monster.row + cs.monster.width
    && cs.player.row + cs.player.width > cs.monster.row 
    && cs.player.col < cs.monster.col + cs.monster.height 
    && cs.player.col + cs.player.height > cs.monster.col) { 
      if (collisionOccur) {
        cs.money += 1;
        collisionOccur = 0;
      }
  } else {
    collisionOccur = 1;
  }
}
