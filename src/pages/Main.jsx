import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router";

export default function Main() {
  const navigate = useNavigate();

  const navigateTo = () => {
    navigate("/form", { state: { from: window.location.pathname } });
  };

  const cards = [
    {
      id: 1,
      image: "https://picsum.photos/350/128?random=1",
      title: "Template 1",
      description: "Deploy your new project in one-click.",
      creator: "Created by Alice",
    },
    {
      id: 2,
      image: "https://picsum.photos/350/128?random=2",
      title: "Template 2",
      description: "Build faster with this template.",
      creator: "Created by Bob",
    },
    {
      id: 3,
      image: "https://picsum.photos/350/128?random=3",
      title: "Template 3",
      description: "A simple and elegant solution.",
      creator: "Created by Charlie",
    },
    {
      id: 4,
      image: "https://picsum.photos/350/128?random=4",
      title: "Template 4",
      description: "A simple and elegant solution.",
      creator: "Created by Charlie",
    },
  ];

  return (
    <div className=" mx-auto p-10 lg:p-20">
      <div className="flex gap-2 w-full lg:w-1/2 mx-auto">
        <Input type="text" placeholder="Search in All Form Templates"></Input>
        <Button className="bg-gray-600 hover:bg-gray-500">
          <Icon icon="lucide:search" />
        </Button>
      </div>
      <div className="my-5 flex justify-end">
        <Button className="bg-blue-600 hover:bg-blue-500" onClick={navigateTo}>
          <Icon icon="lucide:plus" /> Create Template
        </Button>
      </div>
      <div className="my-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card key={card.id} className="w-full max-w-sm mx-auto">
            <CardContent className="p-2 grid gap-4">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-32 object-cover"
              />
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
              <div className="text-sm italic">{card.creator}</div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2 items-start mt-2 p-2">
              <Button
                variant="outline"
                className="w-full border-blue-700 hover:bg-blue-600 text-blue-700 hover:text-white"
              >
                Use this template
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
