import { Card, CardContent } from "@/components/ui/card";
import { MapPin, GraduationCap, Award } from "lucide-react";

export default function AboutSection({ userInfo }) {
  return (
    <>
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <h2 className="mb-4 text-2xl font-semibold">About Me</h2>
          <p className="mb-6 text-lg leading-relaxed text-gray-600">
            {userInfo.bio}
          </p>
          <div className="space-y-4">
            {userInfo.university && (
              <div className="flex items-center text-gray-600">
                <MapPin className="mr-2 h-5 w-5 text-indigo-500" />
                <span>{userInfo.university}</span>
              </div>
            )}
            {userInfo.degree && userInfo.year && (
              <div className="flex items-center text-gray-600">
                <GraduationCap className="mr-2 h-5 w-5 text-indigo-500" />
                <span>{`${userInfo.degree}, ${userInfo.year}`}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="mb-4 text-xl font-semibold">Achievements</h3>
          <div className="space-y-3">
            {userInfo.achievements.map((achievement, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-yellow-500" />
                <span>{achievement}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
