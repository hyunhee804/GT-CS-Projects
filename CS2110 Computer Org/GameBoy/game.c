#include "game.h"
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include "gba.h"
#include "images/startScreen.h"
#include "images/assembly.h"
#include "images/coronaVirus.h"
#include "images/introToC.h"
#include "images/stateMachine.h"
#include "images/subroutine.h"
#include "images/yellowJacketLeft.h"
#include "images/yellowJacketLeftRed.h"
#include "images/yellowJacketRight.h"
#include "images/yellowJacketRightRed.h"
#include "images/finalGrade.h"

/* TODO: */
// Include any header files for title screen or exit
// screen images generated by nin10kit. Example for the provided garbage
// image:
// #include "images/garbage.h"

/* TODO: */
// Add any additional states you need for your app.
typedef enum
{
  START,
  PLAY_STAGE1,
  PLAY_STAGE2,
  PLAY_STAGE3,
  PLAY_STAGE4,
  FINAL_GRADE
} GBAState;

int yellowJacketSpeed;
int virusSpeed;

int hurtCount; //this is count integer to show user to animation.
               //when yellow jacket contact with a virus, it will flash red.

int main(void)
{
  /* TODO: */
  // Manipulate REG_DISPCNT here to set Mode 3. //
  REG_DISPCNT = MODE3 | BG2_ENABLE;
  // Save current and previous state of button input.
  u32 previousButtons = BUTTONS;
  u32 currentButtons = BUTTONS;

  // Load initial game state
  GBAState state = START;
  waitForVBlank(); //sync for preventing tearing
  drawFullScreenImageDMA(startScreen);
  drawString(135, 60, "PREPARE 2110 FINAL EXAM!!", GREEN);
  drawString(145, 100, "Press Start", WHITE);

  while (1)
  {
    ps = cs;                  //prev state <- current state.
    currentButtons = BUTTONS; // Load the current state of the buttons
    /* TODO: */
    // Manipulate the state machine below as needed //
    // NOTE: Call waitForVBlank() before you draw

    //whenever user pressed backspace button, state will be 'START'.
    if (KEY_JUST_PRESSED(BUTTON_SELECT, currentButtons, previousButtons))
    {
      state = START;
      waitForVBlank();
      drawFullScreenImageDMA(startScreen);
      drawString(135, 60, "PREPARE 2110 FINAL EXAM!!", GREEN);
      drawString(145, 100, "Press Start", WHITE);
    }

    //switch statement
    switch (state)
    {
    case START:
      if (KEY_JUST_PRESSED(BUTTON_START, currentButtons, previousButtons))
      {
        //set the state to stage1.
        state = PLAY_STAGE1;

        //initialize, and setting for stage1.
        yellowJacketSetter();      //init for yellowJacket.
        studyGuideSetter(140, 80); //init for studyGuide.
        cs.hp = 5;
        cs.score = 0;
        //setting the virus - stage1 - 3 viruses
        for (int i = 0; i < 5; i++)
        {
          if (i < 3)
          {
            cs.covidVirus[i].alive = true;
            cs.covidVirus[i].col = 40 * i + 30;
            cs.covidVirus[i].row = 30 * i + 30;
            cs.covidVirus[i].left = false;
            cs.covidVirus[i].right = false;
            cs.covidVirus[i].up = false;
            cs.covidVirus[i].down = true;
          }
          else
          {
            cs.covidVirus[i].alive = false;
          }
          cs.covidVirus[i].width = 20;
          cs.covidVirus[i].height = 20;
        }
        yellowJacketSpeed = 3; //speed = 3
        virusSpeed = 1; //speed = 1;
        hurtCount = 0;  //this is for animation(?) see above.
        //sync prevent for tearing.
        waitForVBlank();
        nextStageGraphicSetting(1);
        break; //out the switch statement.
      }
      break;

    case PLAY_STAGE1:
      if (cs.hp == 0)
      {
        state = FINAL_GRADE;
        waitForVBlank();
        showFinalGrade(cs.score, true); // if user fail to survive. (final score will be 'Missing')
        break;
      }

      if (cs.yellowJacket.col > 183 && cs.yellowJacket.row > 100)
      {
        state = PLAY_STAGE2;
        if (cs.yellowJacket.hasGuide)
        {
          cs.score += 25; //score will be updated when yellow jacket quit the room.
        }
        yellowJacketSetter();
        studyGuideSetter(50, 50);

        for (int i = 0; i < 5; i++)
        {
          if (i < 3)
          {
            cs.covidVirus[i].alive = true;
            cs.covidVirus[i].col = 220 - 40 * i;
            cs.covidVirus[i].left = true;
            cs.covidVirus[i].right = false;
            cs.covidVirus[i].up = false;
            cs.covidVirus[i].down = false;
          }
          else
          {
            cs.covidVirus[i].alive = false;
          }
          cs.covidVirus[i].width = 20;
          cs.covidVirus[i].height = 20;
        }

        cs.covidVirus[0].row = 30;
        cs.covidVirus[1].row = 80;
        cs.covidVirus[2].row = 100;

        yellowJacketSpeed = 3;
        virusSpeed = 2;
        hurtCount = 0;
        waitForVBlank();
        nextStageGraphicSetting(2);
        break;
      }
      stageSetter(1);
      // state = stage 1
      break;
    case PLAY_STAGE2:
      if (cs.hp == 0)
      {
        state = FINAL_GRADE;
        waitForVBlank();
        showFinalGrade(cs.score, true);
        break;
      }

      if (cs.yellowJacket.col > 183 && cs.yellowJacket.row > 100)
      {
        state = PLAY_STAGE3;
        if (cs.yellowJacket.hasGuide)
        {
          cs.score += 25;
        }
        yellowJacketSetter();
        studyGuideSetter(120, 80);

        for (int i = 0; i < 5; i++)
        {
          if (i < 4)
          {
            cs.covidVirus[i].col = 220;
            cs.covidVirus[i].alive = true;
            if (i < 2)
            {
              cs.covidVirus[i].row = 50;
              if (i % 2 == 0)
              {
                cs.covidVirus[i].left = true;
                cs.covidVirus[i].right = false;
                cs.covidVirus[i].up = true;
                cs.covidVirus[i].down = false;
              }
              else
              {
                cs.covidVirus[i].left = true;
                cs.covidVirus[i].right = false;
                cs.covidVirus[i].up = false;
                cs.covidVirus[i].down = true;
              }
            }
            else
            {
              cs.covidVirus[i].row = 100;
              if (i % 2 == 0)
              {
                cs.covidVirus[i].left = true;
                cs.covidVirus[i].right = false;
                cs.covidVirus[i].up = true;
                cs.covidVirus[i].down = false;
              }
              else
              {
                cs.covidVirus[i].left = true;
                cs.covidVirus[i].right = false;
                cs.covidVirus[i].up = false;
                cs.covidVirus[i].down = true;
              }
            }
          }
          else
          {
            cs.covidVirus[i].alive = false;
          }
          cs.covidVirus[i].width = 20;
          cs.covidVirus[i].height = 20;
        }

        yellowJacketSpeed = 3;
        virusSpeed = 1;
        hurtCount = 0;
        waitForVBlank();
        nextStageGraphicSetting(3);
        break;
      }
      stageSetter(2);

      // state = stage 2;
      break;
    case PLAY_STAGE3:
      if (cs.hp == 0)
      {
        state = FINAL_GRADE;
        waitForVBlank();
        showFinalGrade(cs.score, true);
        break;
      }
      if (cs.yellowJacket.col > 183 && cs.yellowJacket.row > 100)
      {
        state = PLAY_STAGE4;
        if (cs.yellowJacket.hasGuide)
        {
          cs.score += 25;
        }
        yellowJacketSetter();
        studyGuideSetter(50, 50);

        for (int i = 0; i < 5; i++)
        {
          cs.covidVirus[i].col = 40 * i;
          cs.covidVirus[i].row = 95;
          cs.covidVirus[i].alive = true;
          cs.covidVirus[i].width = 20;
          cs.covidVirus[i].height = 20;

          if (i % 2 == 0)
          {
            cs.covidVirus[i].right = true;
            cs.covidVirus[i].down = true;
            cs.covidVirus[i].left = false;
            cs.covidVirus[i].up = false;
          }
          else
          {
            cs.covidVirus[i].right = false;
            cs.covidVirus[i].down = false;
            cs.covidVirus[i].left = true;
            cs.covidVirus[i].up = true;
          }
        }
        yellowJacketSpeed = 3;
        virusSpeed = 2;
        hurtCount = 0;
        waitForVBlank();
        nextStageGraphicSetting(4);
        break;
      }
      stageSetter(3);

      // state = stage 3;
      break;
    case PLAY_STAGE4:
      if (cs.hp == 0)
      {
        state = FINAL_GRADE;
        waitForVBlank();
        showFinalGrade(cs.score, true);
        break;
      }

      if (cs.yellowJacket.col > 183 && cs.yellowJacket.row > 100)
      {
        state = FINAL_GRADE;
        if (cs.yellowJacket.hasGuide)
        {
          cs.score += 25;
        }

        waitForVBlank();
        showFinalGrade(cs.score, false);
        break;
      }
      stageSetter(4);

      // state = stage 4;
      break;
    case FINAL_GRADE:
      if (KEY_JUST_PRESSED(BUTTON_START, currentButtons, previousButtons))
      {
        //set the state to stage1.
        state = PLAY_STAGE1;

        //initialize, and setting for stage1.
        yellowJacketSetter();
        studyGuideSetter(140, 80);
        cs.hp = 5;
        cs.score = 0;
        hurtCount = 0;
        for (int i = 0; i < 5; i++)
        {
          if (i < 3)
          {
            cs.covidVirus[i].alive = true;
            cs.covidVirus[i].col = 40 * i + 30;
            cs.covidVirus[i].row = 30 * i + 30;
            cs.covidVirus[i].left = false;
            cs.covidVirus[i].right = false;
            cs.covidVirus[i].up = false;
            cs.covidVirus[i].down = true;
          }
          else
          {
            cs.covidVirus[i].alive = false;
          }
          cs.covidVirus[i].width = 20;
          cs.covidVirus[i].height = 20;
        }
        yellowJacketSpeed = 3;
        virusSpeed = 1;
        hurtCount = 0;

        //sync prevent for tearing.
        waitForVBlank();
        nextStageGraphicSetting(1);
        break; //out the switch statement.
      }
      // state = to show gradeScope to user. user can check the final score from here.
      break;
    }

    previousButtons = currentButtons; // Store the current state of the buttons
  }

  UNUSED(previousButtons); // You can remove this once previousButtons is used

  return 0;
}

