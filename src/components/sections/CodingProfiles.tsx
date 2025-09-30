import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Award, BarChart, RefreshCw } from "lucide-react";

const CodingProfiles = () => {
  const [leetCodeData, setLeetCodeData] = useState(null);
  const [loadingStates, setLoadingStates] = useState({
    leetcode: true
  });
  const [errors, setErrors] = useState({
    leetcode: null
  });
  const [lastUpdated, setLastUpdated] = useState({
    leetcode: null
  });

  // Static data for Codeforces
  const staticCodeforces = {
    name: "Codeforces",
    username: "man1kanta",
    profileUrl: "https://codeforces.com/profile/man1kanta",
    stats: [
      { label: "Max Rating", value: "1200+" },
      { label: "Rank", value: "Specialist" },
      { label: "Contests", value: "20+" }
    ],
    badges: ["Greedy", "Implementation", "Math"],
    color: "#1F8ACB",
    icon: <BarChart className="h-5 w-5" />
  };

  // Dynamic data for CodeChef (easily updatable)
  const dynamicCodeChef = {
    username: "man1lcanta",
    currentRating: 1639,
    maxRating: 1639,
    stars: "3⭐",
    globalRank: 12500,
    countryRank: 1800,
    problemsSolved: 180,
    contestsParticipated: 32,
    division: "Div 2", // Based on rating range
    lastUpdated: "2025-01-15", // Manual update date
    achievements: ["3 Star Coder", "100+ Problems", "30+ Contests"]
  };

  // LeetCode API endpoints
  const leetcodeApiEndpoints = [
    {
      url: 'https://alfa-leetcode-api.onrender.com/userProfile/Man1kanta',
      name: 'Alfa LeetCode API'
    },
    {
      url: 'https://leetcode-stats-api.herokuapp.com/Man1kanta',
      name: 'Heroku LeetCode API'
    },
    {
      url: 'https://leetcode-restful-api.vercel.app/Man1kanta',
      name: 'Vercel LeetCode API'
    }
  ];

  // Parse LeetCode API responses
  const parseLeetCodeResponse = (data, apiName) => {
    if (apiName === 'Alfa LeetCode API') {
      return {
        username: data.username || 'Man1kanta',
        totalSolved: data.totalSolved || data.solvedProblem || 0,
        easySolved: data.easySolved || data.easy || 0,
        mediumSolved: data.mediumSolved || data.medium || 0,
        hardSolved: data.hardSolved || data.hard || 0,
        acceptanceRate: data.acceptanceRate || 0,
        ranking: data.ranking || 0,
        contributionPoints: data.contributionPoints || data.reputation || 0,
        badges: data.badges || []
      };
    } else if (apiName === 'Heroku LeetCode API') {
      return {
        username: data.username || 'Man1kanta',
        totalSolved: data.totalSolved || data.solved || 0,
        easySolved: data.easy || 0,
        mediumSolved: data.medium || 0,
        hardSolved: data.hard || 0,
        acceptanceRate: data.acceptanceRate || 0,
        ranking: data.ranking || data.rank || 0,
        contributionPoints: data.contributionPoints || 0,
        badges: data.badges || []
      };
    } else {
      return {
        username: data.username || data.name || 'Man1kanta',
        totalSolved: data.totalSolved || data.solved || data.total || 0,
        easySolved: data.easySolved || data.easy || 0,
        mediumSolved: data.mediumSolved || data.medium || 0,
        hardSolved: data.hardSolved || data.hard || 0,
        acceptanceRate: data.acceptanceRate || 0,
        ranking: data.ranking || data.rank || 0,
        contributionPoints: data.contributionPoints || 0,
        badges: data.badges || []
      };
    }
  };

  // Fetch LeetCode data
  const fetchLeetCodeData = async () => {
    setLoadingStates(prev => ({ ...prev, leetcode: true }));
    setErrors(prev => ({ ...prev, leetcode: null }));

    for (let i = 0; i < leetcodeApiEndpoints.length; i++) {
      const { url, name } = leetcodeApiEndpoints[i];
      
      try {
        console.log(`Trying LeetCode ${name}: ${url}`);
        
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          },
          mode: 'cors',
          cache: 'no-cache'
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(`${name} response:`, data);
        
        if (data && (data.username || data.name || data.totalSolved !== undefined)) {
          const parsedData = parseLeetCodeResponse(data, name);
          setLeetCodeData(parsedData);
          setLastUpdated(prev => ({ ...prev, leetcode: new Date() }));
          setErrors(prev => ({ ...prev, leetcode: null }));
          setLoadingStates(prev => ({ ...prev, leetcode: false }));
          return;
        }
      } catch (err) {
        console.error(`Error with LeetCode ${name}:`, err);
      }
    }
    
    setErrors(prev => ({ ...prev, leetcode: 'All APIs failed' }));
    setLeetCodeData(null);
    setLoadingStates(prev => ({ ...prev, leetcode: false }));
  };

  useEffect(() => {
    fetchLeetCodeData();
  }, []);

  // Manual refresh function
  const handleLeetCodeRefresh = () => {
    fetchLeetCodeData();
  };

  // Create LeetCode platform object
  const createLeetCodePlatform = () => {
    if (loadingStates.leetcode) {
      return {
        name: "LeetCode",
        username: "Man1kanta",
        profileUrl: "https://leetcode.com/u/Man1kanta/",
        stats: [
          { label: "Problems Solved", value: "Loading..." },
          { label: "Acceptance Rate", value: "Loading..." },
          { label: "Global Ranking", value: "Loading..." }
        ],
        badges: ["Loading..."],
        color: "#FFA116",
        icon: <Code className="h-5 w-5" />
      };
    }

    if (errors.leetcode || !leetCodeData) {
      return {
        name: "LeetCode",
        username: "Man1kanta",
        profileUrl: "https://leetcode.com/u/Man1kanta/",
        stats: [
          { label: "Problems Solved", value: "API Error" },
          { label: "Acceptance Rate", value: "API Error" },
          { label: "Global Ranking", value: "API Error" }
        ],
        badges: ["Click 🔄 to retry"],
        color: "#FFA116",
        icon: <Code className="h-5 w-5" />
      };
    }

    const totalSolved = leetCodeData.totalSolved || 0;
    const easySolved = leetCodeData.easySolved || 0;
    const mediumSolved = leetCodeData.mediumSolved || 0;
    const hardSolved = leetCodeData.hardSolved || 0;
    const acceptanceRate = leetCodeData.acceptanceRate ? `${leetCodeData.acceptanceRate.toFixed(1)}%` : '0%';
    const ranking = leetCodeData.ranking || 0;
    const contributionPoints = leetCodeData.contributionPoints || 0;

    return {
      name: "LeetCode",
      username: leetCodeData.username || "Man1kanta",
      profileUrl: `https://leetcode.com/u/${leetCodeData.username || 'Man1kanta'}/`,
      stats: [
        { 
          label: "Total Solved", 
          value: totalSolved.toString()
        },
        { 
          label: "Acceptance Rate", 
          value: acceptanceRate 
        },
        { 
          label: ranking > 0 ? "Global Rank" : "Contribution", 
          value: ranking > 0 ? ranking.toLocaleString() : contributionPoints.toString()
        }
      ],
      badges: [
        `Easy: ${easySolved}`,
        `Medium: ${mediumSolved}`,
        `Hard: ${hardSolved}`,
        contributionPoints > 0 ? `${contributionPoints} Points` : `${totalSolved} Total`
      ],
      color: "#FFA116",
      icon: <Code className="h-5 w-5" />
    };
  };

  // Create CodeChef platform object with dynamic data
  const createCodeChefPlatform = () => {
    const data = dynamicCodeChef;
    
    // Calculate division based on max rating
    let division = 'Div 4';
    if (data.maxRating >= 2000) division = 'Div 1';
    else if (data.maxRating >= 1600) division = 'Div 2';
    else if (data.maxRating >= 1400) division = 'Div 3';

    return {
      name: "CodeChef",
      username: data.username,
      profileUrl: `https://www.codechef.com/users/${data.username}`,
      stats: [
        { 
          label: "Current Rating", 
          value: data.currentRating.toString()
        },
        { 
          label: "Max Rating", 
          value: data.maxRating.toString()
        },
        { 
          label: "Division", 
          value: division
        }
      ],
      badges: [
        `${data.stars} Coder`,
        data.globalRank > 0 ? `Global: ${data.globalRank.toLocaleString()}` : "Competitive Programming",
        data.countryRank > 0 ? `Country: ${data.countryRank.toLocaleString()}` : "DSA Expert",
        data.problemsSolved > 0 ? `${data.problemsSolved} Problems` : `${data.contestsParticipated} Contests`
      ],
      color: "#5B4638",
      icon: <Award className="h-5 w-5" />
    };
  };

  // Combine all platforms
  const allPlatforms = [
    createLeetCodePlatform(),
    createCodeChefPlatform(),
    staticCodeforces
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="coding-profiles" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Coding Profiles</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            My competitive programming journey across different platforms
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {allPlatforms.map((platform, index) => (
            <motion.div key={index} variants={itemVariants}>
              <div className="h-full rounded-2xl glass backdrop-blur-xl border border-white/10 transition-all duration-300 hover:border-cyan-500/30 hover-glow overflow-hidden relative group">
                <div 
                  className="absolute top-0 left-0 w-full h-1 group-hover:h-2 transition-all duration-300" 
                  style={{ backgroundColor: platform.color }}
                />
                <div className="flex flex-col space-y-1.5 p-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <span className="bg-gradient-to-r from-cyan-500 to-purple-500 p-2 rounded-lg text-white">
                        {platform.icon}
                      </span>
                      {platform.name}
                      {/* Loading indicator for LeetCode */}
                      {index === 0 && loadingStates.leetcode && (
                        <RefreshCw className="ml-2 h-4 w-4 text-cyan-400 animate-spin" />
                      )}
                      {/* Error indicator with retry button for LeetCode */}
                      {index === 0 && errors.leetcode && (
                        <motion.button
                          onClick={handleLeetCodeRefresh}
                          className="ml-2 text-xs text-orange-400 hover:text-orange-300 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          title="Click to retry fetching LeetCode data"
                        >
                          🔄
                        </motion.button>
                      )}
                      {/* Success indicator for LeetCode */}
                      {index === 0 && leetCodeData && !loadingStates.leetcode && !errors.leetcode && (
                        <span className="ml-2 text-xs text-green-400">✓ Live</span>
                      )}
                      {/* Static data indicator for CodeChef */}
                      {index === 1 && (
                        <span className="ml-2 text-xs text-blue-400">📊 Updated</span>
                      )}
                    </h3>
                    <motion.a
                      href={platform.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      className="text-sm text-cyan-400 hover:underline"
                    >
                      @{platform.username}
                    </motion.a>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <div className="grid grid-cols-3 gap-1.5 mb-4">
                    {platform.stats.map((stat, statIndex) => (
                      <div 
                        key={statIndex} 
                        className="text-center p-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 transition-colors duration-200"
                      >
                        <div className={`font-bold text-sm leading-tight min-h-[1.5rem] flex items-center justify-center break-all ${
                          (index === 0 && loadingStates.leetcode) ? 'animate-pulse' : ''
                        }`}>
                          {stat.value}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1 leading-tight">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {platform.badges.map((badge, badgeIndex) => (
                      <div key={badgeIndex} className="group/badge relative">
                        <motion.div 
                          whileHover={{ scale: 1.05 }}
                          className={`px-2.5 py-0.5 text-xs font-semibold rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 hover:border-cyan-500/50 transition-colors cursor-pointer ${
                            (index === 0 && loadingStates.leetcode) ? 'animate-pulse' : ''
                          }`}
                        >
                          {badge}
                        </motion.div>
                        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 hidden group-hover/badge:block z-50 bg-background/80 border border-cyan-500/30 rounded-lg p-2 text-sm whitespace-nowrap">
                          {badge.includes('⭐') ? 'Star Rating Achievement' : 
                           badge.includes(':') ? 'Difficulty Breakdown' :
                           badge.includes('📊') ? 'Regularly updated profile data' :
                           `Skilled in ${badge}`}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Status information */}
        <motion.div 
          className="text-center mt-8 text-sm text-muted-foreground space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {loadingStates.leetcode && (
            <div className="flex items-center justify-center gap-2">
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span>Fetching LeetCode data from API...</span>
            </div>
          )}
          
          {errors.leetcode && (
            <div className="text-orange-400">
              LeetCode API error - Click 🔄 to retry
            </div>
          )}
          
          {lastUpdated.leetcode && !loadingStates.leetcode && !errors.leetcode && (
            <div className="text-green-400">
              LeetCode data last updated: {lastUpdated.leetcode.toLocaleString()}
            </div>
          )}

          {/* CodeChef update info */}
          <div className="text-blue-400">
            CodeChef data last updated: {dynamicCodeChef.lastUpdated} 
            <span className="text-xs ml-2">(Manual update)</span>
          </div>

          {/* Debug info */}
          {leetCodeData && (
            <div className="text-xs text-gray-500 mt-4">
              LeetCode API: {leetCodeData.totalSolved || 0} total, {leetCodeData.easySolved || 0}E/{leetCodeData.mediumSolved || 0}M/{leetCodeData.hardSolved || 0}H
              {leetCodeData.ranking > 0 && `, Rank: ${leetCodeData.ranking.toLocaleString()}`}
              {leetCodeData.acceptanceRate && `, Rate: ${leetCodeData.acceptanceRate.toFixed(1)}%`}
            </div>
          )}
          
          <div className="text-xs text-gray-500">
            CodeChef Profile: Rating {dynamicCodeChef.currentRating}/{dynamicCodeChef.maxRating}, {dynamicCodeChef.stars}
            {dynamicCodeChef.globalRank > 0 && `, Global: ${dynamicCodeChef.globalRank.toLocaleString()}`}
            {dynamicCodeChef.problemsSolved > 0 && `, Solved: ${dynamicCodeChef.problemsSolved}`}
            {dynamicCodeChef.contestsParticipated > 0 && `, Contests: ${dynamicCodeChef.contestsParticipated}`}
          </div>
        </motion.div>

        {/* Update instructions
        <motion.div 
          className="text-center mt-6 text-xs text-blue-400 bg-blue-500/10 rounded-lg p-3 border border-blue-500/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="flex items-center gap-2 mb-2 justify-center">
            <span>📊</span>
            <strong>To Update CodeChef Data:</strong>
          </div>
          <div className="text-left max-w-2xl mx-auto space-y-1">
            <p>• Modify the <code>dynamicCodeChef</code> object in the code with your latest stats</p>
            <p>• Update <code>currentRating</code>, <code>maxRating</code>, <code>problemsSolved</code>, etc.</p>
            <p>• Change <code>lastUpdated</code> date to reflect when you updated the data</p>
            <p>• The division and star rating will be calculated automatically based on your rating</p>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
};

export default CodingProfiles;