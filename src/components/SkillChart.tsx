import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "./ProgressBar";

interface Skill {
  name: string;
  level: number;
  maxLevel?: number;
}

interface SkillChartProps {
  skills: Skill[];
  title?: string;
}

export const SkillChart = ({ skills, title = "Skill Proficiency" }: SkillChartProps) => {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-learning-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {skills.map((skill, index) => (
          <div 
            key={skill.name}
            className="animate-in slide-in-from-left duration-500"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <ProgressBar
              label={skill.name.charAt(0).toUpperCase() + skill.name.slice(1)}
              value={skill.level * 100}
              max={(skill.maxLevel || 1) * 100}
              animated={true}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};