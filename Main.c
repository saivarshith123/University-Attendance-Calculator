#include <stdio.h>
#include <math.h>

// Function prototypes
void calculateTheoryAttendance();
void calculateLabAttendance();
void clearInputBuffer();

int main() {
    char choice;
    int loop = 1; // Controls the main loop

    while (loop) {
        printf("\nSelect calculator type:\n");
        printf("1. Theory Calculator\n");
        printf("2. Lab Calculator\n");
        printf("3. Exit\n");
        printf("Enter your choice (1, 2, or 3): ");

        // Read a single character for the choice
        scanf(" %c", &choice);
        clearInputBuffer(); // Clear any extra characters from the input buffer

        switch (choice) {
            case '1':
                calculateTheoryAttendance();
                break;
            case '2':
                calculateLabAttendance();
                break;
            case '3':
                printf("Exiting program. Goodbye!\n");
                loop = 0; // Exit the loop
                break;
            default:
                printf("\nInvalid choice. Please enter 1, 2, or 3.\n");
                break;
        }
    }

    return 0;
}

/**
 * @brief Handles the logic for the theory attendance calculator.
 */
void calculateTheoryAttendance() {
    printf("\n--- Theory Attendance Calculator ---\n");
    
    int total, attended;

    printf("Enter Total Classes Conducted: ");
    if (scanf("%d", &total) != 1) {
        printf("\nError: Invalid input. Please enter whole numbers.\n");
        clearInputBuffer();
        return;
    }

    printf("Enter Classes You Attended: ");
    if (scanf("%d", &attended) != 1) {
        printf("\nError: Invalid input. Please enter whole numbers.\n");
        clearInputBuffer();
        return;
    }
    clearInputBuffer();

    if (total < 0 || attended < 0) {
        printf("\nError: Please enter valid, non-negative numbers.\n");
        return;
    }
    if (attended > total) {
        printf("\nError: Attended classes cannot be greater than total classes.\n");
        return;
    }

    double currentPercentage = (total > 0) ? ((double)attended / total) * 100.0 : 0.0;
    printf("\nYour current attendance is %.0f%%.\n", floor(currentPercentage));

    if (currentPercentage >= 75) {
        int skippable = (int)floor((4.0 * attended / 3.0) - total);
        const char* classText = (skippable == 1) ? "class" : "classes";
        printf("To maintain 75%%, you can skip the next %d %s.\n", skippable, classText);
    } else {
        int needed = (3 * total) - (4 * attended);
        const char* classText = (needed == 1) ? "class" : "classes";
        printf("You must attend the next %d consecutive %s to reach 75%%.\n", needed, classText);
    }
}

/**
 * @brief Handles the logic for the lab attendance calculator.
 */
void calculateLabAttendance() {
    printf("\n--- Lab Attendance Calculator ---\n");
    printf("Note: Enter hours as theory class equivalents (1 lab = 2 hours).\n");

    int totalTheory, attendedTheory;

    printf("Enter Total Theory-Equivalent Hours: ");
    if (scanf("%d", &totalTheory) != 1) {
        printf("\nError: Invalid input. Please enter whole numbers.\n");
        clearInputBuffer();
        return;
    }

    printf("Enter Theory-Equivalent Hours Attended: ");
    if (scanf("%d", &attendedTheory) != 1) {
        printf("\nError: Invalid input. Please enter whole numbers.\n");
        clearInputBuffer();
        return;
    }
    clearInputBuffer();

    if (totalTheory < 0 || attendedTheory < 0) {
        printf("\nError: Please enter valid, non-negative numbers.\n");
        return;
    }
    if (totalTheory % 2 != 0 || attendedTheory % 2 != 0) {
        printf("\nError: Lab hour equivalents must be even numbers.\n");
        return;
    }
    if (attendedTheory > totalTheory) {
        printf("\nError: Attended hours cannot be greater than total hours.\n");
        return;
    }

    int totalLabs = totalTheory / 2;
    int attendedLabs = attendedTheory / 2;

    double currentPercentage = (totalLabs > 0) ? ((double)attendedLabs / totalLabs) * 100.0 : 0.0;
    printf("\nYour current lab attendance is %.0f%%.\n", floor(currentPercentage));

    if (currentPercentage >= 75) {
        int skippable = (int)floor((4.0 * attendedLabs / 3.0) - totalLabs);
        const char* labText = (skippable == 1) ? "lab" : "labs";
        printf("To maintain 75%%, you can skip the next %d %s.\n", skippable, labText);
    } else {
        int needed = (3 * totalLabs) - (4 * attendedLabs);
        const char* labText = (needed == 1) ? "lab" : "labs";
        printf("You must attend the next %d consecutive %s to reach 75%%.\n", needed, labText);
    }
}

/**
 * @brief Clears the standard input buffer of any remaining characters.
 * This is useful after a scanf to prevent leftover characters from affecting
 * the next input operation.
 */
void clearInputBuffer() {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}
