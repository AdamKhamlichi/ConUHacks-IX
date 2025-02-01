import { Header } from "@/components/Layout/Header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BookOpen, TrendingUp, PiggyBank, Shield, Play, Info } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Learn = () => {
  const { toast } = useToast();
  
  const courses = [
    {
      title: "Financial Basics",
      description: "Learn the fundamentals of personal finance",
      modules: 5,
      duration: "2 hours",
      level: "Beginner",
      icon: BookOpen,
      topics: [
        "Understanding Income and Expenses",
        "Basic Banking Concepts",
        "Introduction to Savings",
        "Managing Your Money",
        "Financial Goal Setting"
      ],
      prerequisites: "None"
    },
    {
      title: "Investment 101",
      description: "Understanding different investment options",
      modules: 8,
      duration: "4 hours",
      level: "Intermediate",
      icon: TrendingUp,
      topics: [
        "Types of Investments",
        "Risk and Return",
        "Portfolio Diversification",
        "Market Analysis Basics",
        "Investment Strategies"
      ],
      prerequisites: "Financial Basics"
    },
    {
      title: "Budgeting Mastery",
      description: "Master the art of budgeting and saving",
      modules: 6,
      duration: "3 hours",
      level: "Beginner",
      icon: PiggyBank,
      topics: [
        "Creating a Budget",
        "Tracking Expenses",
        "Saving Strategies",
        "Debt Management",
        "Emergency Funds"
      ],
      prerequisites: "None"
    },
    {
      title: "Risk Management",
      description: "Learn about insurance and protecting assets",
      modules: 7,
      duration: "3.5 hours",
      level: "Advanced",
      icon: Shield,
      topics: [
        "Types of Insurance",
        "Asset Protection",
        "Estate Planning Basics",
        "Risk Assessment",
        "Emergency Planning"
      ],
      prerequisites: "Financial Basics, Investment 101"
    },
  ];

  const handleStartCourse = (courseTitle: string) => {
    toast({
      title: "Course Started",
      description: `You've started the ${courseTitle} course. Good luck!`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-left mb-8">
            <h1 className="text-3xl font-semibold text-gray-900">Financial Education</h1>
            <p className="text-gray-500 mt-2">Expand your financial knowledge</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => {
              const Icon = course.icon;
              return (
                <Dialog key={index}>
                  <DialogTrigger asChild>
                    <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-primary mb-2">{course.title}</h3>
                          <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>{course.modules} modules</span>
                            <span>•</span>
                            <span>{course.duration}</span>
                          </div>
                          <Badge 
                            variant={
                              course.level === "Beginner" ? "default" :
                              course.level === "Intermediate" ? "secondary" :
                              "outline"
                            }
                            className="mt-3"
                          >
                            {course.level}
                          </Badge>
                        </div>
                      </div>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <Icon className="h-5 w-5" />
                        {course.title}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                          <Info className="h-4 w-4" /> Course Overview
                        </h4>
                        <p className="text-sm text-gray-600">{course.description}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold mb-2">Topics Covered</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {course.topics.map((topic, i) => (
                            <li key={i}>{topic}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-medium">{course.duration}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Level:</span>
                          <Badge variant={
                            course.level === "Beginner" ? "default" :
                            course.level === "Intermediate" ? "secondary" :
                            "outline"
                          }>
                            {course.level}
                          </Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Prerequisites:</span>
                          <span className="font-medium">{course.prerequisites}</span>
                        </div>
                      </div>
                      <Button 
                        className="w-full" 
                        onClick={() => handleStartCourse(course.title)}
                      >
                        <Play className="h-4 w-4" /> Start Course
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Learn;