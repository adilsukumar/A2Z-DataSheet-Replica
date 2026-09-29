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

function App() {
  // activeView can be a step number (e.g., 1, 2) or 'timeline'
  const [activeView, setActiveView] = useState('timeline');
  const [solved, setSolved] = useState(() => {
    const saved = localStorage.getItem('a2z-solved');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const { steps, problems } = data;

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
    const stepProblems = problems.filter(p => p.step === stepN);
    const solvedCount = stepProblems.filter(p => solved.has(p.id)).length;
    return { solvedCount, total: stepProblems.length };
  };

  // Helper to group problems by topic
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

  // Calculate "Today's Recommended Module"
  // Logic: Find the first step, and within it the first topic, that is not 100% completed.
  const getDailyRecommendation = () => {
    for (const step of steps) {
      const stepProblems = problems.filter(p => p.step === step.n);
      const stepTopics = groupProblemsByTopic(stepProblems);
      
      for (const [topic, tProblems] of Object.entries(stepTopics)) {
        const topicSolved = tProblems.filter(p => solved.has(p.id)).length;
        if (topicSolved < tProblems.length) {
          return { step, topic, problems: tProblems, solved: topicSolved, total: tProblems.length };
        }
      }
    }
    return null; // Everything is solved!
  };

  const renderProblemList = (topicProblems) => {
    return (
      <div className="problem-list">
        {topicProblems.map((problem) => (
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
                <span className="badge">{problem.tier}</span>
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
    const recommendation = getDailyRecommendation();

    if (!recommendation) {
      return (
        <div className="main-header animate-fade-in">
          <h2>🎉 Congratulations!</h2>
          <p>You have completed the entire A2Z DataSheet. You are ready for interviews!</p>
        </div>
      );
    }

    return (
      <div className="animate-fade-in">
        <div className="main-header">
          <h2>Today's Daily Plan</h2>
          <p>Based on your progress, here is your dynamically routed timeline for today.</p>
        </div>
        
        <div className="timeline-card">
          <div className="timeline-card-header">
            <div>
              <div className="timeline-step">Step {recommendation.step.n}: {recommendation.step.title}</div>
              <h3>Current Module: {recommendation.topic}</h3>
            </div>
            <div className="timeline-progress">
              {recommendation.solved} / {recommendation.total} Solved
            </div>
          </div>
          
          <div className="topic-section" style={{ border: 'none', background: 'transparent' }}>
            {renderProblemList(recommendation.problems)}
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
                <span className="topic-progress">{topicSolved} / {topicProblems.length}</span>
              </div>
              {renderProblemList(topicProblems)}
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
            {solved.size} / {problems.length} Solved
          </p>
          <div className="progress-bar-container" style={{ marginTop: '12px' }}>
            <div 
              className="progress-bar" 
              style={{ width: `${(solved.size / problems.length) * 100}%` }}
            ></div>
          </div>
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
              Auto-shifting timeline
            </p>
          </div>
          
          <hr className="sidebar-divider" />

          {steps.map(step => {
            const progress = getStepProgress(step.n);
            return (
              <div 
                key={step.n} 
                className={`step-item ${activeView === step.n ? 'active' : ''}`}
                onClick={() => setActiveView(step.n)}
              >
                <div className="step-number">Step {step.n}</div>
                <div className="step-title">{step.title}</div>
                <div className="step-meta">
                  <span>{progress.solvedCount} / {progress.total}</span>
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
