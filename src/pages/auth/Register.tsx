import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import usePost from "@/hooks/usePost";
import { Building2 } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";

export function RegisterPage() {
    const [isLogin, setLogin] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        username: "",
        email: "",
        password: "",
    });
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const { setLogged, setToken } = useAuth();

    const {
        mutate: companyLogin,
        isPending: logging,
        error: loginError,
    } = usePost("/auth/company", (data) => {
        setLoginForm({
            email: "",
            password: "",
        });
        setLogged(true);
        setToken(data);
        localStorage.setItem("attendance_auth", JSON.stringify(data));
        navigate("/", { replace: true });
    });

    const { mutate, isPending, error } = usePost("/company", (data) => {
        setFormData({
            name: "",
            description: "",
            username: "",
            email: "",
            password: "",
        });
        setLogged(true);

        setToken(data);
        localStorage.setItem("attendance_auth", JSON.stringify(data));
        // navigate("/auth/payment", { replace: true });
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (
            !formData.email ||
            !formData.username ||
            !formData.name ||
            !formData.password
        )
            return;
        mutate({
            name: formData.name,
            description: formData.description,
            username: formData.username,
            email: formData.email,
            password: formData.password,
        });
    };

    const handleLoginSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!loginForm.email || !loginForm.password) return;
        companyLogin({
            email: loginForm.email,
            password: loginForm.password,
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full space-y-8 bg-white/20 backdrop-blur-md p-8 rounded-lg shadow-md">
                <div className="flex flex-col items-center">
                    <Building2 className="h-14 w-14 text-[#189af0] mb-4" />
                    <h2 className="text-3xl font-bold text-center text-gray-900">
                        {isLogin ? "Company Login" : "Create New Company"}
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        {isLogin
                            ? "Sign in to your company account"
                            : "Get started with your company account"}
                    </p>
                </div>

                {/* Error Messages */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-md p-4">
                        <span className="text-red-600 text-sm">
                            {error?.response?.data || "Something went wrong."}
                        </span>
                    </div>
                )}
                {loginError && (
                    <div className="bg-red-50 border border-red-200 rounded-md p-4">
                        <span className="text-red-600 text-sm">
                            {loginError?.response?.data ||
                                "Something went wrong."}
                        </span>
                    </div>
                )}

                <form onSubmit={isLogin ? handleLoginSubmit : handleSubmit}>
                    {isLogin ? (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label
                                    htmlFor="email"
                                    className="text-sm font-medium"
                                >
                                    Email or Username
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    placeholder="Email or username..."
                                    value={loginForm.email}
                                    onChange={handleLoginChange}
                                    className="w-full"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label
                                    htmlFor="password"
                                    className="text-sm font-medium"
                                >
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Password..."
                                    value={loginForm.password}
                                    onChange={handleLoginChange}
                                    className="w-full"
                                    required
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label
                                    htmlFor="name"
                                    className="text-sm font-medium"
                                >
                                    Company Name
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="Company name..."
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label
                                    htmlFor="username"
                                    className="text-sm font-medium"
                                >
                                    Username
                                </Label>
                                <Input
                                    id="username"
                                    name="username"
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label
                                    htmlFor="email"
                                    className="text-sm font-medium"
                                >
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label
                                    htmlFor="password"
                                    className="text-sm font-medium"
                                >
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label
                                    htmlFor="description"
                                    className="text-sm font-medium"
                                >
                                    Description (Optional)
                                </Label>
                                <Input
                                    id="description"
                                    name="description"
                                    placeholder="Company description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full"
                                />
                            </div>
                        </div>
                    )}

                    <div className="mt-6">
                        <Button
                            type="submit"
                            disabled={isLogin ? logging : isPending}
                            className="w-full py-2 px-4"
                            style={{
                                background:
                                    "linear-gradient(to right, #56c1f7, #2192ef, #189af0)",
                            }}
                        >
                            {isLogin
                                ? logging
                                    ? "Logging in..."
                                    : "Login"
                                : isPending
                                ? "Creating Account..."
                                : "Create Account"}
                        </Button>
                    </div>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        {isLogin
                            ? "Don't have an account?"
                            : "Already have an account?"}
                        <button
                            type="button"
                            onClick={() => setLogin(!isLogin)}
                            className="ml-2 text-[#109af0] font-medium hover:text-[#0d8bd8] transition-colors"
                        >
                            {isLogin ? "Create one here" : "Login here"}
                        </button>
                    </p>
                </div>

                {/* Optional: Back to home link */}
                <div className="mt-4 text-center">
                    <Link
                        to="/"
                        className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        ← Back to home
                    </Link>
                </div>
            </div>
        </div>
    );
}
