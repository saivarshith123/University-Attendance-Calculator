import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Select calculator type:");
        System.out.println("1. Theory Calculator");
        System.out.println("2. Lab Calculator");
        System.out.print("Enter your choice (1 or 2): ");

        int choice = scanner.nextInt();

        if (choice == 1) {
            calculateTheoryAttendance(scanner);
        } else if (choice == 2) {
            calculateLabAttendance(scanner);
        } else {
            System.out.println("Invalid choice. Please run the program again and select 1 or 2.");
        }

        scanner.close();
    }

    public static void calculateTheoryAttendance(Scanner scanner) {
        System.out.println("\n--- Theory Attendance Calculator ---");

        try {
            System.out.print("Enter Total Classes Conducted: ");
            int total = scanner.nextInt();

            System.out.print("Enter Classes You Attended: ");
            int attended = scanner.nextInt();

            if (total < 0 || attended < 0) {
                System.out.println("\nError: Please enter valid, non-negative numbers.");
                return;
            }
            if (attended > total) {
                System.out.println("\nError: Attended classes cannot be greater than total classes.");
                return;
            }

            double currentPercentage = (total > 0) ? ((double) attended / total) * 100 : 0;
            System.out.printf("\nYour current attendance is %.0f%%.%n", Math.floor(currentPercentage));

            if (currentPercentage >= 75) {
                int skippable = (int) Math.floor((4.0 * attended / 3.0) - total);
                String classText = (skippable == 1) ? "class" : "classes";
                System.out.printf("To maintain 75%%, you can skip the next %d %s.%n", skippable, classText);
            } else {
                int needed = (3 * total) - (4 * attended);
                String classText = (needed == 1) ? "class" : "classes";
                System.out.printf("You must attend the next %d consecutive %s to reach 75%%.%n", needed, classText);
            }

        } catch (Exception e) {
            System.out.println("\nError: Invalid input. Please enter whole numbers.");
        }
    }

    public static void calculateLabAttendance(Scanner scanner) {
        System.out.println("\n--- Lab Attendance Calculator ---");
        System.out.println("Note: Enter hours as theory class equivalents (1 lab = 2 hours).");

        try {
            System.out.print("Enter Total Theory-Equivalent Hours: ");
            int totalTheory = scanner.nextInt();

            System.out.print("Enter Theory-Equivalent Hours Attended: ");
            int attendedTheory = scanner.nextInt();

            if (totalTheory < 0 || attendedTheory < 0) {
                System.out.println("\nError: Please enter valid, non-negative numbers.");
                return;
            }
            if (totalTheory % 2 != 0 || attendedTheory % 2 != 0) {
                System.out.println("\nError: Lab hour equivalents must be even numbers.");
                return;
            }
            if (attendedTheory > totalTheory) {
                System.out.println("\nError: Attended hours cannot be greater than total hours.");
                return;
            }

            int totalLabs = totalTheory / 2;
            int attendedLabs = attendedTheory / 2;

            double currentPercentage = (totalLabs > 0) ? ((double) attendedLabs / totalLabs) * 100 : 0;
            System.out.printf("\nYour current lab attendance is %.0f%%.%n", Math.floor(currentPercentage));

            if (currentPercentage >= 75) {
                int skippable = (int) Math.floor((4.0 * attendedLabs / 3.0) - totalLabs);
                String labText = (skippable == 1) ? "lab" : "labs";
                System.out.printf("To maintain 75%%, you can skip the next %d %s.%n", skippable, labText);
            } else {
                int needed = (3 * totalLabs) - (4 * attendedLabs);
                String labText = (needed == 1) ? "lab" : "labs";
                System.out.printf("You must attend the next %d consecutive %s to reach 75%%.%n", needed, labText);
            }

        } catch (Exception e) {
            System.out.println("\nError: Invalid input. Please enter whole numbers.");
        }
    }
}
