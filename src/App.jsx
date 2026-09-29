import React, { useState, useEffect } from 'react';
import data from './data.json';

const YoutubeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
);
const ArticleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
);
const CodeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
);
const TimelineIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
);
const CodeforcesIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="14" width="4" height="7" fill="currentColor" stroke="none"></rect><rect x="10" y="7" width="4" height="14" fill="currentColor" stroke="none"></rect><rect x="17" y="3" width="4" height="18" fill="currentColor" stroke="none"></rect></svg>
);
const RoadmapIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
);
const BookmarkIcon = ({ filled }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
);
const ReviewIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
);
const NotesIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
);
const FireIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#f97316" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"></path></svg>
);

const getCFTag = (topic) => {
  const t = topic.toLowerCase();
  if (t.includes('math')) return 'math';
  if (t.includes('sort')) return 'sortings';
  if (t.includes('array')) return 'arrays';
  if (t.includes('binary search')) return 'binary+search';
  if (t.includes('string')) return 'strings';
  if (t.includes('greedy')) return 'greedy';
  if (t.includes('tree')) return 'trees';
  if (t.includes('graph')) return 'graphs';
  if (t.includes('dp') || t.includes('dynamic')) return 'dp';
  if (t.includes('bit')) return 'bitmasks';
  return 'data+structures';
};

