import { Header } from "@/components/Layout/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { MoreVertical, Plus, Trash } from "lucide-react";
import {useEffect, useState} from "react";

const Goals = () => {
  const [goals, setGoals] = useState([]);

    // Fetch goals from the backend
    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/goals");
                if (!response.ok) throw new Error("Failed to fetch goals");

                const data = await response.json();
                setGoals(data);
            } catch (error) {
                console.error("Error fetching goals:", error);
            }
        };

        fetchGoals();
    }, []);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isProgressDialogOpen, setIsProgressDialogOpen] = useState(false);
  const [selectedGoalIndex, setSelectedGoalIndex] = useState<number | null>(null);
  const [newGoal, setNewGoal] = useState({
    name: "",
    target: "",
    current: "",
    category: ""
  });
  const [progressAmount, setProgressAmount] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const goalData = {
      name: newGoal.name,
      target: Number(newGoal.target),
      current: Number(newGoal.current),
      category: newGoal.category,
    };

    try {
      const response = await fetch("http://localhost:5000/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(goalData),
      });

      if (!response.ok) {
        throw new Error("Failed to add goal");
      }

      const addedGoal = await response.json();
      setGoals([...goals, addedGoal]); // Update the goals list
      setIsDialogOpen(false); // Close the dialog
      setNewGoal({ name: "", target: "", current: "", category: "" }); // Reset the form
      toast({
        title: "Goal Created",
        description: "Your new financial goal has been added successfully.",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to add goal. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteGoal = (index: number) => {
    const updatedGoals = goals.filter((_, i) => i !== index);
    setGoals(updatedGoals);
    toast({
      title: "Goal Deleted",
      description: "Your financial goal has been deleted.",
    });
  };

  const handleAddProgress = (index: number) => {
    setSelectedGoalIndex(index);
    setIsProgressDialogOpen(true);
  };

  const handleProgressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedGoalIndex === null) return;

    const updatedGoals = [...goals];
    const goal = updatedGoals[selectedGoalIndex];
    goal.current = Math.min(goal.current + Number(progressAmount), goal.target);
    
    setGoals(updatedGoals);
    setIsProgressDialogOpen(false);
    setProgressAmount("");
    setSelectedGoalIndex(null);

    toast({
      title: "Progress Added",
      description: "Your progress has been updated successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900">Financial Goals</h1>
              <p className="text-gray-500 mt-2">Track and manage your financial goals</p>
            </div>
            <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Goal
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {goals.map((goal, index) => (
              <Card key={index} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-primary">{goal.name}</h3>
                    <span className="text-sm text-gray-500">{goal.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-primary">
                      ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="p-2 hover:bg-gray-100 rounded-full">
                        <MoreVertical className="h-4 w-4 text-gray-500" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleAddProgress(index)}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Progress
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDeleteGoal(index)}
                          className="text-red-600"
                        >
                          <Trash className="h-4 w-4 mr-2" />
                          Delete Goal
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <Progress value={(goal.current / goal.target) * 100} className="h-2" />
                <p className="text-sm text-gray-600 mt-2">
                  {((goal.current / goal.target) * 100).toFixed(1)}% complete
                </p>
              </Card>
            ))}
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Goal</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Goal Name</Label>
                  <Input
                    id="name"
                    value={newGoal.name}
                    onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                    placeholder="e.g., Emergency Fund"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={newGoal.category}
                    onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                    placeholder="e.g., Savings"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="target">Target Amount ($)</Label>
                  <Input
                    id="target"
                    type="number"
                    value={newGoal.target}
                    onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                    placeholder="10000"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="current">Current Amount ($)</Label>
                  <Input
                    id="current"
                    type="number"
                    value={newGoal.current}
                    onChange={(e) => setNewGoal({ ...newGoal, current: e.target.value })}
                    placeholder="0"
                    required
                  />
                </div>
                <DialogFooter>
                  <Button type="submit">Create Goal</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={isProgressDialogOpen} onOpenChange={setIsProgressDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Progress</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleProgressSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="progress">Amount to Add ($)</Label>
                  <Input
                    id="progress"
                    type="number"
                    value={progressAmount}
                    onChange={(e) => setProgressAmount(e.target.value)}
                    placeholder="Enter amount"
                    required
                  />
                </div>
                <DialogFooter>
                  <Button type="submit">Add Progress</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  );
};

export default Goals;
