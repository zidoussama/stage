interface LoginResponse {
  // Customize this interface based on your backend's response
  token?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    // add more fields if needed
  };
}