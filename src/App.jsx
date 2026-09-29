import React, { useState, useEffect } from 'react';
import data from './data.json';

const YoutubeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

const ArticleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const CodeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

const TimelineIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const CodeforcesIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="14" width="4" height="7" fill="currentColor" stroke="none"></rect>
    <rect x="10" y="7" width="4" height="14" fill="currentColor" stroke="none"></rect>
    <rect x="17" y="3" width="4" height="18" fill="currentColor" stroke="none"></rect>
  </svg>
);

// Map A2Z topics to Codeforces tags
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
  const [activeView, setActiveView] = useState('timeline');
  const [solved, setSolved] = useState(() => {
    const saved = localStorage.getItem('a2z-solved');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const { problems } = data;
  const steps = data.meta.steps || [];

  useEffect(() => {
    localStorage.setItem('a2z-solved', JSON.stringify(Array.from(solved)));
  }, [solved]);

  const toggleSolved = (id) => {
    const newSolved = new Set(solved);
    if (newSolved.has(id)) {
      newSolved.delete(id);
    } else {
      newSolved.add(id);
    }
    setSolved(newSolved);
  };

  const getStepProgress = (stepN) => {
    const stepProblems = problems.filter(p => p.step === stepN && p.platform !== 'gfg');
    const solvedCount = stepProblems.filter(p => solved.has(p.id)).length;
    return { solvedCount, total: stepProblems.length };
  };

  const groupProblemsByTopic = (problemList) => {
    const topicsMap = {};
    problemList.forEach(p => {
      if (!topicsMap[p.topic]) {
        topicsMap[p.topic] = [];
      }
      topicsMap[p.topic].push(p);
    });
    return topicsMap;
  };

  // Calculate Today's Daily Plan
  const getDailyRecommendation = () => {
    for (const step of steps) {
      // Filter out GFG globally for the timeline as requested
      const stepProblems = problems.filter(p => p.step === step.n && p.platform !== 'gfg');
      const stepTopics = groupProblemsByTopic(stepProblems);
      
      for (const [topic, tProblems] of Object.entries(stepTopics)) {
        const unsolved = tProblems.filter(p => !solved.has(p.id));
        if (unsolved.length > 0) {
          // If a topic is big, take up to 3 Leetcode problems for today's practice
          const todayLeetcode = unsolved.slice(0, 3);
          
          return { 
            step, 
            topic, 
            leetcode: todayLeetcode,
            cfTag: getCFTag(topic),
            totalRemaining: unsolved.length
          };
        }
      }
    }
    return null;
  };

  const renderProblemList = (problemList) => {
    return (
      <div className="problem-list">
        {problemList.map((problem) => (
          <div key={problem.id} className="problem-row">
            <div className="checkbox-container">
              <input 
                type="checkbox" 
                className="custom-checkbox"
                checked={solved.has(problem.id)}
                onChange={() => toggleSolved(problem.id)}
                title="Mark as solved"
              />
            </div>
            <div className="problem-info">
              <div className="problem-title">{problem.title}</div>
              <div className="problem-badges">
                {problem.difficulty && (
                  <span className={`badge difficulty-${problem.difficulty.toLowerCase()}`}>
                    {problem.difficulty}
                  </span>
                )}
                <span className="badge">{problem.platform}</span>
              </div>
            </div>
            <div className="problem-actions">
              {problem.video && (
                <a href={problem.video} target="_blank" rel="noreferrer" className="btn-icon youtube" title="Watch Video">
                  <YoutubeIcon />
                </a>
              )}
              {problem.article && (
                <a href={problem.article} target="_blank" rel="noreferrer" className="btn-icon article" title="Read Article">
                  <ArticleIcon />
                </a>
              )}
              {problem.url && (
                <a href={problem.url} target="_blank" rel="noreferrer" className="btn-icon platform" title="Solve Problem">
                  <CodeIcon />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderTimelineView = () => {
    const rec = getDailyRecommendation();

    if (!rec) {
      return (
        <div className="main-header animate-fade-in">
          <h2>🎉 Congratulations!</h2>
          <p>You have completed all LeetCode problems in the A2Z DataSheet.</p>
        </div>
      );
    }

    const cfId = `cf-daily-${rec.topic.replace(/\s+/g, '-')}`;

    return (
      <div className="animate-fade-in">
        <div className="main-header">
          <h2>Today's Daily Plan</h2>
          <p>Based on your progress, you are currently on <strong>Step {rec.step.n}: {rec.step.title}</strong>.</p>
        </div>
        
        <div className="timeline-card">
          <div className="timeline-card-header">
            <div>
              <div className="timeline-step">Current Topic</div>
              <h3>{rec.topic}</h3>
            </div>
            <div className="timeline-progress" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', borderColor: 'rgba(59, 130, 246, 0.3)'}}>
              {rec.totalRemaining} LC Problems Left
            </div>
          </div>
          
          <div className="topic-section" style={{ border: 'none', background: 'transparent', marginBottom: 0 }}>
            <div style={{ padding: '20px 24px', color: 'var(--text-secondary)', fontSize: '0.9rem', borderBottom: '1px solid rgba(255,255,255,0.05)'}}>
              🎯 <strong>Objective 1:</strong> Solve {rec.leetcode.length} LeetCode problem{rec.leetcode.length > 1 ? 's' : ''} to build muscle memory.
            </div>
            {renderProblemList(rec.leetcode)}
            
            <div style={{ padding: '20px 24px', color: 'var(--text-secondary)', fontSize: '0.9rem', borderBottom: '1px solid rgba(255,255,255,0.05)', borderTop: '1px solid rgba(255,255,255,0.05)'}}>
              🎯 <strong>Objective 2:</strong> Solve 1 Codeforces problem to build logic and speed.
            </div>
            
            <div className="problem-list">
              <div className="problem-row" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <div className="checkbox-container">
                  <input 
                    type="checkbox" 
                    className="custom-checkbox"
                    checked={solved.has(cfId)}
                    onChange={() => toggleSolved(cfId)}
                  />
                </div>
                <div className="problem-info">
                  <div className="problem-title">Codeforces Practice: {rec.topic}</div>
                  <div className="problem-badges">
                    <span className="badge" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>Codeforces</span>
                    <span className="badge">Tag: {rec.cfTag}</span>
                  </div>
                </div>
                <div className="problem-actions">
                  <a href={`https://codeforces.com/problemset?tags=${rec.cfTag}`} target="_blank" rel="noreferrer" className="btn-icon platform" title="Find a Codeforces Problem" style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)'}}>
                    <CodeforcesIcon />
                  </a>
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
    // For regular view, we also filter out GFG as requested
    const activeProblems = problems.filter(p => p.step === stepN && p.platform !== 'gfg');
    const topicsMap = groupProblemsByTopic(activeProblems);

    return (
      <div className="animate-fade-in">
        <div className="main-header">
          <h2>Step {stepN}: {activeStepMeta?.title}</h2>
          <p>Complete the topics below to master this step. GFG problems have been hidden.</p>
        </div>

        {Object.entries(topicsMap).map(([topic, topicProblems], index) => {
          const topicSolved = topicProblems.filter(p => solved.has(p.id)).length;
          // Add a virtual Codeforces task for the topic in the list view too
          const cfId = `cf-daily-${topic.replace(/\s+/g, '-')}`;
          const isCfSolved = solved.has(cfId);
          
          return (
            <div key={topic} className="topic-section animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="topic-header">
                <h3>{topic}</h3>
                <span className="topic-progress">{topicSolved + (isCfSolved ? 1 : 0)} / {topicProblems.length + 1}</span>
              </div>
              {renderProblemList(topicProblems)}
              <div className="problem-row" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)' }}>
                <div className="checkbox-container">
                  <input type="checkbox" className="custom-checkbox" checked={isCfSolved} onChange={() => toggleSolved(cfId)} />
                </div>
                <div className="problem-info">
                  <div className="problem-title">CF Practice: {topic}</div>
                  <div className="problem-badges"><span className="badge" style={{color: '#ef4444'}}>Codeforces</span></div>
                </div>
                <div className="problem-actions">
                  <a href={`https://codeforces.com/problemset?tags=${getCFTag(topic)}`} target="_blank" rel="noreferrer" className="btn-icon platform"><CodeforcesIcon /></a>
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
            {solved.size} Tasks Completed
          </p>
        </div>
        
        <div className="sidebar-content">
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
            // Ignore steps with 0 non-GFG problems
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
                  <span>{progress.solvedCount} / {progress.total} LC</span>
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
        {activeView === 'timeline' ? renderTimelineView() : renderStepView(activeView)}
      </main>
    </>
  );
}

export default App;