/*
this is hepler func to set the stage screen
this will take an integer which is mean the state. and set the screen.

*/
void stageSetter(int state)
{

  if (hurtCount > 0)
  {
    hurtCount--;
  }
  //key input.
  if (KEY_DOWN(BUTTON_RIGHT, BUTTONS))
  {
    cs.yellowJacket.col = cs.yellowJacket.col + yellowJacketSpeed;
  }
  if (KEY_DOWN(BUTTON_LEFT, BUTTONS))
  {
    cs.yellowJacket.col = cs.yellowJacket.col - yellowJacketSpeed;
  }
  if (KEY_DOWN(BUTTON_UP, BUTTONS))
  {
    cs.yellowJacket.row = cs.yellowJacket.row - yellowJacketSpeed;
  }
  if (KEY_DOWN(BUTTON_DOWN, BUTTONS))
  {
    cs.yellowJacket.row = cs.yellowJacket.row + yellowJacketSpeed;
  }
  //collision (out) to prevent yellow jacket move to outside.
  if (cs.yellowJacket.col > 213)
  {
    cs.yellowJacket.col = 213;
  }
  if (cs.yellowJacket.col < 0)
  {
    cs.yellowJacket.col = 0;
  }
  if (cs.yellowJacket.row > 130)
  {
    cs.yellowJacket.row = 130;
  }
  if (cs.yellowJacket.row < 30)
  {
    cs.yellowJacket.row = 30;
  }
  //this will calculate wach alive virus's path.
  for (int i = 0; i < 5; i++)
  {
    if (cs.covidVirus[i].alive)
    {

      if (cs.covidVirus[i].right)
      {
        cs.covidVirus[i].col = cs.covidVirus[i].col + virusSpeed;
      }
      if (cs.covidVirus[i].left)
      {
        cs.covidVirus[i].col = cs.covidVirus[i].col - virusSpeed;
      }
      if (cs.covidVirus[i].down)
      {
        cs.covidVirus[i].row = cs.covidVirus[i].row + virusSpeed;
      }
      if (cs.covidVirus[i].up)
      {
        cs.covidVirus[i].row = cs.covidVirus[i].row - virusSpeed;
      }

      //collision (out) to prevent virus quit the room.
      if (cs.covidVirus[i].col > 220)
      {
        cs.covidVirus[i].col = 220;
        cs.covidVirus[i].right = false;
        cs.covidVirus[i].left = true;
      }
      if (cs.covidVirus[i].col < 0)
      {
        cs.covidVirus[i].col = 0;
        cs.covidVirus[i].right = true;
        cs.covidVirus[i].left = false;
      }
      if (cs.covidVirus[i].row > 140)
      {
        cs.covidVirus[i].row = 140;
        cs.covidVirus[i].down = false;
        cs.covidVirus[i].up = true;
      }
      if (cs.covidVirus[i].row < 30)
      {
        cs.covidVirus[i].row = 30;
        cs.covidVirus[i].down = true;
        cs.covidVirus[i].up = false;
      }
    }
  }

  //check the collision with virus
  for (int i = 0; i < 5; i++)
  {
    if (cs.covidVirus[i].alive)
    {
      //if collision is occured, then decrease the user's hp and virus will be removed.
      if (cs.covidVirus[i].col - cs.yellowJacket.col < 27 && cs.covidVirus[i].col - cs.yellowJacket.col > -20 && cs.covidVirus[i].row - cs.yellowJacket.row < 30 && cs.covidVirus[i].row - cs.yellowJacket.row > -20)
      {
        cs.covidVirus[i].alive = false;
        cs.hp--;
        hurtCount = 50; //for animation(?) color changed for 50 frames
      }
    }
  }
  //check the collision with study guide
  if (cs.studyGuide.col - cs.yellowJacket.col < 27 && cs.studyGuide.col - cs.yellowJacket.col > -30 && cs.studyGuide.row - cs.yellowJacket.row < 30 && cs.studyGuide.row - cs.yellowJacket.row > -30)
  {
    cs.yellowJacket.hasGuide = true;
    cs.studyGuide.deleted = true;
  }
  char buffer[40]; //temp buffer.

  waitForVBlank(); //sync to prevent tearing.
  if (cs.hp != ps.hp)
  {
    sprintf(buffer, "HP: %d, Expect Final Score: %d", cs.hp, cs.score);
    drawRectDMA(20, 0, 240, 10, GRAY);
    drawString(20, 40, buffer, YELLOW);
  }
  // for erasing the after image.
  drawRectDMA(ps.yellowJacket.row, ps.yellowJacket.col, ps.yellowJacket.width, ps.yellowJacket.height, BLACK);
  for (int i = 0; i < 5; i++)
  {
    if (ps.covidVirus[i].alive)
    {
      drawRectDMA(ps.covidVirus[i].row, ps.covidVirus[i].col, ps.covidVirus[i].width, ps.covidVirus[i].height, BLACK);
    }
  }
  if (!ps.studyGuide.deleted && cs.studyGuide.deleted)
  {
    drawRectDMA(ps.studyGuide.row, ps.studyGuide.col, ps.studyGuide.width, ps.studyGuide.height, BLACK);
  }
  // exit door rect
  drawRectDMA(130, 210, 30, 30, WHITE);

  // because of the virus can pass through to the studyGuide image, we need to update this every time.
  if (!cs.studyGuide.deleted)
  {

    if (state == 1)
    {
      drawImageDMA(cs.studyGuide.row, cs.studyGuide.col, cs.studyGuide.width, cs.studyGuide.height, stateMachine);
    }
    else if (state == 2)
    {
      drawImageDMA(cs.studyGuide.row, cs.studyGuide.col, cs.studyGuide.width, cs.studyGuide.height, assembly);
    }
    else if (state == 3)
    {
      drawImageDMA(cs.studyGuide.row, cs.studyGuide.col, cs.studyGuide.width, cs.studyGuide.height, subroutine);
    }
    else
    {
      drawImageDMA(cs.studyGuide.row, cs.studyGuide.col, cs.studyGuide.width, cs.studyGuide.height, introToC);
    }
  }
  // see how hurtCount used.
  if (cs.yellowJacket.col - ps.yellowJacket.col >= 0)
  {
    if (hurtCount > 40 || (hurtCount <= 30 && hurtCount > 20) || (hurtCount <= 10 && hurtCount > 0))
    {
      drawImageDMA(cs.yellowJacket.row, cs.yellowJacket.col, cs.yellowJacket.width, cs.yellowJacket.height, yellowJacketRightRed);
    }
    else
    {
      drawImageDMA(cs.yellowJacket.row, cs.yellowJacket.col, cs.yellowJacket.width, cs.yellowJacket.height, yellowJacketRight);
    }
  }
  else
  {
    if (hurtCount > 40 || (hurtCount <= 30 && hurtCount > 20) || (hurtCount <= 10 && hurtCount > 0))
    {
      drawImageDMA(cs.yellowJacket.row, cs.yellowJacket.col, cs.yellowJacket.width, cs.yellowJacket.height, yellowJacketLeftRed);
    }
    else
    {
      drawImageDMA(cs.yellowJacket.row, cs.yellowJacket.col, cs.yellowJacket.width, cs.yellowJacket.height, yellowJacketLeft);
    }
  }
  //update virus image.
  for (int i = 0; i < 5; i++)
  {
    if (cs.covidVirus[i].alive)
    {
      drawImageDMA(cs.covidVirus[i].row, cs.covidVirus[i].col, cs.covidVirus[i].width, cs.covidVirus[i].height, coronaVirus);
    }
  }
}
/*
this helper func is for set text.
*/
void nextStageGraphicSetting(int stage)
{
  fillScreenDMA(BLACK);
  char buffer[40];
  sprintf(buffer, "HP: %d, Expect Final Score: %d", cs.hp, cs.score);
  drawRectDMA(0, 0, 240, 30, GRAY);
  drawString(20, 40, buffer, YELLOW);
  if (stage == 1)
  {
    drawString(5, 40, "Take StateMachine Study Guide.", GREEN);
  }
  else if (stage == 2)
  {
    drawString(5, 40, "Take Assembly Study Guide.", GREEN);
  }
  else if (stage == 3)
  {
    drawString(5, 40, "Take Subroutine Study Guide.", GREEN);
  }
  else if (stage == 4)
  {
    drawString(5, 40, "Take Intro To C Study Guide.", GREEN);
  }
}

