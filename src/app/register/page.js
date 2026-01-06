"use client";
import { useAuth } from "@/context/AuthUserContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Register.module.css"
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { getAuth } from "firebase/auth";
import { motion } from "framer-motion";

export default function Register() {
  const { authUser, loading, signInWithGoogle, signUpWithEmail, signOutUser } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: { day: "", month: "", year: "" },
  });

  const [isDisabled, setDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1); // mobile only

  const router = useRouter();

  useEffect(() => {
    async function check() {
      if (authUser) {
        const token = await authUser.getIdToken(true);
        try {
          const response = await axios.post('/api/register', {}, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (response.data.success) {
            if (response.data.role == 'user') router.replace("/store");
            if (response.data.role == 'admin') router.replace("/admin");
          }
          return true;
        } catch (e) {
          console.error(e);
          return false;
        }
      }
    }
    check();
  }, [authUser, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error("All fields are required!");
      setDisabled(false);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      setDisabled(false);
      return;
    }

    const dobString = `${formData.dob.year}-${formData.dob.month}-${formData.dob.day}`;

    try {
      const auth = getAuth();
      const userCredential = await signUpWithEmail(formData.email, formData.password);
      const token = await userCredential.user.getIdToken();
      

      const response = await axios.post(
        "/api/register",
        {
          name: formData.name,
          email: formData.email,
          dob: dobString
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        toast.success("Registered successfully!");
        router.push("/login");
      } else toast.error(response.data.message || "Registration failed");
    } catch (err) {
      console.error(err);
      toast.error("Registration failed");
    } finally {
      setDisabled(false);
    }
  };

  if (loading) return <>Loading...</>;

  return (
    <div className={`p-4 md:p-10 bg-muted ${styles.background} text-white min-h-svh flex flex-col items-center justify-center overflow-x-hidden`}>
      <motion.div
        initial={{ opacity: 0, x: -140 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-full"
      >
        <h1 className="font-bold text-5xl md:text-6xl text-grad race mt-16 p-2 text-center md:text-left">Register</h1>
      </motion.div>

      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-full md:max-w-4xl flex flex-col gap-8 p-4 md:p-10 ${styles.glassCard}`}
      >
        {/* ===== Desktop (all fields at once) ===== */}
        <div className="hidden md:flex gap-10 justify-between flex-wrap">
          {/* left */}
          <div className="flex flex-col gap-6 flex-1 min-w-[250px]">
            {/* Name */}
            <div className="flex flex-col gap-2 text-xl">
              <label>Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="p-2 border-2 rounded-lg text-white bg-transparent focus:outline-none focus:border-teal-600"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2 text-xl">
              <label>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="p-2 border-2 rounded-lg text-white bg-transparent focus:outline-none focus:border-teal-600"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2 text-xl w-full">
              <label>Password</label>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="p-2 pr-10 border-2 rounded-lg text-white w-full bg-transparent focus:outline-none focus:border-teal-600"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          </div>

          {/* right */}
          <div className="flex flex-col gap-6 flex-1 min-w-[250px]">
            {/* DOB */}
            <div className="flex flex-col gap-2 text-xl">
              <label>Date of Birth</label>
              <div className="flex gap-3 flex-wrap">
                {["day", "month", "year"].map((f) => (
                  <input
                    key={f}
                    type="text"
                    maxLength={f === "year" ? 4 : 2}
                    placeholder={f === "day" ? "DD" : f === "month" ? "MM" : "YYYY"}
                    value={formData.dob[f]}
                    onChange={(e) =>
                      setFormData({ ...formData, dob: { ...formData.dob, [f]: e.target.value } })
                    }
                    className="w-20 p-2 border-2 rounded-lg text-white bg-transparent outline-none focus:border-teal-600"
                    required
                  />
                ))}
              </div>
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-2 text-xl w-full">
              <label>Confirm Password</label>
              <div className="relative w-full">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="p-2 pr-10 border-2 rounded-lg text-white w-full bg-transparent focus:outline-none focus:border-teal-600"
                  placeholder="Confirm password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Mobile Steps ===== */}
        <div className="flex flex-col gap-6 md:hidden">
          {step === 1 && (
            <>
              {/* Name, Email, Password */}
              {["name", "email", "password"].map((field) => (
                <div key={field} className="flex flex-col gap-2 text-xl w-full">
                  <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <div className={field === "password" ? "relative" : ""}>
                    <input
                      type={field === "password" ? (showPassword ? "text" : "password") : field === "email" ? "email" : "text"}
                      value={formData[field]}
                      onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                      className="p-2 border-2 rounded-lg text-white w-full bg-transparent focus:outline-none focus:border-teal-600"
                      placeholder={`Enter your ${field}`}
                      required
                    />
                    {field === "password" && (
                      <button
                        type="button"
                        onClick={() => setShowPassword((s) => !s)}
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <button type="button" onClick={() => setStep(2)} className={`${styles.btn} self-center`}>
                Next
              </button>
            </>
          )}

          {step === 2 && (
            <>
              {/* DOB & Confirm Password */}
              <div className="flex flex-col gap-2 text-xl w-full">
                <label>Date of Birth</label>
                <div className="flex gap-3 flex-wrap">
                  {["day", "month", "year"].map((f) => (
                    <input
                      key={f}
                      type="text"
                      maxLength={f === "year" ? 4 : 2}
                      placeholder={f === "day" ? "DD" : f === "month" ? "MM" : "YYYY"}
                      value={formData.dob[f]}
                      onChange={(e) =>
                        setFormData({ ...formData, dob: { ...formData.dob, [f]: e.target.value } })
                      }
                      className="w-20 p-2 border-2 rounded-lg text-white bg-transparent outline-none focus:border-teal-600"
                      required
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2 text-xl w-full relative">
                <label>Confirm Password</label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="p-2 pr-10 border-2 rounded-lg text-white w-full bg-transparent focus:outline-none focus:border-teal-600"
                  placeholder="Confirm password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((s) => !s)}
                  className="absolute right-2 top-1/2 translate-y-1/2"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="flex flex-col gap-4">
                <button type="submit" disabled={isDisabled} className={`${styles.btn} ${isDisabled && "opacity-50"} mx-auto`}>
                  {isDisabled ? "Registering..." : "Register"}
                </button>
                <button type="button" onClick={() => setStep(1)} className="underline text-center">
                  Back
                </button>
              </div>
            </>
          )}
        </div>

        {/* Desktop Submit */}
        <button
          type="submit"
          disabled={isDisabled}
          className={`hidden md:block mx-auto ${styles.btn} ${isDisabled && "opacity-50"}`}
        >
          {isDisabled ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
