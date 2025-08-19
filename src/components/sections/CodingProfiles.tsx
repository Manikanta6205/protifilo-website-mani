import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Award, BarChart, RefreshCw } from "lucide-react";

const CodingProfiles = () => {
  const [codeChefData, setCodeChefData] = useState(null);
  const [leetCodeData, setLeetCodeData] = useState(null);
  const [loadingStates, setLoadingStates] = useState({
    leetcode: true,
    codechef: true
  });
  const [errors, setErrors] = useState({
    leetcode: null,
    codechef: null
  });
  const [lastUpdated, setLastUpdated] = useState({
    leetcode: null,
    codechef: null
  });

  // Static data for Codeforces
  const staticCodeforces = {
    name: "Codeforces",
    username: "manikantapendela",
    profileUrl: "https://codeforces.com/profile/manikantapendela",
    stats: [
      { label: "Max Rating", value: "1200+" },
      { label: "Rank", value: "Specialist" },
      { label: "Contests", value: "20+" }
    ],
    badges: ["Greedy", "Implementation", "Math"],
    color: "#1F8ACB",
    icon: <BarChart className="h-5 w-5" />
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

  // CodeChef web scraping endpoints (you'll need to set these up)
  const codechefScrapingEndpoints = [
    {
      // Option 1: Your own backend API endpoint that scrapes CodeChef
      url: 'https://your-backend-api.com/api/scrape/codechef/man1lcanta',
      name: 'Your Backend API',
      type: 'backend'
    },
    {
      // Option 2: Using a CORS proxy to scrape directly (less reliable)
      url: 'https://api.allorigins.win/get?url=' + encodeURIComponent('https://www.codechef.com/users/man1lcanta'),
      name: 'CORS Proxy Scraping',
      type: 'proxy'
    },
    {
      // Option 3: Using another CORS proxy
      url: 'https://corsproxy.io/?https://www.codechef.com/users/man1lcanta',
      name: 'Alternative Proxy',
      type: 'proxy'
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

  // Parse scraped CodeChef HTML
  const parseCodeChefHTML = (htmlString) => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, 'text/html');
      
      // Extract rating from the page
      const ratingElement = doc.querySelector('.rating-number') || 
                           doc.querySelector('.rating') ||
                           doc.querySelector('[class*="rating"]');
      
      // Extract other information
      const profileData = {
        username: 'man1lcanta',
        currentRating: 0,
        maxRating: 0,
        stars: '0',
        globalRank: 0,
        countryRank: 0,
        problemsSolved: 0,
        contestsParticipated: 0
      };

      // Try to extract rating
      if (ratingElement) {
        const ratingText = ratingElement.textContent?.trim();
        console.log('CodeChef rating text found:', ratingText);
        const rating = parseInt(ratingText?.replace(/\D/g, '') || '0');
        console.log('Parsed CodeChef rating:', rating);
        profileData.currentRating = rating;
        profileData.maxRating = rating;
      }

      // Try to extract star rating
      const starElement = doc.querySelector('.rating-star') || 
                         doc.querySelector('[class*="star"]');
      if (starElement) {
        const starText = starElement.textContent?.trim();
        profileData.stars = starText || '0';
      }

      // Try to extract other stats
      const statElements = doc.querySelectorAll('.rating-data-section') || 
                          doc.querySelectorAll('[class*="stat"]');
      
      statElements.forEach(element => {
        const text = element.textContent?.toLowerCase() || '';
        const numberMatch = text.match(/\d+/);
        const number = numberMatch ? parseInt(numberMatch[0]) : 0;
        
        if (text.includes('global') || text.includes('world')) {
          profileData.globalRank = number;
        } else if (text.includes('country')) {
          profileData.countryRank = number;
        } else if (text.includes('problem') || text.includes('solved')) {
          profileData.problemsSolved = number;
        } else if (text.includes('contest')) {
          profileData.contestsParticipated = number;
        }
      });

      // Calculate stars based on rating if not found
      if (!profileData.stars || profileData.stars === '0') {
        const rating = profileData.currentRating;
        if (rating >= 2500) profileData.stars = '7⭐';
        else if (rating >= 2200) profileData.stars = '6⭐';
        else if (rating >= 2000) profileData.stars = '5⭐';
        else if (rating >= 1800) profileData.stars = '4⭐';
        else if (rating >= 1600) profileData.stars = '3⭐';
        else if (rating >= 1400) profileData.stars = '2⭐';
        else if (rating >= 1200) profileData.stars = '1⭐';
        else profileData.stars = '0⭐';
      }

      return profileData;
    } catch (error) {
      console.error('Error parsing CodeChef HTML:', error);
      return null;
    }
  };

  // Fetch CodeChef data using web scraping
  const fetchCodeChefData = async () => {
    setLoadingStates(prev => ({ ...prev, codechef: true }));
    setErrors(prev => ({ ...prev, codechef: null }));

    for (let i = 0; i < codechefScrapingEndpoints.length; i++) {
      const { url, name, type } = codechefScrapingEndpoints[i];
      
      try {
        console.log(`Trying CodeChef ${name}: ${url}`);
        
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          },
          mode: 'cors',
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        let htmlContent;
        
        if (type === 'proxy' && name.includes('allorigins')) {
          // Handle allorigins response format
          const data = await response.json();
          htmlContent = data.contents;
        } else if (type === 'proxy') {
          // Handle direct HTML response from proxy
          htmlContent = await response.text();
        } else {
          // Handle backend API response
          const data = await response.json();
          if (data.html) {
            htmlContent = data.html;
          } else {
            // If backend already parsed the data
            setCodeChefData(data);
            setLastUpdated(prev => ({ ...prev, codechef: new Date() }));
            setErrors(prev => ({ ...prev, codechef: null }));
            setLoadingStates(prev => ({ ...prev, codechef: false }));
            return;
          }
        }
        
        if (htmlContent) {
          const parsedData = parseCodeChefHTML(htmlContent);
          console.log('Parsed CodeChef data:', parsedData);
          
          if (parsedData && (parsedData.currentRating > 0 || parsedData.stars !== '0⭐')) {
            setCodeChefData(parsedData);
            setLastUpdated(prev => ({ ...prev, codechef: new Date() }));
            setErrors(prev => ({ ...prev, codechef: null }));
            setLoadingStates(prev => ({ ...prev, codechef: false }));
            return;
          }
        }
      } catch (err) {
        console.error(`Error with CodeChef ${name}:`, err);
      }
    }
    
    // If all methods fail, use fallback data
    console.log('All CodeChef scraping methods failed, using fallback data');
    setCodeChefData({
      username: 'man1lcanta',
      currentRating: 1639,
      maxRating: 1639,
      stars: '3⭐',
      globalRank: 0,
      countryRank: 0,
      problemsSolved: 0,
      contestsParticipated: 32
    });
    setErrors(prev => ({ ...prev, codechef: 'Using fallback data - scraping failed' }));
    setLoadingStates(prev => ({ ...prev, codechef: false }));
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
    fetchCodeChefData();
  }, []);

  // Manual refresh functions
  const handleLeetCodeRefresh = () => {
    fetchLeetCodeData();
  };

  const handleCodeChefRefresh = () => {
    fetchCodeChefData();
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

  // Create CodeChef platform object with dynamic scraping
  const createCodeChefPlatform = () => {
    if (loadingStates.codechef) {
      return {
        name: "CodeChef",
        username: "man1lcanta",
        profileUrl: "https://www.codechef.com/users/man1lcanta",
        stats: [
          { label: "Current Rating", value: "Scraping..." },
          { label: "Max Rating", value: "Scraping..." },
          { label: "Division", value: "Loading..." }
        ],
        badges: ["🕷️ Web Scraping..."],
        color: "#5B4638",
        icon: <Award className="h-5 w-5" />
      };
    }

    if (!codeChefData) {
      return {
        name: "CodeChef",
        username: "man1lcanta",
        profileUrl: "https://www.codechef.com/users/man1lcanta",
        stats: [
          { label: "Current Rating", value: "Scrape Failed" },
          { label: "Max Rating", value: "Scrape Failed" },
          { label: "Division", value: "Unknown" }
        ],
        badges: ["Click 🔄 to retry", "Scraping Error"],
        color: "#5B4638",
        icon: <Award className="h-5 w-5" />
      };
    }

    // Show scraped data
    const currentRating = codeChefData.currentRating || 0;
    const maxRating = codeChefData.maxRating || 0;
    const stars = codeChefData.stars || '0⭐';
    const globalRank = codeChefData.globalRank || 0;
    const countryRank = codeChefData.countryRank || 0;
    const problemsSolved = codeChefData.problemsSolved || 0;
    const contestsParticipated = codeChefData.contestsParticipated || 0;
    
    console.log('CodeChef display values:', { currentRating, maxRating, stars });
    
    // Calculate division based on max rating
    let division = 'Div 4';
    if (maxRating >= 2000) division = 'Div 1';
    else if (maxRating >= 1600) division = 'Div 2';
    else if (maxRating >= 1400) division = 'Div 3';

    const isLiveData = !errors.codechef?.includes('fallback');

    return {
      name: "CodeChef",
      username: codeChefData.username || "man1lcanta",
      profileUrl: `https://www.codechef.com/users/${codeChefData.username || 'man1lcanta'}`,
      stats: [
        { 
          label: "Current Rating", 
          value: currentRating > 0 ? currentRating.toString() : "0"
        },
        { 
          label: "Max Rating", 
          value: maxRating > 0 ? maxRating.toString() : "0"
        },
        { 
          label: "Division", 
          value: division
        }
      ],
      badges: [
        `${stars} Coder`,
        globalRank > 0 ? `Global: ${globalRank.toLocaleString()}` : "Competitive Programming",
        countryRank > 0 ? `Country: ${countryRank.toLocaleString()}` : "DSA Expert",
        problemsSolved > 0 ? `${problemsSolved} Problems` : 
        contestsParticipated > 0 ? `${contestsParticipated} Contests` : 
        isLiveData ? "🕷️ Live Scraped" : "📊 Cached Data"
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
                      {/* Loading indicators */}
                      {index === 0 && loadingStates.leetcode && (
                        <RefreshCw className="ml-2 h-4 w-4 text-cyan-400 animate-spin" />
                      )}
                      {index === 1 && loadingStates.codechef && (
                        <div className="ml-2 flex items-center gap-1">
                          <span className="text-xs">🕷️</span>
                          <RefreshCw className="h-4 w-4 text-cyan-400 animate-spin" />
                        </div>
                      )}
                      {/* Error indicators with retry buttons */}
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
                      {index === 1 && errors.codechef && (
                        <motion.button
                          onClick={handleCodeChefRefresh}
                          className="ml-2 text-xs text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-1"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          title="Click to retry scraping CodeChef data"
                        >
                          🕷️🔄
                        </motion.button>
                      )}
                      {/* Success indicators */}
                      {index === 0 && leetCodeData && !loadingStates.leetcode && !errors.leetcode && (
                        <span className="ml-2 text-xs text-green-400">✓ Live</span>
                      )}
                      {index === 1 && codeChefData && !loadingStates.codechef && !errors.codechef?.includes('fallback') && (
                        <span className="ml-2 text-xs text-green-400 flex items-center gap-1">
                          🕷️✓ Scraped
                        </span>
                      )}
                      {index === 1 && errors.codechef?.includes('fallback') && (
                        <span className="ml-2 text-xs text-yellow-400">📊 Cached</span>
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
                          (index === 0 && loadingStates.leetcode) || 
                          (index === 1 && loadingStates.codechef) ? 'animate-pulse' : ''
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
                            (index === 0 && loadingStates.leetcode) || 
                            (index === 1 && loadingStates.codechef) ? 'animate-pulse' : ''
                          }`}
                        >
                          {badge}
                        </motion.div>
                        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 hidden group-hover/badge:block z-50 bg-background/80 border border-cyan-500/30 rounded-lg p-2 text-sm whitespace-nowrap">
                          {badge.includes('⭐') ? 'Star Rating Achievement' : 
                           badge.includes(':') ? 'Difficulty Breakdown' :
                           badge.includes('🕷️') ? 'Data scraped from CodeChef website' :
                           badge.includes('📊') ? 'Using cached profile data' :
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
          {(loadingStates.leetcode || loadingStates.codechef) && (
            <div className="flex items-center justify-center gap-2">
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span>
                {loadingStates.leetcode && loadingStates.codechef && 'Fetching API data and scraping CodeChef...'}
                {loadingStates.leetcode && !loadingStates.codechef && 'Fetching LeetCode data...'}
                {!loadingStates.leetcode && loadingStates.codechef && '🕷️ Scraping CodeChef profile...'}
              </span>
            </div>
          )}
          
          {(errors.leetcode || errors.codechef) && (
            <div className="text-orange-400">
              {errors.leetcode && errors.codechef ? 'API & scraping errors' :
               errors.leetcode ? 'LeetCode API error' :
               errors.codechef?.includes('fallback') ? 'Using cached CodeChef data' :
               'CodeChef scraping error'} - Click 🔄 to retry
            </div>
          )}
          
          {lastUpdated.leetcode && lastUpdated.codechef && !loadingStates.leetcode && !loadingStates.codechef && !errors.leetcode && !errors.codechef?.includes('fallback') && (
            <div className="text-green-400">
              Live data last updated: {Math.max(lastUpdated.leetcode, lastUpdated.codechef).toLocaleString()}
            </div>
          )}

          {/* Web scraping notice */}
          <div className="text-xs text-blue-400 mt-4 bg-blue-500/10 rounded-lg p-3 border border-blue-500/20">
            <div className="flex items-center gap-2 mb-2">
              <span>🕷️</span>
              <strong>CodeChef Web Scraping Setup Instructions:</strong>
            </div>
            <div className="text-left space-y-2">
              <p>1. <strong>Backend API (Recommended):</strong> Create an endpoint at <code>your-backend-api.com/api/scrape/codechef/man1lcanta</code></p>
              <p>2. <strong>Python Backend Example:</strong></p>
              <pre className="text-xs bg-black/20 p-2 rounded mt-1 overflow-x-auto">
{`from flask import Flask, jsonify
from bs4 import BeautifulSoup
import requests

@app.route('/api/scrape/codechef/<username>')
def scrape_codechef(username):
    url = f"https://www.codechef.com/users/{username}"
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")
    
    rating_element = soup.find("div", class_="rating-number")
    rating = rating_element.text if rating_element else "0"
    
    return jsonify({
        "username": username,
        "currentRating": int(rating),
        "maxRating": int(rating),
        "stars": "3⭐",  # Calculate based on rating
        "html": response.text  # Or return parsed data
    })`}
              </pre>
              <p>3. <strong>Alternative:</strong> CORS proxies are used as fallback (less reliable)</p>
              <p>4. Update the <code>codechefScrapingEndpoints[0].url</code> with your backend URL</p>
            </div>
          </div>

          {/* Debug info */}
          {(leetCodeData || codeChefData) && (
            <div className="text-xs text-gray-500 mt-4 space-y-1">
              {leetCodeData && (
                <div>
                  LeetCode API: {leetCodeData.totalSolved || 0} total, {leetCodeData.easySolved || 0}E/{leetCodeData.mediumSolved || 0}M/{leetCodeData.hardSolved || 0}H
                  {leetCodeData.ranking > 0 && `, Rank: ${leetCodeData.ranking.toLocaleString()}`}
                  {leetCodeData.acceptanceRate && `, Rate: ${leetCodeData.acceptanceRate.toFixed(1)}%`}
                </div>
              )}
              {codeChefData && (
                <div>
                  CodeChef {errors.codechef?.includes('fallback') ? 'Cached' : 'Scraped'}: Rating {codeChefData.currentRating || 0}/{codeChefData.maxRating || 0}, {codeChefData.stars || '0⭐'}
                  {codeChefData.globalRank > 0 && `, Global: ${codeChefData.globalRank.toLocaleString()}`}
                  {codeChefData.problemsSolved > 0 && `, Solved: ${codeChefData.problemsSolved}`}
                  {codeChefData.contestsParticipated > 0 && `, Contests: ${codeChefData.contestsParticipated}`}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default CodingProfiles;