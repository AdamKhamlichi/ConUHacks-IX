import {useEffect, useState} from "react";
import {Header} from "@/components/Layout/Header";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import {Progress} from "@/components/ui/progress";
import {useToast} from "@/components/ui/use-toast";
import {AlertCircle, TrendingUp} from "lucide-react";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

const Future = () => {
    const {toast} = useToast();
    const [retirementData, setRetirementData] = useState({
        retirementGoal: 0,
        currentSavings: 0,
        monthlyContribution: 0,
        yearsToRetirement: 0,
        monthlyIncome: 0,
        monthlyExpenses: 0,
        milestones: [],
        savingsRate: 0,
        predictedRetirementAge: 0,
        predictedSavings: 0,
        projectionData: []
    });

    useEffect(() => {
        fetchRetirementData();
    }, []);

    const calculateProjections = (retirementData) => {
        const { currentSavings, monthlyContribution, yearsToRetirement, monthlyIncome, monthlyExpenses } = retirementData;

        const savingsRate = ((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100;
        const predictedRetirementAge = 65;
        const predictedSavings = currentSavings + monthlyContribution * 12 * yearsToRetirement;

        const projectionData = [];
        for (let i = 0; i <= yearsToRetirement; i += 5) {
            const year = new Date().getFullYear() + i;
            const conservative = currentSavings + monthlyContribution * 12 * i;
            const optimistic = conservative * 1.2;
            projectionData.push({ year, conservative, optimistic });
        }

        return {
            savingsRate,
            predictedRetirementAge,
            predictedSavings,
            projectionData,
        };
    };

    const fetchRetirementData = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/retirement");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            const projections = calculateProjections(data);
            setRetirementData({
                ...data,  // Include other data fetched from the backend
                ...projections,  // Include the projections data (savingsRate, predictedRetirementAge, etc.)
            });
        } catch (err) {
            console.error("Error fetching retirement data:", err);
            toast({
                title: "Error",
                description: "Failed to fetch retirement data. Please try again later.",
                variant: "destructive",
            });
        }
    };

    const handleUpdateRetirement = async (updatedData) => {
        try {
            const response = await fetch("http://localhost:5000/api/retirement", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(updatedData),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setRetirementData(data);
            toast({
                title: "Success",
                description: "Retirement data updated successfully.",
            });
        } catch (err) {
            console.error("Error updating retirement data:", err);
            toast({
                title: "Error",
                description: "Failed to update retirement data. Please try again later.",
                variant: "destructive",
            });
        }
    };

    const handleRefreshPrediction = () => {
        fetchRetirementData();
    };

    // Helper function to safely format numbers
    const formatNumber = (value, decimals = 1) => {
        return typeof value === 'number' ? value.toFixed(decimals) : '0';
    };

    // Helper function to safely calculate percentage
    const calculatePercentage = (current, target) => {
        if (!target || target === 0) return 0;
        return (current / target) * 100;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header/>
            <main className="py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-left mb-8">
                        <h1 className="text-3xl font-semibold text-gray-900">Retirement Planning</h1>
                        <p className="text-gray-500 mt-2">Plan and track your retirement goals</p>
                    </div>

                    <Card className="p-6 mb-8">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-2xl font-semibold text-primary mb-2">AI Retirement Forecast</h2>
                                <p className="text-gray-600">Based on your current financial patterns</p>
                            </div>
                            <Button onClick={handleRefreshPrediction} variant="outline" className="gap-2">
                                <TrendingUp className="h-4 w-4"/>
                                Refresh Prediction
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <TrendingUp className="h-5 w-5 text-emerald-500"/>
                                    <span className="font-medium">Monthly Savings Rate</span>
                                </div>
                                <p className="text-2xl font-bold text-primary">
                                    {formatNumber(retirementData.savingsRate)}%
                                </p>
                                <p className="text-sm text-gray-600">of monthly income</p>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <AlertCircle className="h-5 w-5 text-blue-500"/>
                                    <span className="font-medium">Predicted Retirement Age</span>
                                </div>
                                <p className="text-2xl font-bold text-primary">
                                    {retirementData.predictedRetirementAge || 0}
                                </p>
                                <p className="text-sm text-gray-600">based on current savings</p>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <TrendingUp className="h-5 w-5 text-emerald-500"/>
                                    <span className="font-medium">Predicted Savings</span>
                                </div>
                                <p className="text-2xl font-bold text-primary">
                                    ${(retirementData.predictedSavings || 0).toLocaleString()}
                                </p>
                                <p className="text-sm text-gray-600">at retirement age</p>
                            </div>
                        </div>

                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={retirementData.projectionData || []}>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <XAxis dataKey="year"/>
                                    <YAxis tickFormatter={(value) => `$${(value / 1000)}k`}/>
                                    <Tooltip
                                        formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="conservative"
                                        stroke="#1E3A8A"
                                        name="Conservative Estimate"
                                        strokeWidth={2}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="optimistic"
                                        stroke="#059669"
                                        name="Optimistic Estimate"
                                        strokeWidth={2}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card className="p-6">
                            <h3 className="text-xl font-semibold text-primary mb-4">Retirement Progress</h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-sm text-gray-600">Current Savings</span>
                                        <span className="text-sm font-medium">
                                            ${(retirementData.currentSavings || 0).toLocaleString()}
                                        </span>
                                    </div>
                                    <Progress
                                        value={calculatePercentage(
                                            retirementData.currentSavings,
                                            retirementData.retirementGoal
                                        )}
                                        className="h-2"
                                    />
                                </div>
                                <p className="text-sm text-gray-600">
                                    You're {formatNumber(calculatePercentage(
                                    retirementData.currentSavings,
                                    retirementData.retirementGoal
                                ))}% of the way to your retirement goal
                                </p>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <h3 className="text-xl font-semibold text-primary mb-4">Monthly Contributions</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Current Monthly Savings</span>
                                    <span className="text-xl font-bold text-primary">
                                        ${(retirementData.monthlyContribution || 0).toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Years to Retirement</span>
                                    <span className="text-xl font-bold text-primary">
                                        {retirementData.yearsToRetirement || 0}
                                    </span>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6 lg:col-span-2">
                            <h3 className="text-xl font-semibold text-primary mb-4">Retirement Milestones</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {(retirementData.milestones || []).map((milestone, index) => (
                                    <div key={index} className="p-4 border rounded-lg">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-gray-600">Age {milestone.age}</span>
                                            <span className={`text-sm font-medium ${
                                                milestone.achieved ? 'text-emerald-600' : 'text-gray-500'
                                            }`}>
                                                {milestone.achieved ? '✓ Achieved' : 'Upcoming'}
                                            </span>
                                        </div>
                                        <p className="text-xl font-bold text-primary">
                                            ${(milestone.goal || 0).toLocaleString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Future;
