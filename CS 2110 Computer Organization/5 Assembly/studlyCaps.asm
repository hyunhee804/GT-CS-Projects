;;=============================================================
;; CS 2110 - Fall 2021
;; Homework 5 - Studly Caps!
;;=============================================================
;; Name: Hyun Hee Park
;;=============================================================

;; Pseudocode (see PDF for explanation)
;;
;; string = "TWENTY 1 ten";
;; i = 0;
;; while (string[i] != 0) {
;;   if (i % 2 == 0) {
;;    // should be lowercase
;;     if ('A' <= string[i] <= 'Z') {
;;       string[i] = string[i] | 32;
;;     }
;;   } else {
;;     // should be uppercase
;;     if ('a' <= string[i] <= 'z') {
;;       string[i] = string[i] & ~32;
;;     }
;;   }
;;   i++;
;; }

.orig x3000

    ;; put your code here
    LD R0, STRING       ; R0 = address of string
    AND R1, R1, #0      ; i = 0;

    AND R7, R7, #0      
    ADD R7, R7, #15
    ADD R7, R7, #15
    ADD R7, R7, #2      ; R7 = 32


WHILE
    ADD R3, R0, R1      ; R3 = address of string[i]
    LDR R3, R3, #0      ; R3 = string[i]

    NOT R3, R3          ; R3 = -string[i] - 1
    ADD R3, R3, #1      ; R3 = -string[i]
    BRz ENDWHILE        ; if -string[i] == 0, loop ends
    

    AND R2, R1, x0001   ; if i % 2 == 0, ignore BRnp ELSE
    BRnp ELSE

    LD R5, UPPERA       ; R5 = 'A'
    ADD R5, R5, R3      ; R5 = 'A' + -string[i]
    BRp COUNT           ; if 'A' <= string[i], keep going

    LD R5, UPPERZ       ; R5 = 'Z'
    NOT R5, R5          
    ADD R5, R5, #1      ; R5 = -'Z'

    NOT R3, R3
    ADD R3, R3, #1      ; R3 = string[i]
    ADD R5, R3, R5      ; R5 = string[i] + -'Z'
    BRp COUNT           ; if string[i] <= 'Z', keep going

    ;; perform DeMorgan's Law for OR 
    NOT R3, R3          ; R3 = ~string[i]
    NOT R7, R7          ; R7 = ~32

    AND R5, R3, R7      ; R5 = ~string[i] & ~32
    NOT R5, R5          ; R5 = string[i] & 32 

    NOT R3, R3          ; R3 = ~(~string[i]) = string[i]
    LD R0, STRING       ; R0 = string
    ADD R3, R0, R1      ; string[i]
    STR R5, R3, #0      ; store (string[i] & 32) in string[i]

    NOT R7, R7          ; R7 = ~(~32) = 32
    BRnzp COUNT

ELSE    
    LD R5, LOWERA
    ADD R5, R5, R3      ; R5 = 'a' + -string[i]
    NOT R3, R3          
    ADD R3, R3, #1      ; R3 = string[i]

    ADD R5, R5, #0
    BRp COUNT

    LD R5, LOWERZ
    NOT R5, R5          
    ADD R5, R5, #1      ; R5 = -'z'
    ADD R5, R3, R5      ; R5 = string[i] + -'z'
    BRp COUNT

    NOT R7, R7          ; R7 = ~32
    AND R5, R3, R7      ; R5 = string[i] & ~32

    NOT R7, R7
    
    LD R0, STRING       ; R0 = string
    ADD R3, R0, R1      ; string[i]
    STR R5, R3, #0      ; store (string[i] & 32) in string[i]
    BRnzp COUNT

COUNT
    ADD R1, R1, #1      ; i++
    BRnzp WHILE

ENDWHILE
    HALT

HALT

UPPERA .fill x41  ;; The ASCII value of 'A'
UPPERZ .fill x5B  ;; The ASCII value of 'Z'
LOWERA .fill x61  ;; The ASCII value of 'a'
LOWERZ .fill x7B  ;; The ASCII value of 'z'

STRING .fill x4000
.end

.orig x4000
.stringz "TWENTY ONE TEN"
.end
