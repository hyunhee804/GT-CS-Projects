;;=============================================================
;; CS 2110 - Spring 2021
;; Homework 6 - Bubble Sort with Compare
;;=============================================================
;; Name:
;;=============================================================

;; In this file, you must implement the 'SORT' subroutine.

;; Little reminder from your friendly neighborhood 2110 TA staff: don't run
;; this directly by pressing 'RUN' in complx, since there is nothing put at
;; address x3000. Instead, load it and use 'Debug' -> 'Simulate
;; Subroutine Call' and choose the 'reverseLL' label.

.orig x3000
HALT

;; Pseudocode (see PDF for explanation):
;;
;; array: memory address of the first element in the array
;; len: integer value of the number of elements in the array
;; compare: memory address of the subroutine used to compare elements
;;
;; sort(array, len, function compare) {
;;     // last index of the array
;;     y = len - 1;
;;     while(y > 0) {
;;         x = 0;
;;         while(x < y) {
;;             // if compare returns 1, swap
;;             if (compare(ARRAY[x], ARRAY[x+1]) > 0) {
;;                 temp = ARRAY[x];
;;                 ARRAY[x] = ARRAY[x+1];
;;                 ARRAY[x+1] = temp;
;;             }
;;             x++;
;;         }
;;         y--;
;;     }
;; }
;;
;; HINT: compare will be passed as a parameter on the stack. It will be a
;; a pointer to one of the subroutines below. Think about which instruction
;; allows you to call a subroutine with a memory address that is stored in a register
SORT

;; PUT YOUR CODE HERE
    ADD R6, R6, -4
    STR R7, R6, 2       ;save return address
    STR R5, R6, 1       ;saves old frame pointer
    ADD R5, R6, 0       ;position R5 right above oldFP
    ADD R6, R6, -7      ;move R6 up to allow space for registers
    ;;save registers
    STR R0, R5, -3
    STR R1, R5, -4
    STR R2, R5, -5
    STR R3, R5, -6
    STR R4, R5, -7

    ; y = len - 1
    LDR R0, R5, 5       ; R0 = len
    ADD R0, R0, -1      ; R0 = len - 1
    STR R0, R5, 0       ; y = len - 1

    ; while (y > 0)
    WHILE1
    LDR R0, R5, 0       ; if y <= 0, end while
    BRnz ENDWHILE

    ; x = 0
    AND R0, R0, 0       ; R0 = 0
    STR R0, R5, -1      ; x = 0

    ; while (x < y)
    WHILE2
    LDR R0, R5, -1      ; R0 = x
    LDR R1, R5, 0       ; R1 = y

    NOT R1, R1
    ADD R1, R1, 1       ; R1 = -y

    ADD R0, R0, R1      ; R0 = x - y
    BRzp YDEC

    ; ARRAY[x]
    LDR R0, R5, 4       ; R0 = address of array
    LDR R1, R5, -1      ; R1 = x
    ADD R0, R0, R1      ; R0 = address of array + x
    LDR R0, R0, 0       ; R0 = array[x]


    ; ARRAY[x + 1]
    LDR R1, R5, 4       ; R1 = address of array
    LDR R2, R5, -1      ; R2 = x
    ADD R2, R2, 1       ; R2 = x + 1
    ADD R1, R1, R2      ; R1 = address of array + x + 1
    LDR R1, R1, 0       ; R1 = array[x + 1]

    ; if (compare(ARRAY[x], ARRAY[x+1]) > 0)
    LDR R2, R5, 6       ; R2 = compare

    ADD R6, R6, -1      ; stack + 1
    STR R1, R6, 0       ; (_____, array[x + 1])

    ADD R6, R6, -1      ; stack + 1
    STR R0, R6, 0       ; (array[x], array[x + 1])

    JSRR R2             ; call subroutine

    LDR R0, R6, 0       ; R0 = return value
    ADD R6, R6, 3       ; stack - 3

    ADD R0, R0, 0       ; R0 = return value
    BRnz XINC           ; if return value negative or zero, increment x

    ; temp = ARRAY[x]
    LDR R0, R5, -1      ; R0 = x
    LDR R1, R5, 4       ; R1 = address of array
    ADD R1, R1, R0      ; R1 = address of array + x
    LDR R1, R1, 0       ; R1 = array[x]
    STR R1, R5, -2      ; temp = array[x]

    ; array[x] = array[x + 1]
    LDR R0, R5, -1      ; R0 = x
    ADD R1, R0, 1       ; R1 = x + 1
    LDR R2, R5, 4       ; R2 = address of array
    ADD R1, R1, R2      ; R1 = address of array + x + 1
    LDR R1, R1, 0       ; R1 = array[x + 1];
    ADD R0, R2, R0      ; R0 = address of array + x
    STR R1, R0, 0       ; array[x] = array[x + 1]

    ; array[x + 1] = temp
    LDR R0, R5, -1      ; R0 = x
    ADD R0, R0, 1       ; x + 1
    LDR R1, R5, 4       ; R1 = address of array
    ADD R0, R1, R0      ; R0 = address of array + x + 1
    LDR R1, R5, -2      ; R1 = temp
    STR R1, R0, 0       ; array[x + 1] = temp
    BR XINC

    
    ; x++
    XINC
    LDR R0, R5, -1      ; R0 = x
    ADD R0, R0, 1       ; x + 1
    STR R0, R5, -1      ; x++
    BR WHILE2

    ; y--
    YDEC
    LDR R0, R5, 0       ; R0 = y
    ADD R0, R0, -1      ; R0 = y - 1
    STR R0, R5, 0       ; y--
    BR WHILE1

    ENDWHILE
    TEARDOWN
    ;;restore registers
    LDR R0, R5, -3
    LDR R1, R5, -4
    LDR R2, R5, -5
    LDR R3, R5, -6
    LDR R4, R5, -7
    ;;restore return address, frame pointerm and move R6 to RV
    ADD R6, R5, 0
    LDR R5, R6, 1
    LDR R7, R6, 2
    ADD R6, R6, 3
   
