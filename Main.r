# Function to handle theory attendance calculation
calculate_theory_attendance <- function() {
  cat("\n--- Theory Attendance Calculator ---\n")
  
  tryCatch({
    total_str <- readline(prompt = "Enter Total Classes Conducted: ")
    attended_str <- readline(prompt = "Enter Classes You Attended: ")
    
    # Convert input to integer, will be NA if invalid
    total <- as.integer(total_str)
    attended <- as.integer(attended_str)
    
    # Check for non-numeric or NA inputs
    if (is.na(total) || is.na(attended)) {
      stop("Invalid input. Please enter whole numbers.")
    }
    
    if (total < 0 || attended < 0) {
      cat("\nError: Please enter valid, non-negative numbers.\n")
      return()
    }
    if (attended > total) {
      cat("\nError: Attended classes cannot be greater than total classes.\n")
      return()
    }
    
    current_percentage <- if (total > 0) (attended / total) * 100 else 0
    cat(sprintf("\nYour current attendance is %d%%.\n", floor(current_percentage)))
    
    if (current_percentage >= 75) {
      skippable <- floor((4 * attended / 3) - total)
      class_text <- ifelse(skippable == 1, "class", "classes")
      cat(sprintf("To maintain 75%%, you can skip the next %d %s.\n", skippable, class_text))
    } else {
      needed <- (3 * total) - (4 * attended)
      class_text <- ifelse(needed == 1, "class", "classes")
      cat(sprintf("You must attend the next %d consecutive %s to reach 75%%.\n", needed, class_text))
    }
    
  }, error = function(e) {
    cat(sprintf("\nError: %s\n", e$message))
  })
}

# Function to handle lab attendance calculation
calculate_lab_attendance <- function() {
  cat("\n--- Lab Attendance Calculator ---\n")
  cat("Note: Enter hours as theory class equivalents (1 lab = 2 hours).\n")
  
  tryCatch({
    total_theory_str <- readline(prompt = "Enter Total Theory-Equivalent Hours: ")
    attended_theory_str <- readline(prompt = "Enter Theory-Equivalent Hours Attended: ")
    
    total_theory <- as.integer(total_theory_str)
    attended_theory <- as.integer(attended_theory_str)
    
    if (is.na(total_theory) || is.na(attended_theory)) {
      stop("Invalid input. Please enter whole numbers.")
    }

    if (total_theory < 0 || attended_theory < 0) {
      cat("\nError: Please enter valid, non-negative numbers.\n")
      return()
    }
    if (total_theory %% 2 != 0 || attended_theory %% 2 != 0) {
      cat("\nError: Lab hour equivalents must be even numbers.\n")
      return()
    }
    if (attended_theory > total_theory) {
      cat("\nError: Attended hours cannot be greater than total hours.\n")
      return()
    }
    
    total_labs <- total_theory %/% 2
    attended_labs <- attended_theory %/% 2
    
    current_percentage <- if (total_labs > 0) (attended_labs / total_labs) * 100 else 0
    cat(sprintf("\nYour current lab attendance is %d%%.\n", floor(current_percentage)))
    
    if (current_percentage >= 75) {
      skippable <- floor((4 * attended_labs / 3) - total_labs)
      lab_text <- ifelse(skippable == 1, "lab", "labs")
      cat(sprintf("To maintain 75%%, you can skip the next %d %s.\n", skippable, lab_text))
    } else {
      needed <- (3 * total_labs) - (4 * attended_labs)
      lab_text <- ifelse(needed == 1, "lab", "labs")
      cat(sprintf("You must attend the next %d consecutive %s to reach 75%%.\n", needed, lab_text))
    }
    
  }, error = function(e) {
    cat(sprintf("\nError: %s\n", e$message))
  })
}

# Main function to run the program
main <- function() {
  while (TRUE) {
    cat("\nSelect calculator type:\n")
    cat("1. Theory Calculator\n")
    cat("2. Lab Calculator\n")
    cat("3. Exit\n")
    
    choice <- readline(prompt = "Enter your choice (1, 2, or 3): ")
    
    if (choice == "1") {
      calculate_theory_attendance()
    } else if (choice == "2") {
      calculate_lab_attendance()
    } else if (choice == "3") {
      cat("Exiting program. Goodbye!\n")
      break
    } else {
      cat("\nInvalid choice. Please enter 1, 2, or 3.\n")
    }
  }
}

# Run the main function
main()
