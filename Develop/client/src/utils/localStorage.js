// Retrieve saved book IDs from localStorage
export const getSavedBookIds = () => {
  try {
    const savedBookIds = localStorage.getItem('saved_books');
    return savedBookIds ? JSON.parse(savedBookIds) : [];
  } catch (err) {
    console.error('Error getting saved book IDs:', err);
    return [];
  }
};

// Save book IDs array to localStorage or remove if the array is empty
export const saveBookIds = (bookIdArr) => {
  try {
    if (bookIdArr.length) {
      localStorage.setItem('saved_books', JSON.stringify(bookIdArr));
    } else {
      localStorage.removeItem('saved_books');
    }
  } catch (err) {
    console.error('Error saving book IDs:', err);
  }
};

// Remove a specific book ID from saved book IDs in localStorage
export const removeBookId = (bookId) => {
  try {
    const savedBookIds = getSavedBookIds();

    if (!savedBookIds.length) {
      return false;
    }

    const updatedSavedBookIds = savedBookIds.filter(savedBookId => savedBookId !== bookId);
    localStorage.setItem('saved_books', JSON.stringify(updatedSavedBookIds));

    return true;
  } catch (err) {
    console.error('Error removing book ID:', err);
    return false;
  }
};
