import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { Card, CardContent } from "../components/ui/card";
import Avatar from "../components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "../components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Sparkles, Map, Camera, Star, Globe, Clock, Leaf, Calendar, Flame, Users } from "lucide-react";

const achievementCategories = [
  {
    title: "🌍 Explorer",
    achievements: [
      { id: "globetrotter", label: "Globe Trotter", icon: <Globe size={24} />, description: "Reviewed places in 5+ districts." },
      { id: "scenicSoul", label: "Scenic Soul", icon: <Leaf size={24} />, description: "Reviewed 3 nature-related places." },
      { id: "urbanExplorer", label: "Urban Explorer", icon: <Map size={24} />, description: "Reviewed 3 city attractions." },
    ]
  },
  {
    title: "📸 Social",
    achievements: [
      { id: "popularVoice", label: "Popular Voice", icon: <Users size={24} />, description: "10+ likes on a review." },
      { id: "storyteller", label: "Storyteller", icon: <Camera size={24} />, description: "Added images to 5+ reviews." },
      { id: "trustedCritic", label: "Trusted Critic", icon: <Star size={24} />, description: "Marked helpful by 3 users." },
    ]
  },
  {
    title: "🧠 Insightful",
    achievements: [
      { id: "detailOriented", label: "Detail-Oriented", icon: <Sparkles size={24} />, description: "Wrote 100+ word reviews." },
      { id: "curator", label: "Trip Curator", icon: <Map size={24} />, description: "Created 3 optimized trips." },
      { id: "consistentContributor", label: "Steady Reviewer", icon: <Calendar size={24} />, description: "1 review per week for 4 weeks." },
    ]
  },
  {
    title: "🎉 Fun",
    achievements: [
      { id: "foodieFootprint", label: "Foodie Footprint", icon: <Flame size={24} />, description: "Reviewed 3 food places." },
      { id: "cultureSeeker", label: "Culture Seeker", icon: <Star size={24} />, description: "Reviewed an event + place." },
      { id: "nightOwl", label: "Night Owl", icon: <Clock size={24} />, description: "Reviewed between 11PM-3AM." },
    ]
  },
];

const AchievementsPage = () => {
  const { token, loading } = useContext(AuthContext);
  const [tab, setTab] = useState("achievements");
  const [unlockedIds, setUnlockedIds] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState(null);
  const [newlyUnlocked, setNewlyUnlocked] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const fetchAchievements = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/achievements/reviews", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const currentUnlocked = data.unlocked || [];
      if (!initialLoad) {
        const newOnes = currentUnlocked.filter((id) => !unlockedIds.includes(id));
        if (newOnes.length > 0) {
          setNewlyUnlocked(newOnes);
          setShowDialog(true);
        }
      }
      setUnlockedIds(currentUnlocked);
    } catch (err) {
      console.error("Error fetching achievements:", err);
      setError("Failed to load achievements.");
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/achievements/leaderboard");
      setLeaderboard(data);
    } catch (err) {
      console.error("Error fetching leaderboard:", err);
      setError("Failed to load leaderboard.");
    }
  };

  useEffect(() => {
    if (!token || loading) return;
    fetchAchievements();
    fetchLeaderboard();
    setInitialLoad(false);
  }, [token, loading]);

  const getBadge = (index) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return null;
  };

  const newlyUnlockedData = achievementCategories
    .flatMap((group) => group.achievements)
    .filter((achv) => newlyUnlocked.includes(achv.id));

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🎖️ Achievements</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="mb-6 flex flex-wrap gap-2">
          <TabsTrigger value="achievements">🧳 Rewards</TabsTrigger>
          <TabsTrigger value="collection">📦 My Collection</TabsTrigger>
          <TabsTrigger value="leaderboard">🏆 Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="achievements">
          {achievementCategories.map((group) => (
            <div key={group.title} className="mb-6">
              <h2 className="text-xl font-bold mb-2">{group.title}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {group.achievements.map((achv) => {
                  const unlocked = unlockedIds.includes(achv.id);
                  return (
                    <Tooltip key={achv.id}>
                      <TooltipTrigger asChild>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Card
                            className={`rounded-2xl shadow-md h-full transition duration-300 ${
                              unlocked ? "bg-white" : "bg-gray-100 opacity-60"
                            }`}
                          >
                            <CardContent className="p-4 flex flex-col items-center text-center">
                              <div className="mb-3 p-3 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 text-white shadow-lg">
                                {achv.icon}
                              </div>
                              <h3 className="font-semibold text-lg">{achv.label}</h3>
                              <p className="text-sm text-gray-600">{achv.description}</p>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        <p>{unlocked ? "Unlocked!" : "Keep going to unlock this!"}</p>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="collection">
          <h2 className="text-xl font-bold mb-4">📦 Your Unlocked Achievements</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {achievementCategories
              .flatMap((group) => group.achievements)
              .filter((achv) => unlockedIds.includes(achv.id))
              .map((achv) => (
                <motion.div
                  key={achv.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="rounded-2xl shadow-md bg-white h-full">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <div className="mb-3 p-3 rounded-full bg-gradient-to-br from-green-400 to-blue-500 text-white shadow-lg">
                        {achv.icon}
                      </div>
                      <h3 className="font-semibold text-lg">{achv.label}</h3>
                      <p className="text-sm text-gray-600">{achv.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>
          {unlockedIds.length === 0 && (
            <p className="text-center text-gray-500 mt-6">No achievements unlocked yet. Start reviewing to earn them!</p>
          )}
        </TabsContent>

        <TabsContent value="leaderboard">
          <div className="space-y-4">
            {leaderboard.length > 0 ? (
              leaderboard.map((entry, idx) => (
                <motion.div
                  key={entry._id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card className="flex items-center justify-between px-4 py-3 rounded-2xl">
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-bold text-blue-600">
                        #{idx + 1} {getBadge(idx)}
                      </span>
                      <Avatar
                        src={entry.user.avatar}
                        alt={entry.user.username}
                        size={40}
                        className="w-10 h-10"
                        fallback={entry.user.username?.charAt(0)?.toUpperCase() || "👤"}
                      />
                      <p className="font-medium text-blue-500">{entry.user.username}</p>
                    </div>
                    <span className="text-sm text-gray-600">{entry.reviewCount} reviews</span>
                  </Card>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-500">No leaderboard data available.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* 🎉 Unlock Popup */}
      <AnimatePresence>
        {showDialog && newlyUnlockedData.length > 0 && (
          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center">🎉 Congratulations!</DialogTitle>
              </DialogHeader>
              <div className="mt-4 space-y-4">
                {newlyUnlockedData.map((achv) => (
                  <div key={achv.id} className="p-3 rounded-xl bg-green-100 text-center">
                    <div className="mb-2 text-3xl">{achv.icon}</div>
                    <p className="font-semibold">{achv.label}</p>
                    <p className="text-sm text-gray-700">{achv.description}</p>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AchievementsPage;