RET

;; used by the autograder
STACK .fill xF000
.end

;; USE FOR DEBUGGING IN COMPLEX
;; load array at x4000 and put the length as 7
;; you can use the memory addresses of the subroutines below for the last parameter

;; ARRAY
.orig x4000
    .fill 4
    .fill -9
    .fill 0
    .fill -2
    .fill 9
    .fill 3
    .fill -10
.end

;; The following subroutines are possible functions that may be passed
;; as the function address parameter into the sorting function.
;; DO NOT edit the code below; it will be used by the autograder.
.orig x5000
;; returns a positive number if a>b
;; compare(a,b) for ascending sort
CMPGT
    .fill   x1DBD
    .fill   x7180
    .fill   x7381
    .fill   x6183
    .fill   x6384
    .fill   x927F
    .fill   x1261
    .fill   x1201
    .fill   x0C03
    .fill   x5020
    .fill   x1021
    .fill   x0E01
    .fill   x5020
    .fill   x7182
    .fill   x6180
    .fill   x6381
    .fill   x1DA2
    .fill   xC1C0
.end

.orig x5100
;; returns a positive number if b>a
;; compare(a,b) for descending sort
CMPLT
    .fill   x1DBD
    .fill   x7180
    .fill   x7381
    .fill   x6183
    .fill   x6384
    .fill   x927F
    .fill   x1261
    .fill   x1201
    .fill   x0603
    .fill   x5020
    .fill   x1021
    .fill   x0E01
    .fill   x5020
    .fill   x7182
    .fill   x6180
    .fill   x6381
    .fill   x1DA2
    .fill   xC1C0
.end

.orig x5200
;; returns a positive number if |a| > |b|
;; compare(a,b) for ascending sort on magnitudes (absolute value)
CMPABS
    .fill   x1DBD
    .fill   x7180
    .fill   x7381
    .fill   x6183
    .fill   x0602
    .fill   x903F
    .fill   x1021
    .fill   x6384
    .fill   x0C02
    .fill   x927F
    .fill   x1261
    .fill   x1240
    .fill   x0C03
    .fill   x5020
    .fill   x1021
    .fill   x0E01
    .fill   x5020
    .fill   x7182
    .fill   x6180
    .fill   x6381
    .fill   x1DA2
    .fill   xC1C0
.end
