University Attendance Calculator
================================

This project provides a versatile University Attendance Calculator, developed to help students track their attendance for both theory and lab courses. It calculates the current attendance percentage and provides guidance on how many classes can be missed or must be attended to meet the standard 75% attendance requirement.

The project is available in multiple programming languages for the command-line interface and also as a modern, single-page web application.

🌟 Features
-----------

*   **Dual Calculator Modes**: Switch between "Theory Calculator" and "Lab Calculator".
    
*   **Current Percentage Calculation**: Instantly see your current attendance percentage for any course.
    
*   **Actionable Advice**:
    
    *   If attendance is **75% or higher**, the calculator shows how many classes you can skip while staying above the threshold.
        
    *   If attendance is **below 75%**, it calculates the number of consecutive classes required to reach the 75% mark.
        
*   **Lab Course Logic**: For lab courses, input is taken in "theory-equivalent hours," where 1 lab session equals 2 theory hours.
    
*   **Robust Error Handling**: The application gracefully handles invalid inputs such as non-numeric characters, negative numbers, and illogical data (e.g., attended classes exceeding total classes).
    

🚀 Implementations
------------------

This calculator has been implemented in several popular programming languages as well as a web interface.

### Command-Line Versions (CLI)

The core logic is available in C, C++, Java, Python, and R.

#### **How to Run:**

1.  **C / C++:**
    
    *   Compile the Main.c or Main.cpp file using a C/C++ compiler.
        
    *   Example (for C): gcc Main.c -o calculator -lm
        
    *   Run the compiled executable: ./calculator
        
2.  **Java:**
    
    *   Compile the Main.java file: javac Main.java
        
    *   Run the compiled class: java Main
        
3.  **Python:**
    
    *   Run the script directly using a Python interpreter: python main.py
        
4.  **R:**
    
    *   Run the script in an R environment: Rscript Main.r
        

### Web Version

A sleek, modern, and responsive single-page web application is also available.

#### **How to Use:**

1.  Open the index.html file in the Web Page directory in any modern web browser.
    
2.  Use the navigation bar to switch between the **Theory** and **Lab** calculators.
    
3.  Enter the required values and get instant feedback.
    

The web interface is designed with an intuitive UI and provides a visually appealing experience with advanced CSS styling.

📝 Problem Statement
--------------------

The goal was to develop an application that helps university students manage their attendance to meet a strict 75% requirement. The application needs to handle both standard theory lectures and practical lab sessions, which have different time equivalencies. The core functionality involves calculating skippable classes or classes needed based on established formulas.