function App() {
  const [activeView, setActiveView] = useState('roadmap');
  const [activeNoteId, setActiveNoteId] = useState(null);

  // Core State
  const [solved, setSolved] = useState(() => {
    const saved = localStorage.getItem('a2z-solved');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const [bookmarked, setBookmarked] = useState(() => {
    const saved = localStorage.getItem('a2z-bookmarked');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const [review, setReview] = useState(() => {
    const saved = localStorage.getItem('a2z-review');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('a2z-notes');
    return saved ? JSON.parse(saved) : {};
  });
  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem('a2z-streak');
    return saved ? JSON.parse(saved) : { current: 0, lastDate: null };
  });

  const [dailyState, setDailyState] = useState(() => {
    const saved = localStorage.getItem('a2z-daily');
    return saved ? JSON.parse(saved) : null;
  });

  const { problems } = data;
  const steps = data.meta.steps || [];

  // Persistence Effects
  useEffect(() => localStorage.setItem('a2z-solved', JSON.stringify(Array.from(solved))), [solved]);
  useEffect(() => localStorage.setItem('a2z-bookmarked', JSON.stringify(Array.from(bookmarked))), [bookmarked]);
  useEffect(() => localStorage.setItem('a2z-review', JSON.stringify(Array.from(review))), [review]);
  useEffect(() => localStorage.setItem('a2z-notes', JSON.stringify(notes)), [notes]);
  useEffect(() => localStorage.setItem('a2z-streak', JSON.stringify(streak)), [streak]);

  // Streak logic
  const updateStreak = () => {
    const today = new Date().toISOString().split('T')[0];
    setStreak(prev => {
      if (prev.lastDate === today) return prev; // Already updated today
      
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (prev.lastDate === yesterday) {
        return { current: prev.current + 1, lastDate: today };
      }
      return { current: 1, lastDate: today }; // Reset or first time
    });
  };

  const toggleSolved = (id) => {
    const newSolved = new Set(solved);
    if (newSolved.has(id)) {
      newSolved.delete(id);
    } else {
      newSolved.add(id);
      updateStreak();
    }
    setSolved(newSolved);
  };

  const toggleSetItem = (setObj, setter, id) => {
    const newSet = new Set(setObj);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setter(newSet);
  };

  const saveNote = (id, text) => {
    setNotes(prev => ({ ...prev, [id]: text }));
  };

  const getStepProgress = (stepN) => {
    const stepProblems = problems.filter(p => p.step === stepN);
    const solvedCount = stepProblems.filter(p => solved.has(p.id)).length;
    return { solvedCount, total: stepProblems.length };
  };

  const groupProblemsByTopic = (problemList) => {
    const topicsMap = {};
    problemList.forEach(p => {
      if (!topicsMap[p.topic]) topicsMap[p.topic] = [];
      topicsMap[p.topic].push(p);
    });
    return topicsMap;
  };

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (dailyState && dailyState.date === today) return;

    let newDaily = null;
    for (const step of steps) {
      const stepProblems = problems.filter(p => p.step === step.n);
      const stepTopics = groupProblemsByTopic(stepProblems);
      
      for (const [topic, tProblems] of Object.entries(stepTopics)) {
        const unsolved = tProblems.filter(p => !solved.has(p.id));
        if (unsolved.length > 0) {
          const todayProblems = unsolved.slice(0, 3);
          newDaily = {
            date: today,
            step,
            topic,
            problemIds: todayProblems.map(p => p.id),
            cfTag: getCFTag(topic),
            totalRemaining: unsolved.length
          };
          break;
        }
      }
      if (newDaily) break;
    }
    
    if (newDaily) {
      localStorage.setItem('a2z-daily', JSON.stringify(newDaily));
      setDailyState(newDaily);
    }
  }, [steps, problems, solved, dailyState]);

  const getPlatformColor = (platform) => {
    if (platform === 'leetcode') return { bg: '#FFA11620', color: '#FFA116' };
    if (platform === 'gfg') return { bg: '#2F8D4620', color: '#2F8D46' };
    if (platform === 'takeuforward') return { bg: '#3B82F620', color: '#60A5FA' };
    return { bg: 'rgba(255,255,255,0.1)', color: '#fff' };
  };

  const renderProblemList = (problemList) => {
    return (
      <div className="problem-list">
        {problemList.map((problem) => {
          const platColors = getPlatformColor(problem.platform);
          const hasNote = notes[problem.id] && notes[problem.id].trim().length > 0;
          const isNoteActive = activeNoteId === problem.id;

          return (
            <div key={problem.id} className="problem-row" style={{ display: 'block' }}>
              <div style={{ display: 'flex' }}>
                <div className="checkbox-container">
                  <input 
                    type="checkbox" 
                    className="custom-checkbox"
                    checked={solved.has(problem.id)}
                    onChange={() => toggleSolved(problem.id)}
                    title="Mark as solved"
                  />
                </div>
                <div className="problem-info" style={{ width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="problem-title">{problem.title}</div>
                    <div className="problem-badges">
                      {problem.difficulty && (
                        <span className={`badge difficulty-${problem.difficulty.toLowerCase()}`}>
                          {problem.difficulty}
                        </span>
                      )}
                      <span className="badge" style={{ background: platColors.bg, color: platColors.color, borderColor: platColors.color }}>
                        {problem.platform}
                      </span>
                    </div>
                  </div>
                  
                  <div className="learning-actions" style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
                    {problem.video && (
                      <a href={problem.video} target="_blank" rel="noreferrer" className="learn-btn youtube">
                        <YoutubeIcon /> Watch
                      </a>
                    )}
                    {problem.article && (
                      <a href={problem.article} target="_blank" rel="noreferrer" className="learn-btn article">
                        <ArticleIcon /> Read
                      </a>
                    )}
                    {problem.url && (
                      <a href={problem.url} target="_blank" rel="noreferrer" className="learn-btn practice">
                        <CodeIcon /> Solve
                      </a>
                    )}
                    <div style={{ flex: 1 }}></div>
                    <button 
                      className={`action-btn ${bookmarked.has(problem.id) ? 'active-bookmark' : ''}`} 
                      onClick={() => toggleSetItem(bookmarked, setBookmarked, problem.id)}
                      title="Bookmark"
                    >
                      <BookmarkIcon filled={bookmarked.has(problem.id)} />
                    </button>
                    <button 
                      className={`action-btn ${review.has(problem.id) ? 'active-review' : ''}`} 
                      onClick={() => toggleSetItem(review, setReview, problem.id)}
                      title="Needs Review"
                    >
                      <ReviewIcon />
                    </button>
                    <button 
                      className={`action-btn ${hasNote || isNoteActive ? 'active-notes' : ''}`} 
                      onClick={() => setActiveNoteId(isNoteActive ? null : problem.id)}
                      title="Notes"
                    >
                      <NotesIcon />
                    </button>
                  </div>
                </div>
              </div>

              {isNoteActive && (
                <div className="notes-container animate-fade-in" style={{ marginLeft: '48px', marginTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>📝 Personal Notes</label>
                  <textarea
                    className="notes-textarea"
                    placeholder="E.g. Use a hashmap to store complements to achieve O(n) time complexity..."
                    value={notes[problem.id] || ''}
                    onChange={(e) => saveNote(problem.id, e.target.value)}
                    style={{ width: '100%', minHeight: '80px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '12px', color: '#fff', fontSize: '0.9rem', resize: 'vertical' }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderRoadmapView = () => {
    const totalProblems = problems.length;
    const solvedArray = Array.from(solved);
    const solvedA2z = solvedArray.filter(id => !id.startsWith('cf-daily')).length;
    const solvedCf = solvedArray.filter(id => id.startsWith('cf-daily')).length;

    return (
      <div className="animate-fade-in">
        <div className="main-header">
          <h2>Master Roadmap</h2>
          <p>Your ultimate tracking dashboard for DSA interviews and Competitive Programming.</p>
        </div>

        <div className="roadmap-dashboard">
          <div className="stat-widget">
            <h4>A2Z Progress</h4>
            <div className="stat-value">{Math.round((solvedA2z / totalProblems) * 100 || 0)}%</div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '8px' }}>Curriculum Mastered</p>
          </div>
          <div className="stat-widget">
            <h4>CP Readiness</h4>
            <div className="stat-value">{solvedCf}</div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '8px' }}>Codeforces Topics</p>
          </div>
          <div className="stat-widget">
            <h4>Total Solved</h4>
            <div className="stat-value">{solvedA2z + solvedCf}</div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '8px' }}>Problems Finished</p>
          </div>
          <div className="stat-widget" style={{ borderColor: 'rgba(249, 115, 22, 0.3)', background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1), rgba(239, 68, 68, 0.1))' }}>
            <h4 style={{ color: '#f97316' }}>Daily Streak</h4>
            <div className="stat-value" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'linear-gradient(to right, #f97316, #ef4444)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
              <FireIcon /> {streak.current}
            </div>
            <p style={{ color: '#fb923c', fontSize: '0.9rem', marginTop: '8px', opacity: 0.8 }}>Keep it up!</p>
          </div>
        </div>

        <div className="roadmap-grid">
          {steps.map(step => {
            const progress = getStepProgress(step.n);
            if (progress.total === 0) return null;
            
            return (
              <div 
                key={step.n} 
                className="roadmap-card"
                onClick={() => setActiveView(step.n)}
              >
                <div className="roadmap-step-num">Step {step.n}</div>
                <div className="roadmap-title">{step.title}</div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  <span>Progress</span>
                  <span>{progress.solvedCount} / {progress.total}</span>
                </div>
                
                <div className="progress-bar-container" style={{ background: 'rgba(255,255,255,0.05)', height: '6px' }}>
                  <div 
                    className="progress-bar" 
                    style={{ 
                      width: `${(progress.solvedCount / progress.total) * 100}%`,
                      background: progress.solvedCount === progress.total ? '#10b981' : 'linear-gradient(to right, #3b82f6, #a78bfa)'
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderTimelineView = () => {
    if (!dailyState) {
      return (
        <div className="main-header animate-fade-in">
          <h2>🎉 Congratulations!</h2>
          <p>You have completed all problems in the A2Z DataSheet.</p>
        </div>
      );
    }

    const dailyProblems = problems.filter(p => dailyState.problemIds.includes(p.id));
    const cfId = `cf-daily-${dailyState.topic.replace(/\s+/g, '-')}-${dailyState.date}`;

    return (
      <div className="animate-fade-in">
        <div className="main-header">
          <h2>Today's Daily Plan ({dailyState.date})</h2>
          <p>Based on your progress, you are currently on <strong>Step {dailyState.step.n}: {dailyState.step.title}</strong>.</p>
        </div>
        
        <div className="timeline-card">
          <div className="timeline-card-header">
            <div>
              <div className="timeline-step">Current Topic</div>
              <h3>{dailyState.topic}</h3>
            </div>
            <div className="timeline-progress" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', borderColor: 'rgba(59, 130, 246, 0.3)'}}>
              {dailyState.totalRemaining} Problems Left
            </div>
          </div>
          
          <div className="topic-section" style={{ border: 'none', background: 'transparent', marginBottom: 0 }}>
            <div style={{ padding: '20px 24px', color: 'var(--text-secondary)', fontSize: '0.9rem', borderBottom: '1px solid rgba(255,255,255,0.05)'}}>
              🎯 <strong>Objective 1:</strong> Solve {dailyProblems.length} A2Z problem{dailyProblems.length > 1 ? 's' : ''} to build muscle memory.
            </div>
            {renderProblemList(dailyProblems)}
            
            <div style={{ padding: '20px 24px', color: 'var(--text-secondary)', fontSize: '0.9rem', borderBottom: '1px solid rgba(255,255,255,0.05)', borderTop: '1px solid rgba(255,255,255,0.05)'}}>
              🎯 <strong>Objective 2:</strong> Solve 1 Codeforces problem to build logic and speed.
            </div>
            
            <div className="problem-list">
              <div className="problem-row" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <div style={{ display: 'flex' }}>
                  <div className="checkbox-container">
                    <input 
                      type="checkbox" 
                      className="custom-checkbox"
                      checked={solved.has(cfId)}
                      onChange={() => toggleSolved(cfId)}
                    />
                  </div>
                  <div className="problem-info" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div className="problem-title">Codeforces Practice: {dailyState.topic}</div>
                      <div className="problem-badges">
                        <span className="badge" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderColor: '#ef4444' }}>Codeforces</span>
                      </div>
                    </div>
                    <div className="learning-actions" style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                      <a href={`https://codeforces.com/problemset?tags=${dailyState.cfTag}`} target="_blank" rel="noreferrer" className="learn-btn practice" style={{ color: '#ef4444', borderColor: 'rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.05)'}}>
                        <CodeforcesIcon /> Find CP Problem
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStepView = (stepN) => {
    const activeStepMeta = steps.find(s => s.n === stepN);
    const activeProblems = problems.filter(p => p.step === stepN);
    const topicsMap = groupProblemsByTopic(activeProblems);

    return (
      <div className="animate-fade-in">
        <div className="main-header">
          <h2>Step {stepN}: {activeStepMeta?.title}</h2>
          <p>Complete the topics below to master this step.</p>
        </div>

        {Object.entries(topicsMap).map(([topic, topicProblems], index) => {
          const topicSolved = topicProblems.filter(p => solved.has(p.id)).length;
          
          return (
            <div key={topic} className="topic-section animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="topic-header">
                <h3>{topic}</h3>
                <span className="topic-progress">{topicSolved} / {topicProblems.length} A2Z</span>
              </div>
              {renderProblemList(topicProblems)}
              
              <div className="problem-row" style={{ borderTop: '1px dashed rgba(255,255,255,0.1)', background: 'rgba(239, 68, 68, 0.02)', marginTop: '8px' }}>
                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <CodeforcesIcon style={{ color: '#ef4444' }}/>
                    <div className="problem-title" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Bonus CP Practice: {topic}</div>
                  </div>
                  <a href={`https://codeforces.com/problemset?tags=${getCFTag(topic)}`} target="_blank" rel="noreferrer" className="btn-icon platform" style={{ color: '#ef4444', borderColor: 'rgba(239,68,68,0.3)'}}>
                    <CodeIcon />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>Striver A2Z Replica</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            {Array.from(solved).filter(id => !id.startsWith('cf-daily')).length} Tasks Completed
          </p>
        </div>
        
        <div className="sidebar-content">
          <div 
            className={`step-item timeline-btn ${activeView === 'roadmap' ? 'active' : ''}`}
            onClick={() => setActiveView('roadmap')}
            style={{ marginBottom: '8px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <RoadmapIcon />
              <span style={{ fontWeight: '600', fontSize: '1rem' }}>Roadmap Overview</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Your Master Progress Dashboard
            </p>
          </div>

          <div 
            className={`step-item timeline-btn ${activeView === 'timeline' ? 'active' : ''}`}
            onClick={() => setActiveView('timeline')}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TimelineIcon />
              <span style={{ fontWeight: '600', fontSize: '1rem' }}>Daily Plan</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Auto-shifting LC & CF tasks
            </p>
          </div>
          
          <hr className="sidebar-divider" />

          {steps.map(step => {
            const progress = getStepProgress(step.n);
            if (progress.total === 0) return null;
            
            return (
              <div 
                key={step.n} 
                className={`step-item ${activeView === step.n ? 'active' : ''}`}
                onClick={() => setActiveView(step.n)}
              >
                <div className="step-number">Step {step.n}</div>
                <div className="step-title">{step.title}</div>
                <div className="step-meta">
                  <span>{progress.solvedCount} / {progress.total} A2Z</span>
                  <div className="progress-bar-container" style={{ width: '60px', marginLeft: 'auto', background: 'rgba(255,255,255,0.1)' }}>
                    <div 
                      className="progress-bar" 
                      style={{ width: `${(progress.solvedCount / progress.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </aside>

      <main className="main-content">
        {activeView === 'roadmap' ? renderRoadmapView() : (activeView === 'timeline' ? renderTimelineView() : renderStepView(activeView))}
      </main>
    </>
  );
}

export default App;
