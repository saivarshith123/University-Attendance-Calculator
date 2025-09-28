import math

def calculate_theory_attendance():
    """Calculates and displays theory class attendance status."""
    print("\n--- Theory Attendance Calculator ---")
    
    try:
        total = int(input("Enter Total Classes Conducted: "))
        attended = int(input("Enter Classes You Attended: "))

        if total < 0 or attended < 0:
            print("\nError: Please enter valid, non-negative numbers.")
            return
        if attended > total:
            print("\nError: Attended classes cannot be greater than total classes.")
            return

        current_percentage = (attended / total) * 100 if total > 0 else 0
        print(f"\nYour current attendance is {math.floor(current_percentage)}%.")

        if current_percentage >= 75:
            skippable = math.floor((4 * attended / 3) - total)
            class_text = "class" if skippable == 1 else "classes"
            print(f"To maintain 75%, you can skip the next {skippable} {class_text}.")
        else:
            needed = (3 * total) - (4 * attended)
            class_text = "class" if needed == 1 else "classes"
            print(f"You must attend the next {needed} consecutive {class_text} to reach 75%.")

    except ValueError:
        print("\nError: Invalid input. Please enter whole numbers.")
    except Exception as e:
        print(f"\nAn unexpected error occurred: {e}")

def calculate_lab_attendance():
    """Calculates and displays lab attendance status."""
    print("\n--- Lab Attendance Calculator ---")
    print("Note: Enter hours as theory class equivalents (1 lab = 2 hours).")
    
    try:
        total_theory = int(input("Enter Total Theory-Equivalent Hours: "))
        attended_theory = int(input("Enter Theory-Equivalent Hours Attended: "))

        if total_theory < 0 or attended_theory < 0:
            print("\nError: Please enter valid, non-negative numbers.")
            return
        if total_theory % 2 != 0 or attended_theory % 2 != 0:
            print("\nError: Lab hour equivalents must be even numbers.")
            return
        if attended_theory > total_theory:
            print("\nError: Attended hours cannot be greater than total hours.")
            return

        total_labs = total_theory // 2
        attended_labs = attended_theory // 2
        
        current_percentage = (attended_labs / total_labs) * 100 if total_labs > 0 else 0
        print(f"\nYour current lab attendance is {math.floor(current_percentage)}%.")

        if current_percentage >= 75:
            skippable = math.floor((4 * attended_labs / 3) - total_labs)
            lab_text = "lab" if skippable == 1 else "labs"
            print(f"To maintain 75%, you can skip the next {skippable} {lab_text}.")
        else:
            needed = (3 * total_labs) - (4 * attended_labs)
            lab_text = "lab" if needed == 1 else "labs"
            print(f"You must attend the next {needed} consecutive {lab_text} to reach 75%.")

    except ValueError:
        print("\nError: Invalid input. Please enter whole numbers.")
    except Exception as e:
        print(f"\nAn unexpected error occurred: {e}")

def main():
    """Main function to run the attendance calculator."""
    while True:
        print("\nSelect calculator type:")
        print("1. Theory Calculator")
        print("2. Lab Calculator")
        print("3. Exit")
        
        choice = input("Enter your choice (1, 2, or 3): ")

        if choice == '1':
            calculate_theory_attendance()
        elif choice == '2':
            calculate_lab_attendance()
        elif choice == '3':
            print("Exiting program. Goodbye!")
            break
        else:
            print("\nInvalid choice. Please enter 1, 2, or 3.")

if __name__ == "__main__":
    main()
