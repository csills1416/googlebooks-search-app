export const getMe = (token) => {
  if (!token) {
    throw new Error('No token provided');
  }

  return fetch('/api/users/me', {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  }).then(response => {
    if (!response.ok) {
      throw new Error('Failed to get user data');
    }
    return response;
  });
};

export const createUser = (userData) => {
  return fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  }).then(response => {
    if (!response.ok) {
      throw new Error('Failed to create user');
    }
    return response;
  });
};

export const loginUser = (userData) => {
  return fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  }).then(response => {
    if (!response.ok) {
      throw new Error('Login failed');
    }
    return response;
  });
};

export const saveBook = (bookData, token) => {
  if (!token) {
    throw new Error('No token provided');
  }

  return fetch('/api/users', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookData),
  }).then(response => {
    if (!response.ok) {
      throw new Error('Failed to save book');
    }
    return response;
  });
};

export const deleteBook = (bookId, token) => {
  if (!token) {
    throw new Error('No token provided');
  }

  return fetch(`/api/users/books/${bookId}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(response => {
    if (!response.ok) {
      throw new Error('Failed to delete book');
    }
    return response;
  });
};

export const searchGoogleBooks = (query) => {
  const encodedQuery = encodeURIComponent(query);
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodedQuery}`).then(response => {
    if (!response.ok) {
      throw new Error('Google Books search failed');
    }
    return response;
  });
};
