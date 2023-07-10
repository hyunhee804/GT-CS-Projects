;;=============================================================
;; CS 2110 - Spring 2021
;; Homework 5 - Iterative GCD
;;=============================================================
;; Name: Hyun Hee Park
;;=============================================================

;; Pseudocode (see PDF for explanation):
;;
;; a = (argument 1);
;; b = (argument 2);
;; ANSWER = 0;
;;
;; while (a != b) {
;;   if (a > b) {
;;     a = a - b;
;;   } else {
;;     b = b - a;
;;   }
;; }
;; ANSWER = a;

.orig x3000

    ;; put your code here
    AND R0,R0,#0
    LD R1,A
    LD R2,B
WHILE
    NOT R2,R2
    ADD R2,R2,#1
    ADD R3,R1,R2
    BRz ENDWHILE
    ADD R4,R1,R2
    BRnz ELSE 
    ADD R1,R1,R2
    NOT R2,R2
    ADD R2,R2,#1
    BRnzp WHILE
ELSE
    NOT R2,R2
    ADD R2,R2,#1
    NOT R5,R1
    ADD R5,R5,#1
    ADD R2,R2,R5
    BRnzp WHILE
ENDWHILE
    ADD R0,R0,R1
    ST R0,ANSWER
HALT

A .fill 20
B .fill 19

ANSWER .blkw 1

.end
