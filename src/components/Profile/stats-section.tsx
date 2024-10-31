import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";

export default function StatsSection({ userInfo }) {
  return (
    <>
      <Card>
        <CardContent className="flex items-center justify-between p-6">
          <div className="text-center">
            <div className="text-3xl font-semibold text-indigo-600">
              {userInfo.reviews}
            </div>
            <div className="text-gray-600">Reviews</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-semibold text-indigo-600">
              {userInfo.itemsSold}
            </div>
            <div className="text-gray-600">Sold</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-semibold text-indigo-600">
              {userInfo.followers.toLocaleString()}
            </div>
            <div className="text-gray-600">Followers</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-xl font-semibold">Seller Rating</h3>
            <div className="flex items-center">
              <Star className="mr-1 h-5 w-5 text-yellow-500" />
              <span className="font-bold">{userInfo.rating}</span>
            </div>
          </div>
          <Progress value={userInfo.rating * 20} className="h-2" />
        </CardContent>
      </Card>
    </>
  );
}
