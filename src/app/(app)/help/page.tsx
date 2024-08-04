import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function HelpPage() {
  return (
    <div>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
            quibusdam repellendus non reprehenderit totam quaerat adipisci
            quisquam, at culpa fugit, fuga consequuntur! Vitae eligendi et
            consectetur sequi a quisquam soluta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
          quibusdam repellendus non reprehenderit totam quaerat adipisci
          quisquam, at culpa fugit, fuga consequuntur! Vitae eligendi et
          consectetur sequi a quisquam soluta.
        </CardContent>
      </Card>
    </div>
  );
}
