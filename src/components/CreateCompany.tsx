import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import usePost from "@/hooks/usePost";
import { Building2 } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export function CreateCompany({
    label,
    now,
}: {
    label: string;
    now?: boolean;
}) {
    const [isLogin, setLogin] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
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
    const { setUser, setLogged } = useAuth();

    const {
        mutate: companyLogin,
        isPending: logging,
        error: loginError,
    } = usePost("/auth/company", (data) => {
        setIsOpen(false);
        setLoginForm({
            email: "",
            password: "",
        });
        setLogged(true);
        setUser(data);
        localStorage.setItem("auth", JSON.stringify(data));
        navigate("/", { replace: true });
    });

    const { mutate, isPending, error } = usePost("/company", (data) => {
        setIsOpen(false);
        setFormData({
            name: "",
            description: "",
            username: "",
            email: "",
            password: "",
        });
        setLogged(true);
        setUser(data);
        localStorage.setItem("auth", JSON.stringify(data));
        navigate("/", { replace: true });
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
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <form>
                <>
                    <DialogTrigger asChild>
                        <Button
                            className="p-4"
                            size="lg"
                            style={{
                                background: now
                                    ? "white"
                                    : "linear-gradient(to right, #56c1f7, #2192ef, #189af0)",
                            }}
                        >
                            <Building2
                                className={`mr-2 h-5 w-5 ${
                                    now ? "text-[#189af0]" : "text-white"
                                } `}
                            />
                            <p
                                className={
                                    now
                                        ? "text-[#189af0] text-lg"
                                        : "text-white text-lg"
                                }
                            >
                                {label}
                            </p>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        {error && (
                            <span className="text-[red]">
                                {error?.response?.data ||
                                    "Something went wrong."}
                            </span>
                        )}
                        {loginError && (
                            <span className="text-[red]">
                                {loginError?.response?.data ||
                                    "Somethingn went wrong."}
                            </span>
                        )}
                        <DialogHeader>
                            <DialogTitle>
                                {isLogin ? "Login" : "Create New Company"}
                            </DialogTitle>
                        </DialogHeader>
                        {isLogin ? (
                            <div className="grid gap-4">
                                <div className="grid gap-3">
                                    <Label htmlFor="name-1">
                                        Email or Username
                                    </Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        placeholder="Email or username..."
                                        value={loginForm.email}
                                        onChange={handleLoginChange}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="name-1">Password</Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="Password..."
                                        value={loginForm.password}
                                        onChange={handleLoginChange}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                <div className="grid gap-3">
                                    <Label htmlFor="name-1">Name</Label>
                                    <Input
                                        id="name-1"
                                        name="name"
                                        placeholder="Name..."
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="grid gap-3">
                                    <Label htmlFor="username-1">Username</Label>
                                    <Input
                                        id="username"
                                        name="username"
                                        placeholder="Username"
                                        value={formData.username}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="email-1">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="password-1">Password</Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        placeholder="Password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="description-1">
                                        Description (Optional)
                                    </Label>
                                    <Input
                                        id="description"
                                        name="description"
                                        placeholder="Description"
                                        value={formData.description}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        )}
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            {isLogin ? (
                                <Button
                                    disabled={logging}
                                    type="submit"
                                    onClick={handleLoginSubmit}
                                    style={{
                                        background:
                                            "linear-gradient(to right, #56c1f7, #2192ef, #189af0)",
                                    }}
                                >
                                    {logging ? "Logging..." : "Login"}
                                </Button>
                            ) : (
                                <Button
                                    disabled={isPending}
                                    type="submit"
                                    onClick={handleSubmit}
                                    style={{
                                        background:
                                            "linear-gradient(to right, #56c1f7, #2192ef, #189af0)",
                                    }}
                                >
                                    {isPending ? "Creating..." : " Create"}
                                </Button>
                            )}
                        </DialogFooter>
                        <div className="flex flex-row items-center justify-center">
                            <span>
                                {isLogin
                                    ? "Not registered yet?"
                                    : "Already Registered?"}
                            </span>

                            <p
                                onClick={() => setLogin(!isLogin)}
                                className="text-[#109af0] font-medium ml-2 cursor-pointer"
                            >
                                {isLogin ? "Register" : "Login"}
                            </p>
                        </div>
                    </DialogContent>
                </>
            </form>
        </Dialog>
    );
}
