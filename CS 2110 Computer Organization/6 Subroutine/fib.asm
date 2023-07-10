;;=======================================
;; CS 2110 - Spring 2020
;; HW6 - Recursive Fibonacci Sequence
;;=======================================
;; Name:
;;=======================================

;; In this file, you must implement the 'fib' subroutine.

;; Little reminder from your friendly neighborhood 2110 TA staff: don't run
;; this directly by pressing 'RUN' in complx, since there is nothing put at
;; address x3000. Instead, load it and use 'Debug' -> 'Simulate
;; Subroutine Call' and choose the 'reverseLL' label.

.orig x3000
HALT

;; Pseudocode (see PDF for explanation):
;;
;; Arguments of Fibonacci number: integer n
;;
;; Pseudocode:
;; fib(int n) {
;;     if (n == 0) {
;;         return 0;
;;     } else if (n == 1) {
;;         return 1;
;;     } else {
;;         return fib(n - 1) + fib(n - 2);
;;     }
;; }
fib

;; YOUR CODE HERE
    ADD R6, R6, -4
    STR R7, R6, 2       ;save return address
    STR R5, R6, 1       ;saves old frame pointer
    ADD R5, R6, 0       ;position R5 right above oldFP
    ADD R6, R6, -5      ;move R6 up to allow space for registers
    ;;save registers
    STR R0, R6, 0
    STR R1, R6, 1
    STR R2, R6, 2
    STR R3, R6, 3
    STR R4, R6, 4

    ; if (n == 0)
    LDR R0, R5, 4       ; R0 = n
    BRz IF 

    ; if (n == 1)
    LDR R0, R5, 4       ; R0 = n
    ADD R1, R0, -1      ; R1 = n - 1
    BRz ELSEIF

    ; else {
    LDR R0, R5, 4       ; R0 = n
    ADD R0, R0, -1      ; R0 = n - 1
    ADD R6, R6, -1      ; stack + 1
    STR R0, R6, 0       ; pass parameter (n - 1)

    JSR fib             ; call fib

    LDR R1, R6, 0       ; return value in R1
    ADD R6, R6, 2       ; stack - 2

    LDR R0, R5, 4       ; R0 = n
    ADD R0, R0, -2      ; n - 2
    ADD R6, R6, -1      ; stack + 1
    STR R0, R6, 0       ; pass parameter (n - 2)

    JSR fib

    LDR R2, R6, 0       ; return value in R2
    ADD R6, R6, 2       ; stack - 2

    ADD R1, R1, R2      ; fib (n - 1) + fib (n - 2)
    STR R1, R5, 3       ; return fib(n - 1) + fib(n - 2);
    BR TEARDOWN




    IF
    STR R0, R5, 3       ; return 0
    BR TEARDOWN

    ELSEIF
    AND R0, R0, 0       ; R0 = 0
    ADD R0, R0, 1       ; R1 = 1
    STR R0, R5, 3       ; return 1
    BR TEARDOWN



    TEARDOWN
    ;;restore registers
    LDR R0, R6, 0
    LDR R1, R6, 1
    LDR R2, R6, 2
    LDR R3, R6, 3
    LDR R4, R6, 4

    ;;restore return address, frame pointerm and move R6 to RV
    ADD R6, R6, 6
    LDR R5, R6, 0
    LDR R7, R6, 1
    ADD R6, R6, 2

   
    
RET
;; used by the autograder
STACK .fill xF000
.end