/*
This helper method is for init yellow Jacket.
*/
void yellowJacketSetter(void)
{
  cs.yellowJacket.col = 0;
  cs.yellowJacket.row = 130;
  cs.yellowJacket.width = 27;
  cs.yellowJacket.height = 30;
  cs.yellowJacket.hasGuide = false;
}
/*
This helper method is for init Study Guide.
*/
void studyGuideSetter(int col, int row)
{
  cs.studyGuide.col = col;
  cs.studyGuide.height = 30;
  cs.studyGuide.row = row;
  cs.studyGuide.width = 30;
  cs.studyGuide.deleted = false;
}
/*
This helper method is to show gradeScope image with final grade.
*/
void showFinalGrade(int grade, bool missing)
{
  drawFullScreenImageDMA(finalGrade);
  if (!missing)
  {
    char buffer[40];

    sprintf(buffer, "Final EXAM: %d/100", cs.score);
    drawString(100, 120, buffer, BLACK);
    if (grade >= 90)
    {
      drawString(120, 160, "A", RED);
    }
    else if (grade >= 80 && grade < 90)
    {
      drawString(120, 160, "B", RED);
    }
    else if (grade >= 70 && grade < 80)
    {
      drawString(120, 160, "C", RED);
    }
    else
    {
      drawString(120, 160, "F", RED);
    }
  }
  else
  {
    drawString(100, 120, "Final EXAM: MISSING", BLACK);
    drawString(120, 160, "F", RED);
  }

  drawString(140, 60, "Press Enter to RETAKE", GREEN);
}