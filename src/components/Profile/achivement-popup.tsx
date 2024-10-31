import { motion, AnimatePresence } from "framer-motion";
import { Award } from "lucide-react";

export default function AchievementPopup({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 rounded-lg bg-green-500 p-4 text-white shadow-lg"
        >
          <div className="flex items-center space-x-2">
            <Award className="h-6 w-6" />
            <span>New Achievement: Friendly Follower!</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
