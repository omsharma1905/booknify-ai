import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Mail, User } from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";
import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axiosinstance";
import { API_PATHS, BASE_URL } from "../utils/apiPath";

const ProfilePage = () => {

  const { user, updateUser, loading: authLoading } = useAuth();
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, email: user.email });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axiosInstance.put(API_PATHS.AUTH.UPDATE_PROFILE, {
        name: formData.name,
      });
      updateUser(response.data);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile.");
    } finally {
      setIsLoading(false);
    }
  };

  const memberSince = localStorage.getItem("memberSince");

  const formattedDate = memberSince
    ? new Date(memberSince).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    })
    : "—";

  if (!localStorage.getItem("memberSince")) {
    localStorage.setItem("memberSince", new Date().toISOString());
  }

  if (authLoading) {
    return <div>Loading Profile...</div>
  }

  const ebooksCount = localStorage.getItem("ebooksCount") || 0;

  return (
    <DashboardLayout activeMenu="profile">
      <div className="max-w-2xl mx-auto px-5">
        <h1 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 mt-10">Profile</h1>
        <p className="text-sm text-slate-600 mb-8">Manage your account details.</p>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8">
          <div className="flex items-center gap-6 mb-8">
            {/* Avatar */}
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-violet-600 flex items-center justify-center text-white text-2xl font-semibold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            </div>

            {/* Name & Email */}
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                {user?.name}
              </h2>
              <p className="text-sm text-slate-500">
                {user?.email}
              </p>
            </div>
          </div>
          <div className="mt-4 mb-8">
            <p className="text-xs text-slate-500 mb-1">
              Profile completion
            </p>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-violet-600 h-2 rounded-full w-full" />
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              label="Full Name"
              name="name"
              type="text"
              icon={User}
              value={formData.name}
              onChange={handleChange}
              required
            />
            <InputField
              label="Email"
              name="email"
              type="email"
              icon={Mail}
              value={formData.email}
              disabled
            />
            <div className="flex justify-center">
              <Button type="submit" isLoading={isLoading}>
                Save Changes
              </Button>
            </div>
          </form>
          <hr className="my-6 border-slate-200" />
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Account status</span>
              <span className="text-green-600 font-medium">Active</span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-slate-500">Login method</span>
              <span className="text-slate-700 font-medium">Email & Password</span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-slate-500">User ID</span>
              <span className="font-mono text-slate-700">
                {user?._id?.slice(0, 4)}••••••{user?._id?.slice(-4)}
              </span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-slate-500">Member since</span>
              <span className="text-slate-700 font-medium">
                {formattedDate}
              </span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-slate-500">Total eBooks</span>
              <span className="text-slate-700 font-medium">
                {ebooksCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ProfilePage;