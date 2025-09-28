#include <iostream>
#include <cmath>
#include <limits>

// Forward declarations of the functions
void calculateTheoryAttendance();
void calculateLabAttendance();
void clearInputBuffer();

int main() {
    char choice;
    while (true) {
        std::cout << "\nSelect calculator type:" << std::endl;
        std::cout << "1. Theory Calculator" << std::endl;
        std::cout << "2. Lab Calculator" << std::endl;
        std::cout << "3. Exit" << std::endl;
        std::cout << "Enter your choice (1, 2, or 3): ";
        std::cin >> choice;

        // Clear the rest of the line in case of extra input
        clearInputBuffer();

        switch (choice) {
            case '1':
                calculateTheoryAttendance();
                break;
            case '2':
                calculateLabAttendance();
                break;
            case '3':
                std::cout << "Exiting program. Goodbye!" << std::endl;
                return 0;
            default:
                std::cout << "\nInvalid choice. Please enter 1, 2, or 3." << std::endl;
                break;
        }
    }
    return 0;
}

void calculateTheoryAttendance() {
    std::cout << "\n--- Theory Attendance Calculator ---" << std::endl;
    
    int total, attended;

    std::cout << "Enter Total Classes Conducted: ";
    std::cin >> total;
    if (std::cin.fail()) {
        std::cout << "\nError: Invalid input. Please enter whole numbers." << std::endl;
        clearInputBuffer();
        return;
    }

    std::cout << "Enter Classes You Attended: ";
    std::cin >> attended;
    if (std::cin.fail()) {
        std::cout << "\nError: Invalid input. Please enter whole numbers." << std::endl;
        clearInputBuffer();
        return;
    }
    
    // Clear buffer after reading numbers
    clearInputBuffer();

    if (total < 0 || attended < 0) {
        std::cout << "\nError: Please enter valid, non-negative numbers." << std::endl;
        return;
    }
    if (attended > total) {
        std::cout << "\nError: Attended classes cannot be greater than total classes." << std::endl;
        return;
    }

    double currentPercentage = (total > 0) ? (static_cast<double>(attended) / total) * 100 : 0;
    std::cout << "\nYour current attendance is " << static_cast<int>(floor(currentPercentage)) << "%." << std::endl;

    if (currentPercentage >= 75) {
        int skippable = static_cast<int>(floor((4.0 * attended / 3.0) - total));
        const char* classText = (skippable == 1) ? "class" : "classes";
        std::cout << "To maintain 75%, you can skip the next " << skippable << " " << classText << "." << std::endl;
    } else {
        int needed = (3 * total) - (4 * attended);
        const char* classText = (needed == 1) ? "class" : "classes";
        std::cout << "You must attend the next " << needed << " consecutive " << classText << " to reach 75%." << std::endl;
    }
}

void calculateLabAttendance() {
    std::cout << "\n--- Lab Attendance Calculator ---" << std::endl;
    std::cout << "Note: Enter hours as theory class equivalents (1 lab = 2 hours)." << std::endl;

    int totalTheory, attendedTheory;

    std::cout << "Enter Total Theory-Equivalent Hours: ";
    std::cin >> totalTheory;
    if (std::cin.fail()) {
        std::cout << "\nError: Invalid input. Please enter whole numbers." << std::endl;
        clearInputBuffer();
        return;
    }

    std::cout << "Enter Theory-Equivalent Hours Attended: ";
    std::cin >> attendedTheory;
    if (std::cin.fail()) {
        std::cout << "\nError: Invalid input. Please enter whole numbers." << std::endl;
        clearInputBuffer();
        return;
    }

    // Clear buffer after reading numbers
    clearInputBuffer();

    if (totalTheory < 0 || attendedTheory < 0) {
        std::cout << "\nError: Please enter valid, non-negative numbers." << std::endl;
        return;
    }
    if (totalTheory % 2 != 0 || attendedTheory % 2 != 0) {
        std::cout << "\nError: Lab hour equivalents must be even numbers." << std::endl;
        return;
    }
    if (attendedTheory > totalTheory) {
        std::cout << "\nError: Attended hours cannot be greater than total hours." << std::endl;
        return;
    }

    int totalLabs = totalTheory / 2;
    int attendedLabs = attendedTheory / 2;

    double currentPercentage = (totalLabs > 0) ? (static_cast<double>(attendedLabs) / totalLabs) * 100 : 0;
    std::cout << "\nYour current lab attendance is " << static_cast<int>(floor(currentPercentage)) << "%." << std::endl;

    if (currentPercentage >= 75) {
        int skippable = static_cast<int>(floor((4.0 * attendedLabs / 3.0) - totalLabs));
        const char* labText = (skippable == 1) ? "lab" : "labs";
        std::cout << "To maintain 75%, you can skip the next " << skippable << " " << labText << "." << std::endl;
    } else {
        int needed = (3 * totalLabs) - (4 * attendedLabs);
        const char* labText = (needed == 1) ? "lab" : "labs";
        std::cout << "You must attend the next " << needed << " consecutive " << labText << " to reach 75%." << std::endl;
    }
}

// Helper function to clear the input buffer after a failed read or to ignore extra characters.
void clearInputBuffer() {
    std::cin.clear(); // Clear error flags
    std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n'); // Discard characters until newline
}
