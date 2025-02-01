import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { BookOpen, TrendingUp, PiggyBank, Shield } from "lucide-react";

export const EducationalResources = () => {
  const [courses, setCourses] = useState([]);

  // Fetch courses from the backend
  useEffect(() => {
    fetch("http://localhost:5000/api/learn")
        .then((response) => response.json())
        .then((data) => setCourses(data))
        .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  // Map icons based on the course icon name
  const getIcon = (iconName) => {
    switch (iconName) {
      case "BookOpen":
        return BookOpen;
      case "TrendingUp":
        return TrendingUp;
      case "PiggyBank":
        return PiggyBank;
      case "Shield":
        return Shield;
      default:
        return BookOpen;
    }
  };

  return (
      <Card className="p-6 bg-white shadow-lg h-[400px] animate-fadeIn">
        <h2 className="text-2xl font-semibold text-primary mb-4">Educational Resources</h2>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {courses.map((course, index) => {
              const Icon = getIcon(course.icon);
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
                            {course.title}
                          </h3>
                          <Badge variant={
                            course.level === "Beginner" ? "default" :
                                course.level === "Intermediate" ? "secondary" :
                                    "outline"
                          }>
                            {course.level}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm">{course.description}</p>
                        <Badge variant="outline" className="mt-2">
                          {course.category || "General"}
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