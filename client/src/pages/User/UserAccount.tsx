import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

function UserAccount() {
  const user = useSelector((state: RootState) => state.users);

  return (
    <div className="h-screen w-screen flex flex-col items-center gap-16 p-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          {user.firstName + " " + user.lastName + "'s"} account
        </h2>
        <p className="text-muted-foreground">
          Here you can see and edit your personal information
        </p>
      </div>
      <div>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Personal Informations</CardTitle>
            <CardDescription>
              Personal informations of your Diary account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <p className="text-muted-foreground">
                  {user.firstName + " " + user.lastName}
                </p>
              </div>
              <Separator />
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Email</Label>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
              <Separator />
              <div className="flex flex-col space-y-1.5"></div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between"></CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default UserAccount;
