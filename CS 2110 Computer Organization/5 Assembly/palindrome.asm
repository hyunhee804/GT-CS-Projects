;;=============================================================
;; CS 2110 - Fall 2020
;; Homework 5 - Palindrome
;;=============================================================
;; Name: Hyun Hee Park
;;=============================================================

;; Pseudocode (see PDF for explanation):
;;
;; string = "racecar";
;; len = 0;
;;
;; // to find the length of the string
;; while (string[len] != '\0') {
;;   len = len + 1;
;; }
;;
;; // to check whether the string is a palindrome
;; result = 1;
;; i = 0;
;; while (i < length) {
;;   if (string[i] != string[length - i - 1]) {
;;     result = 0;
;;     break;
;;   }
;;   i = i + 1;
;; }

.orig x3000

    ;; put your code here
    LD R0, STRING       ; string = "racecar"
    AND R1, R1, #0      ; len = 0
    AND R2, R2, #0      ; result = 0
    ADD R2, R2, #1      ; result = 1
    AND R3, R3, #0      ; i = 0

WHILE1
    ADD R4, R0, R1      ; while(string[i] != '\0')
    LDR R4, R4, #0      ; R4 = string[len]
    BRz WHILE2          ; if string[len] == 0, end loop

    ADD R1, R1, #1      ; len = len + 1
    BRnzp WHILE1

WHILE2
    NOT R1, R1          ; R1 = -len - 1
    ADD R1, R1, #1      ; R1 = -len
    ADD R6, R3, R1      ; R6 = i + (-len)
    BRzp ENDWHILE2

    NOT R1, R1
    ADD R1, R1, #1      ; back to positive len

    LD R0, STRING       ; if (string[i] != string[length - i - 1]
    ADD R5, R0, R3      ; R5 = string + i string[i]
    LDR R6, R5, #0      ; R6 = string[i]

    NOT R3, R3
    ADD R3, R3, #1      ; i = -i

    ADD R7, R1, R3      ; R7 = length - i
    ADD R7, R7, #-1     ; R7 = length - i - 1
    LD R0, STRING
    ADD R7, R0, R7
    LDR R5, R7, #0      ; R5 = string[length - i - 1] 

    NOT R3, R3          
    ADD R3, R3, #1      ; i = i

    NOT R5, R5
    ADD R5, R5, #1

    ADD R7, R6, R5      ; R7 = string[i] - string[length - i - 1]
    BRz INCREMENT

    AND R2, R2, #0      ; result = 0
    BRnzp ENDWHILE2


INCREMENT
    ADD R3, R3, #1      ; i = i + 1;
    BRnzp WHILE2

ENDWHILE2
    ST R2, ANSWER

    HALT

ANSWER .blkw 1
STRING .fill x4000
.end

.orig x4000
.stringz "racecar"
.end
