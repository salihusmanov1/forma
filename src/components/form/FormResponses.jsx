import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Icon } from "@iconify/react";
import { Link } from "react-router";
import { format } from "date-fns";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
} from "recharts";
import { useGetFormAnalyticsQuery } from "@/state/slices/forms/formApiSlice";
import { useEffect, useState } from "react";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
  label: {
    color: "#FFFFFF",
  },
};

function FormResponses({ form }) {
  const { data, isLoading } = useGetFormAnalyticsQuery({
    formId: form?.id,
    templateId: form?.template_id,
  });

  return (
    <div className="w-full sm:w-2/3 mx-auto h-full">
      <Card className="min-h-[420px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon icon="lucide:files" className="w-5 h-5" />
            Form responses
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* <div className="m-2 text-zinc-500 font-medium">
            ({responses.length}) responses
          </div> */}
          {/* <ul className="grid gap-2">
            {responses.map((response, index) => (
              <li
                key={index}
                className="grid grid-cols-3 bg-zinc-50 p-2 rounded-lg"
              >
                <div className="flex items-center col-span-2">
                  <Icon icon="lucide:mail" className="mr-2" />
                  <div>{response.respondent.email}</div>
                </div>
                <div className="flex items-center justify-end col-span-1">
                  <div>
                    {format(new Date(response.updatedAt), "dd/MM/yyyy H:m")}
                  </div>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link to="/dashboard" className="ml-4">
                          <Icon
                            icon="lucide:file-text"
                            className="text-blue-500"
                          />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View response</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </li>
            ))}
          </ul> */}
          <ul className="grid gap-6">
            {data?.questions.map((item, index) => (
              <li key={index}>
                <div className="mb-2">
                  <div className="font-medium">{item.question}</div>
                  <p className="text-sm text-zinc-500 font-medium ml-2">
                    {data.responsesCount} responses
                  </p>
                </div>
                {item.type !== "checkbox" ? (
                  <ul className="grid gap-2">
                    {item.answers.map((answer, answerIndex) => (
                      <li
                        key={answerIndex}
                        className="grid text-sm grid-cols-3 border bg-zinc-50 p-2 rounded-lg"
                      >
                        {answer.answer}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ChartContainer
                    config={chartConfig}
                    className="md:w-2/3 w-full"
                  >
                    <BarChart
                      accessibilityLayer
                      data={item.answers}
                      layout="vertical"
                      margin={{
                        right: 16,
                      }}
                    >
                      <CartesianGrid horizontal={false} />
                      <YAxis
                        dataKey="name"
                        type="category"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                        hide
                      />
                      <XAxis dataKey="count" type="number" hide />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="line" />}
                      />
                      <Bar
                        dataKey="count"
                        layout="vertical"
                        fill="var(--color-desktop)"
                        radius={4}
                        barSize={40}
                      >
                        <LabelList
                          dataKey="name"
                          position="insideLeft"
                          offset={8}
                          className="fill-[--color-label]"
                          fontSize={14}
                        />
                        <LabelList
                          dataKey="count"
                          position="right"
                          offset={8}
                          className="fill-foreground"
                          fontSize={12}
                        />
                      </Bar>
                    </BarChart>
                  </ChartContainer>
                )}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export default FormResponses;
