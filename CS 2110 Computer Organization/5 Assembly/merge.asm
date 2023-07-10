;;=============================================================
;; CS 2110 - Spring 2020
;; Homework 5 - Array Merge
;;=============================================================
;; Name: Hyun Hee Park
;;=============================================================

;; Pseudocode (see PDF for explanation):
;;
;; x = 0;
;; y = 0;
;; z = 0;
;; while (x < LENGTH_X && y < LENGTH_Y) {
;;   if (ARR_X[x] <= ARR_Y[y]) {
;;     ARR_RES[z] = ARR_X[x];
;;     z++;
;;     x++;
;;   } else {
;;     ARR_RES[z] = ARR_Y[y];
;;     z++;
;;     y++;
;;   }
;; }
;; while(x < ARRX.length) {
;;   ARR_RES[z] = ARR_X[x];
;;   z++;
;;   x++;
;; }
;; while (y < ARRY.length) {
;;   ARR_RES[z] = ARR_Y[y];
;;   z++;
;;   y++;
;; }



.orig x3000

    ;; put your code here
    AND R0,R0,#0        ; x = 0
    AND R1,R1,#0        ; y = 0
    AND R2,R2,#0        ; z = 0


WHILE1
    LD R3,LENGTH_X      
    NOT R3,R3
    ADD R3,R3,#1        ; R3 = -R3
    ADD R3,R0,R3        ; x < LENGTH_X
    BRzp WHILE2

    LD R4,LENGTH_Y
    NOT R4,R4
    ADD R4,R4,#1
    ADD R4,R1,R4
    BRzp WHILE2

    LD R3, ARR_X        ; R3 = address of ARR_X[x]
    ADD R3,R0,R3        ; R4 = address of ARR_x[x]
    LDR R3,R3,#0        ; R3 = ARR_X[x]

    LD R4,ARR_Y         ; R4 = address of ARR_Y
    ADD R4,R1,R4        ; R4 = address of ARR_Y[y]
    LDR R4,R4,#0        ; R4 = ARR_Y[y]

    NOT R4,R4           
    ADD R4,R4,#1        ; -ARR_Y[y]
    ADD R3,R3,R4        ; R3 = ARR_X[x] + -ARR_Y[y]
    BRp ELSE            ; if ARR_X[x] is greater, ELSE

    LD R3, ARR_X        ; R3 = address of ARR_X[x]
    ADD R3,R0,R3        ; R4 = address of ARR_x[x]
    LDR R3,R3,#0        ; R3 = ARR_X[x]

    LD R7, ARR_RES      ; R5 = address of ARR_RES
    ADD R5,R2,R7        ; R5 = address of ARR_RES[z]

    STR R3, R5, #0      ; ARR_RES[z] = ARR_X[x]
    ADD R2,R2,#1        ; z++
    ADD R0,R0,#1        ; x++
    BRnzp WHILE1

ELSE
    NOT R4, R4
    ADD R4,R4,#1        ; ARR_Y[y]

    LD R7, ARR_RES      ; R5 = address of ARR_RES
    ADD R5,R2,R7        ; R5 = address of ARR_RES[z]

    STR R4, R5, #0      ; ARR_RES[z] = ARR_X[x]
    ADD R2,R2,#1        ; z++
    ADD R1,R1,#1        ; y++
    BRnzp WHILE1

WHILE2
    LD R3, LENGTH_X
    NOT R3, R3
    ADD R3, R3, #1      ; -LENGTH_X
    ADD R3,R0,R3        ; x < LENGTH_X
    BRzp WHILE3

    LD R7, ARR_RES      ; R5 = address of ARR_RES
    ADD R5,R2,R7        ; R5 = address of ARR_RES[z]

    LD R3, ARR_X        ; R3 = address of ARR_X[x]
    ADD R3,R0,R3        ; R4 = address of ARR_x[x]
    LDR R6,R3,#0        ; R3 = ARR_X[x]

    STR R6,R5,#0        ; ARR_RES[z] = ARR_X[x]
    ADD R2,R2,#1        ; z++
    ADD R0,R0,#1        ; x++
    BRnzp WHILE2

WHILE3
    LD R4,LENGTH_Y
    NOT R4,R4
    ADD R4,R4,#1
    ADD R4,R1,R4
    BRzp END

    LD R7, ARR_RES      ; R5 = address of ARR_RES
    ADD R5,R2,R7        ; R5 = address of ARR_RES[z]

    LD R4,ARR_Y         ; R4 = address of ARR_Y
    ADD R4,R1,R4        ; R4 = address of ARR_Y[y]
    LDR R6,R4,#0        ; R4 = ARR_Y[y]

    STR R6,R5,#0        ; ARR_RES[z] = ARR_Y[y]
    ADD R2,R2,#1        ; z++
    ADD R1,R1,#1        ; y++
    BRnzp WHILE3

END
    HALT

HALT

ARR_X      .fill x4000
ARR_Y      .fill x4100
ARR_RES    .fill x4200

LENGTH_X   .fill 5
LENGTH_Y   .fill 7
LENGTH_RES .fill 12

.end

.orig x4000
.fill 1
.fill 5
.fill 10
.fill 11
.fill 12
.end

.orig x4100
.fill 3
.fill 4
.fill 6
.fill 9
.fill 15
.fill 16
.fill 17
.end
