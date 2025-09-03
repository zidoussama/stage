import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie'



const useRegister = () => {
  const [formData, setFormData] = useState<{ firstname: string; lastname: string; phonenumber: string; email: string; password: string }>({ firstname: "", lastname: "", phonenumber: "", email: "", password: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleRegister = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post<LoginResponse>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
        formData
      );

      if (response.data.token) {
        Cookies.set("token", response.data.token);
      }

      router.push("/");
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>;
      const errorMessage =
        axiosError.response?.data?.message || "registration failed";
      setError(errorMessage);
      console.error("Registration failed:", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    handleRegister,
    loading,
    error,
  };
};

export default useRegister;
