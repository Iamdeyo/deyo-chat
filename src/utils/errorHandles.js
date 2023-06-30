// Map Firebase Auth error codes to user-friendly error messages
export function getErrorMessage(errorCode) {
  switch (errorCode) {
    case 'auth/user-not-found':
      return 'User not found. Please check your email or sign up for a new account.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/email-already-in-use':
      return 'The email address is already in use by another account.';
    case 'auth/weak-password':
      return 'The password is too weak. Please choose a stronger password.';
    case 'auth/invalid-email':
      return 'The email address is not valid. Please enter a valid email address.';
    // Add more error codes and messages as needed
    default:
      return 'An error occurred. Please try again later.';
  }
}
