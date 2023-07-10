;;=============================================================
;; CS 2110 - Spring 2020
;; Homework 6 - Reverse Linked List
;;=============================================================
;; Name:
;;============================================================

;; In this file, you must implement the 'reverseLL' subroutine.

;; Little reminder from your friendly neighborhood 2110 TA staff: don't run
;; this directly by pressing 'RUN' in complx, since there is nothing put at
;; address x3000. Instead, load it and use 'Debug' -> 'Simulate
;; Subroutine Call' and choose the 'reverseLL' label.

.orig x3000
HALT

;; Pseudocode (see PDF for explanation):
;;
;; Arguments of reverseLL: Node head
;;
;; reverseLL(Node head) {
;;     // note that a NULL address is the same thing as the value 0
;;     if (head == NULL) {
;;         return NULL;
;;     }
;;     if (head.next == NULL) {
;;         return head;
;;     }
;;     Node tail = head.next;          
;;     Node newHead = reverseLL(tail);
;;     tail.next = head;                    
;;     head.next = NULL;                
;;     return newHead;
;; }

;; x4000 
reverseLL

;; YOUR CODE HERE
    ADD R6, R6, -4
    STR R7, R6, 2       ;save return address
    STR R5, R6, 1       ;saves old frame pointer
    ADD R5, R6, 0       ;position R5 right above oldFP
    ADD R6, R6, -6      ;move R6 up to allow space for registers
    ;;save registers
    STR R0, R5, -2
    STR R1, R5, -3
    STR R2, R5, -4
    STR R3, R5, -5
    STR R4, R5, -6

    ; if (head == null)
    LDR R0, R5, 4       ; R0 = head
    BRz IF1

    ; if (head.next == null)
    LDR R0, R5, 4       ; R0 = head
    LDR R0, R0, 0       ; R0 = head.next
    BRz IF2

    ; tail = head.next
    LDR R0, R5, 4       ; R0 = head
    LDR R0, R0, 0       ; R0 = head.next
    STR R0, R5, 0       ; tail = head.next

    ; newHead = reverseLL(tail)
    LDR R1, R5, 0       ; R1 = tail
    ADD R6, R6, -1      ; stack + 1
    STR R1, R6, 0       ; pass parameter

    JSR reverseLL

    LDR R1, R6, 0       ; R1 = return value of reverseLL(tail)
    STR R1, R5, -1      ; newHead = reverseLL(tail)

    ;tail.next = head
    LDR R1, R5, 0       ; R1 = tail
    LDR R0, R5, 4       ; R0 = head
    STR R0, R1, 0       ; tail.next = head

    ; head.next = NULL
    LDR R0, R5, 4       ; R0 = head
    LDR R0, R0, 0       ; R0 = head.next
    AND R1, R1, 0       ; R1 = null
    STR R1, R0, 0       ; head.next = null

    ; return newHead
    LDR R0, R5, -1       ; R0 = newHead
    STR R0, R5, 3       ; return newHead
    BR TEARDOWN


    IF1
    AND R0, R0, 0       ; R0 = 0
    STR R0, R5, 3       ; return null(= 0)
    BR TEARDOWN

    IF2
    LDR R0, R5, 4       ; R0 = head
    STR R0, R5, 3       ; return head
    BR TEARDOWN



    TEARDOWN
    ;;restore registers
    LDR R0, R5, -2
    LDR R1, R5, -3
    LDR R2, R5, -4
    LDR R3, R5, -5
    LDR R4, R5, -6
    ;;restore return address, frame pointerm and move R6 to RV
    ADD R6, R5, 0
    LDR R5, R6, 1
    LDR R7, R6, 2
    ADD R6, R6, 3
    
RET

;; used by the autograder
STACK .fill xF000
.end

;; The following is an example of a small linked list that starts at x4000.
;;
;; The first number (offset 0) contains the address of the next node in the
;; linked list, or zero if this is the final node.
;;
;; The second number (offset 1) contains the data of this node.
.orig x4000
.fill x4008
.fill 5
.end

.orig x4008
.fill x4010
.fill 12
.end

.orig x4010
.fill 0
.fill -7
.end
