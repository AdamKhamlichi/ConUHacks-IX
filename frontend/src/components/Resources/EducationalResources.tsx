import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { BookOpen, TrendingUp, PiggyBank, Shield } from "lucide-react";

const resources = [
  {
    title: "Understanding Credit Scores",
    description: "Learn how credit scores work and how to improve yours.",
    category: "Credit",
    icon: Shield,
    difficulty: "Beginner",
  },
  {
    title: "Investment Basics",
    description: "Get started with investing and understand different options.",
    category: "Investing",
    icon: TrendingUp,
    difficulty: "Intermediate",
  },
  {
    title: "Budgeting 101",
    description: "Master the basics of creating and maintaining a budget.",
    category: "Budgeting",
    icon: PiggyBank,
    difficulty: "Beginner",
  },
  {
    title: "Advanced Investment Strategies",
    description: "Learn about portfolio diversification and risk management.",
    category: "Investing",
    icon: BookOpen,
    difficulty: "Advanced",
  },
];

export const EducationalResources = () => {
  return (
    <Card className="p-6 bg-white shadow-lg h-[400px] animate-fadeIn">
      <h2 className="text-2xl font-semibold text-primary mb-4">Educational Resources</h2>
      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-4">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <Card 
                key={index} 
                className="p-4 hover:bg-accent/5 transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-lg text-primary">
                        {resource.title}
                      </h3>
                      <Badge variant={
                        resource.difficulty === "Beginner" ? "default" :
                        resource.difficulty === "Intermediate" ? "secondary" :
                        "outline"
                      }>
                        {resource.difficulty}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm">{resource.description}</p>
                    <Badge variant="outline" className="mt-2">
                      {resource.category}
                    </Badge>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </ScrollArea>
    </Card>
  );
};