// setupTests.js
import '@testing-library/jest-dom';

// Clear localStorage before EVERY test
beforeEach(() => {
  localStorage.clear();
});