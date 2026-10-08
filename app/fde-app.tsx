"use client";

import { useEffect, useMemo, useState } from "react";
import { STAGES, ALL_LESSONS, TOTAL_LESSONS, MOSH, type Lesson } from "./fde-course";

const PROG_KEY = "fde_prog_v1";
const QUIZ_KEY = "fde_quiz_v1";
const LAST_KEY = "fde_last_v1";

function loadMap(key: string): Record<string, unknown> {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as Record<string, unknown>) : {};
  } catch {
    return {};
  }
}
function saveMap(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

export default function FdeApp() {
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [quiz, setQuiz] = useState<Record<string, { pick: number; correct: boolean }>>({});
  const [current, setCurrent] = useState<string>(ALL_LESSONS[0].lesson.id);
  const [openStages, setOpenStages] = useState<Record<string, boolean>>(() => {
    const o: Record<string, boolean> = {};
    STAGES.forEach((s, i) => (o[s.id] = i <= 2));
    return o;
  });
  const [navOpen, setNavOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setProgress(loadMap(PROG_KEY) as Record<string, boolean>);
    setQuiz(loadMap(QUIZ_KEY) as Record<string, { pick: number; correct: boolean }>);
    try {
      const last = localStorage.getItem(LAST_KEY);
      if (last && ALL_LESSONS.some((l) => l.lesson.id === last)) setCurrent(last);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  const idx = useMemo(() => ALL_LESSONS.findIndex((l) => l.lesson.id === current), [current]);
  const entry = ALL_LESSONS[idx] ?? ALL_LESSONS[0];
  const lesson = entry.lesson;
  const stage = entry.stage;

  const doneCount = Object.values(progress).filter(Boolean).length;
  const pct = Math.round((doneCount / TOTAL_LESSONS) * 100);

  function go(id: string) {
    setCurrent(id);
    saveMap(LAST_KEY, id);
    const owner = STAGES.find((s) => s.lessons.some((l) => l.id === id));
    if (owner) setOpenStages((o) => ({ ...o, [owner.id]: true }));
    setNavOpen(false);
    const pane = document.getElementById("pane");
    if (pane) pane.scrollTop = 0;
    window.scrollTo(0, 0);
  }

  function toggleComplete() {
    setProgress((p) => {
      const next = { ...p };
      if (next[lesson.id]) delete next[lesson.id];
      else next[lesson.id] = true;
      saveMap(PROG_KEY, next);
      return next;
    });
    if (!progress[lesson.id] && idx < TOTAL_LESSONS - 1) go(ALL_LESSONS[idx + 1].lesson.id);
  }

  function answer(qid: string, pick: number, correctIndex: number) {
    setQuiz((q) => {
      if (q[qid]) return q;
      const next = { ...q, [qid]: { pick, correct: pick === correctIndex } };
      saveMap(QUIZ_KEY, next);
      return next;
    });
  }

  function resetAll() {
    setProgress({});
    setQuiz({});
    saveMap(PROG_KEY, {});
    saveMap(QUIZ_KEY, {});
  }

  return (
    <div className="app-shell">
      <div className={"scrim" + (navOpen ? " open" : "")} onClick={() => setNavOpen(false)} />
      <aside className={"sidebar" + (navOpen ? " open" : "")}>
        <div className="brand">
          <div className="brand-mark">F</div>
          <div>
            <strong>FDE Academy</strong>
            <span>FORWARD DEPLOYED</span>
          </div>
        </div>
        <div className="rail-progress">
          <div className="bar">
            <i style={{ width: (hydrated ? pct : 0) + "%" }} />
          </div>
          <small>{hydrated ? `${doneCount}/${TOTAL_LESSONS} lessons · ${pct}%` : " "}</small>
        </div>
        <nav className="modnav">
          {STAGES.map((s) => {
            const done = s.lessons.filter((l) => progress[l.id]).length;
            const open = !!openStages[s.id];
            return (
              <div key={s.id}>
                <button className={"mod-h" + (open ? " open" : "")} onClick={() => setOpenStages((o) => ({ ...o, [s.id]: !o[s.id] }))}>
                  <span className="lbl">
                    <b>{s.title}</b>
                    <i>{s.kicker}{s.weeks ? " · " + s.weeks : ""}</i>
                  </span>
                  <span className="cnt">{done}/{s.lessons.length}</span>
                  <span className="car">▸</span>
                </button>
                {open &&
                  s.lessons.map((l) => (
                    <button
                      key={l.id}
                      className={"lessonrow" + (progress[l.id] ? " done" : "") + (s.outline ? " outline" : "") + (l.id === current ? " active" : "")}
                      onClick={() => go(l.id)}
                    >
                      <span className="tk" />
                      <span>{l.title}</span>
                    </button>
                  ))}
              </div>
            );
          })}
        </nav>
        <button className="resetbtn" onClick={resetAll}>reset all progress</button>
      </aside>

      <div>
        <div className="mobilebar">
          <button onClick={() => setNavOpen(true)} aria-label="Menu">☰</button>
          <strong>FDE Academy</strong>
        </div>
        <main className="main-area" id="pane">
          <LessonView
            key={lesson.id}
            lesson={lesson}
            kicker={`${stage.kicker}${stage.weeks ? " · " + stage.weeks : ""}`}
            isWelcome={lesson.id === "welcome"}
            quiz={quiz}
            onAnswer={answer}
            done={!!progress[lesson.id]}
            onToggle={toggleComplete}
            onPrev={idx > 0 ? () => go(ALL_LESSONS[idx - 1].lesson.id) : undefined}
            onNext={idx < TOTAL_LESSONS - 1 ? () => go(ALL_LESSONS[idx + 1].lesson.id) : undefined}
          />
        </main>
      </div>
    </div>
  );
}

function LessonView({
  lesson,
  kicker,
  isWelcome,
  quiz,
  onAnswer,
  done,
  onToggle,
  onPrev,
  onNext,
}: {
  lesson: Lesson;
  kicker: string;
  isWelcome: boolean;
  quiz: Record<string, { pick: number; correct: boolean }>;
  onAnswer: (qid: string, pick: number, correctIndex: number) => void;
  done: boolean;
  onToggle: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}) {
  const [revealed, setRevealed] = useState(false);

  return (
    <>
      {isWelcome ? (
        <div className="hero-panel">
          <div className="crumb" style={{ color: "#a8c1bb" }}>Forward Deployed Engineer</div>
          <h2>{lesson.title}</h2>
          <p>Your private training academy — same home as the course, one place you return to whenever you get time.</p>
          <div className="hero-chips">
            <span><b>~5–6</b> months</span>
            <span><b>3</b> hrs/day</span>
            <span><b>6</b> stages</span>
            <span>earn from <b>~month 2</b></span>
          </div>
        </div>
      ) : (
        <>
          <div className="crumb">{kicker}</div>
          <h1 className="lesson-title">{lesson.title}</h1>
        </>
      )}

      {lesson.learn && (
        <div className="seg">
          {!isWelcome && <div className="seg-k">Learn</div>}
          <div className="prose" dangerouslySetInnerHTML={{ __html: lesson.learn }} />
        </div>
      )}

      {lesson.watch && (
        <div className="seg">
          <div className="seg-k">Watch — {lesson.watch.label}</div>
          <div className="embed">
            <iframe
              src={`https://www.youtube.com/embed/${MOSH}?start=${lesson.watch.start}&rel=0`}
              title={lesson.watch.label}
              loading="lazy"
              allow="accelerometer; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="embed-meta">
            <span>{lesson.watch.meta}</span>
            <a href={`https://www.youtube.com/watch?v=${MOSH}&t=${lesson.watch.start}s`} target="_blank" rel="noopener">open on YouTube ↗</a>
          </div>
        </div>
      )}

      {lesson.code && (
        <div className="seg">
          <div className="seg-k">Try — predict, then run</div>
          <pre className="code">{lesson.code}</pre>
          {lesson.hint && <div className="hint">{lesson.hint}</div>}
          {lesson.reveal && !revealed && (
            <button className="revealbtn" onClick={() => setRevealed(true)}>Show answer</button>
          )}
          {lesson.reveal && revealed && <div className="revealans">{lesson.reveal}</div>}
        </div>
      )}

      {!lesson.code && lesson.hint && (
        <div className="seg"><div className="hint">{lesson.hint}</div></div>
      )}

      {lesson.task && (
        <div className="seg">
          <div className="seg-k">Do</div>
          <div className="task">{lesson.task}</div>
        </div>
      )}

      {lesson.quiz && lesson.quiz.length > 0 && (
        <div className="seg">
          <div className="seg-k">Check</div>
          <div className="quiz">
            {lesson.quiz.map((q, i) => {
              const qid = `${lesson.id}_q${i}`;
              const prev = quiz[qid];
              return (
                <div className="q" key={qid}>
                  <div className="qt" dangerouslySetInnerHTML={{ __html: q.q }} />
                  <div className="opts">
                    {q.options.map((opt, oi) => {
                      let cls = "opt";
                      if (prev) {
                        if (oi === q.answer) cls += " correct";
                        else if (oi === prev.pick && !prev.correct) cls += " wrong";
                      }
                      return (
                        <button key={oi} className={cls} disabled={!!prev} onClick={() => onAnswer(qid, oi, q.answer)}>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {prev && <div className="explain">{q.explain}</div>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="lfoot">
        <button className="navbtn" onClick={onPrev} disabled={!onPrev}>← Prev</button>
        <button className={"complete" + (done ? " isdone" : "")} onClick={onToggle}>
          {done ? "✓ Completed — click to undo" : "Mark complete"}
        </button>
        <button className="navbtn" onClick={onNext} disabled={!onNext}>Next →</button>
      </div>
    </>
  );
}
