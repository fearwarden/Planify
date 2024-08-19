import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {AlertCircle, Terminal} from "lucide-react"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import {LOGIN} from "@/constants/constants.ts";
import {useEffect, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {register} from "@/api/auth/auth.ts";
import {RegisterDataType} from "@/types/AuthenticationTypes.ts";
import {RegisterSchema} from "@/validation/schemas.ts";

function RegisterForm() {
    const [email, setEmail] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirm, setPasswordConfirm] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [registerSuccess, setRegisterSuccess] = useState<boolean>();

    const registerMutation = useMutation({
        mutationFn: register,
        onError: (error) => {
            const statusCode = error.message.split(" ")[error.message.split(" ").length - 1];
            if (parseInt(statusCode) === 400 || parseInt(statusCode) === 404) {
                setErrorMessage("Invalid data, please fill form again.");
            } else if (parseInt(statusCode) === 409) {
              setErrorMessage("Email already exists.")
            } else {
                setErrorMessage("Something went wrong, please try again.")
            }
        },
        onSuccess: () => {
            setRegisterSuccess(true);
        }
    })

    async function handleRegister() {
        const registerData: RegisterDataType = {
            email,
            firstName,
            lastName,
            password,
            confirmationPassword: passwordConfirm
        }
        const validation = RegisterSchema.safeParse(registerData);
        if (!validation.success) {
            setErrorMessage(
                JSON.parse(
                    validation.error.message
                        .slice(validation.error.message.search("message"))
                        .split(":")[1]
                        .split(",")[0]
                )
            )
            return;
        }
        registerMutation.mutate(validation.data);
    }

    useEffect(() => {
        setTimeout(() => {
            setErrorMessage("");
        }, 10000);
    });

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-xl">Sign Up</CardTitle>
                {registerSuccess &&
                    <Alert>
                        <Terminal className="h-4 w-4" />
                        <AlertTitle>Register successful!</AlertTitle>
                        <AlertDescription>
                            You can login <Link to={LOGIN} className="underline">here.</Link>
                        </AlertDescription>
                    </Alert>
                    // <div>Register successful, go to login <Link className="underline" to={LOGIN}>here.</Link></div>
                }
                <CardDescription>
                    Enter your information to create an account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="first-name">First name</Label>
                            <Input id="first-name"
                                   value={firstName}
                                   onChange={e => setFirstName(e.target.value)}
                                   placeholder="John" required/>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="last-name">Last name</Label>
                            <Input
                                id="last-name"
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                                placeholder="Doe" required/>
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="example@example.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="confirmation-password">Confirmation Password</Label>
                        <Input
                            id="confirmation-password"
                            type="password"
                            value={passwordConfirm}
                            onChange={e => setPasswordConfirm(e.target.value)}
                        />
                    </div>
                    <Button type="submit" className="w-full" onClick={handleRegister}>
                        Create an account
                    </Button>
                    {errorMessage && <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Oops!</AlertTitle>
                        <AlertDescription>
                            {errorMessage}.
                        </AlertDescription>
                    </Alert>}
                </div>
                <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link to={LOGIN} className="underline">
                        Sign in
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}

export default RegisterForm;