export const MOSH = "_uQrJ0TkZlc";

export type Quiz = { q: string; options: string[]; answer: number; explain: string };
export type Lesson = {
  id: string;
  title: string;
  learn?: string; // trusted HTML authored here
  watch?: { start: number; label: string; meta: string };
  code?: string;
  hint?: string;
  reveal?: string;
  task?: string;
  quiz?: Quiz[];
};
export type Stage = {
  id: string;
  kicker: string; // "Stage 0"
  title: string;
  weeks: string;
  outline?: boolean;
  lessons: Lesson[];
};

export const STAGES: Stage[] = [
  {
    id: "start",
    kicker: "Welcome",
    title: "Start here",
    weeks: "",
    lessons: [
      {
        id: "welcome",
        title: "How this academy works",
        learn: `
          <p>Welcome, RMK. This is your full Forward Deployed Engineer course, built around your real baseline: strong finance, operations and stakeholder skills, a quant background — and the one gap we're closing, writing and reading code.</p>
          <ul>
            <li><b>Pace:</b> ~3 hrs/day in 2–3 short sittings. Whole path to FDE-capable: ~5–6 months.</li>
            <li><b>Each lesson:</b> <b>Learn</b> (read here) · <b>Watch</b> (video embedded, starts at the right minute) · <b>Try</b> (predict, then run in VS Code) · a quick <b>Check</b>.</li>
            <li><b>The one rule:</b> never keep code you can't explain. AI writes → you read and explain every line → then you keep it.</li>
            <li><b>Progress</b> syncs across your devices once you sign in; it also saves locally in each browser.</li>
          </ul>
          <p>Stages 0–2 are built lesson-by-lesson. Stages 3–5 are outlines with their anchor courses — expanded into daily lessons as you reach them.</p>
          <p><b>Core resources:</b>
            <a href="https://www.youtube.com/watch?v=_uQrJ0TkZlc" target="_blank" rel="noopener">Programming with Mosh — Python Full Course</a> (embedded in each lesson),
            <a href="https://cs50.harvard.edu/python" target="_blank" rel="noopener">Harvard CS50P</a> (deeper second pass),
            <a href="https://www.online-python.com" target="_blank" rel="noopener">online-python.com</a> (run code in a browser).</p>`,
      },
    ],
  },
  {
    id: "s0",
    kicker: "Stage 0",
    title: "Setup & the one habit",
    weeks: "Week 1",
    lessons: [
      {
        id: "s0-1",
        title: "Run your first line",
        learn: `<p>You've installed Python and VS Code — the hard setup is done. Confirm it works: <b>File → New File</b>, save as <code>hello.py</code>, type the code below, press ▶ Run. Output in the bottom panel means your setup works. Line 2 teaches a trap: <code>*</code> happens before <code>+</code>.</p>`,
        watch: { start: 370, label: "First program", meta: "Mosh 6:10" },
        code: `print("hello RMK")\nprint(2 + 2 * 10)`,
        hint: "Predict line 2 before running. It's 22, not 40 — multiplication first.",
        quiz: [{ q: "What does <code>print(2 + 2 * 10)</code> show?", options: ["40", "22", "220", "4"], answer: 1, explain: "2*10=20, then +2 = 22." }],
      },
      {
        id: "s0-2",
        title: "The one habit that makes you an engineer",
        learn: `<p>The whole bridge from "AI builds for me" to "I can build". From now on: AI writes → <b>you read it and say what each line does</b> → only then keep it. Can't explain a line? Ask AI to explain <b>that one line</b>, and write it in your own words.</p>
          <p>Take <code>df = df[df['volume'] > 100000]</code> — you should be able to say "keep only rows where volume is above 100,000." Do only this, consistently, and in ~3 weeks code stops being invisible.</p>`,
        quiz: [{ q: "The core habit this course depends on is:", options: ["Memorising syntax", "Never keeping code you can't explain", "A faster laptop", "Avoiding AI entirely"], answer: 1, explain: "Reading and explaining every line you keep converts AI-orchestration into understanding." }],
      },
      {
        id: "s0-3",
        title: "Your rhythm + where to keep everything",
        learn: `<p>Two decisions, then Stage 1.</p>
          <ul>
            <li><b>Rhythm:</b> split 3 hours into 2–3 sittings at fixed slots. Short and frequent beats one long block.</li>
            <li><b>Where it lives:</b> keep an <code>fde-track</code> folder/repo with a <code>notes.md</code>; save each day as <code>day01.py</code>, <code>day02.py</code>. That notes file is the "explain it back" habit written down.</li>
          </ul>`,
        quiz: [{ q: "Best way to use 3 hours a day?", options: ["One marathon at night", "2–3 shorter sittings", "When you feel like it", "Only when stuck"], answer: 1, explain: "Spacing helps it stick and fits your schedule." }],
      },
    ],
  },
  {
    id: "s1a",
    kicker: "Stage 1 · Week A",
    title: "Read code — values & lists",
    weeks: "Week 2",
    lessons: [
      {
        id: "s1-1",
        title: "First program + variables",
        learn: `<p>A <b>variable</b> is a labelled box holding a value. <code>price = 312</code> puts 312 in a box named <code>price</code>. <code>print(...)</code> shows a value. Code runs top to bottom.</p>`,
        watch: { start: 783, label: "Variables", meta: "Mosh 13:03" },
        code: `price = 312\nqty = 100\nprint(price * qty)`,
        hint: "Predict the number first, then run.",
      },
      {
        id: "s1-2",
        title: "Lists",
        learn: `<p>A <b>list</b> holds many values in order, in <code>[ ]</code>. Positions start at <b>0</b>, so <code>closes[0]</code> is the first item. <code>.append(x)</code> adds to the end; <code>len(list)</code> counts items.</p>`,
        watch: { start: 7550, label: "Lists + List Methods", meta: "Mosh 1:55:50" },
        code: `closes = [310, 312, 318]\ncloses.append(320)\nprint(len(closes))\nprint(closes[0])`,
        hint: "Predict both printed lines, then run.",
        quiz: [{ q: "After <code>nums=[1,2,3]; nums.append(4)</code>, <code>len(nums)</code> is:", options: ["3", "4", "10", "[1,2,3,4]"], answer: 1, explain: "append adds one → 4 items." }],
      },
      {
        id: "s1-3",
        title: "Looping a list",
        learn: `<p>A <b>for loop</b> runs its indented block once per item. Read <code>for c in closes:</code> as "for each value, call it <code>c</code> and do this."</p>`,
        watch: { start: 6108, label: "For Loops", meta: "Mosh 1:41:48" },
        code: `closes = [310, 312, 318]\nfor c in closes:\n    print(c)`,
        hint: "How many lines print, and what are they?",
      },
      {
        id: "s1-4",
        title: "Strings & f-strings",
        learn: `<p>Text in quotes is a <b>string</b>. An <b>f-string</b> (<code>f"..."</code>) drops a variable into text via <code>{ }</code>.</p>`,
        watch: { start: 1771, label: "Strings + Formatted Strings", meta: "Mosh 29:31" },
        code: `ticker = "ENGRO"\nprice = 312\nprint(f"{ticker} trades at {price}")`,
        hint: "Predict the exact text, then run.",
      },
      {
        id: "s1-5",
        title: "Review + checkpoint",
        learn: `<p>No new video. Predict 10 mixed snippets from this week before running. If the check is obvious now, Week A is done.</p>`,
        code: `x = [5, 6]\nx.append(7)\nprint(len(x))\nprint(x[1])`,
        reveal: "len is 3; x[1] is 6 (position 1 = the second item).",
        quiz: [{ q: "<code>x[1]</code> for <code>x=[5,6,7]</code> is:", options: ["5", "6", "7", "1"], answer: 1, explain: "Positions start at 0; x[1] is the second item: 6." }],
      },
    ],
  },
  {
    id: "s1b",
    kicker: "Stage 1 · Week B",
    title: "Read code — dicts & decisions",
    weeks: "Week 3",
    lessons: [
      {
        id: "s1-6",
        title: "Dictionaries",
        learn: `<p>A <b>dictionary</b> stores values under names (<b>keys</b>): <code>{"ticker":"ENGRO","price":312}</code>. Read by key — <code>stock["price"]</code> gives 312.</p>`,
        watch: { start: 8301, label: "Dictionaries", meta: "Mosh 2:18:21" },
        code: `stock = {"ticker": "ENGRO", "price": 312}\nprint(stock["price"])`,
        hint: "Predict, then run.",
        quiz: [{ q: "Get 312 from <code>d={'ticker':'ENGRO','price':312}</code>:", options: ["d.312", "d['price']", "d(price)", "price.d"], answer: 1, explain: "Index a dict by its key." }],
      },
      {
        id: "s1-7",
        title: "range() — the one you missed",
        learn: `<p><code>range(3)</code> is <b>0, 1, 2</b> — starts at 0, stops before 3. So <code>i*2</code> prints 0, 2, 4. (You answered 4, 8, 12 before — this is the fix.)</p>`,
        watch: { start: 6108, label: "For Loops (range)", meta: "Mosh 1:41:48" },
        code: `for i in range(3):\n    print(i * 2)`,
        hint: "It prints 0, 2, 4 — see why, not just that.",
        quiz: [{ q: "<code>for i in range(3): print(i)</code> prints:", options: ["1 2 3", "0 1 2", "0 1 2 3", "3"], answer: 1, explain: "range(3) is 0,1,2." }],
      },
      {
        id: "s1-8",
        title: "Conditions (if / else)",
        learn: `<p><b>if</b> runs a block only when a test is true; <b>else</b> runs otherwise. Read <code>if change &gt; 0:</code> as "if positive, up; else down."</p>`,
        watch: { start: 3497, label: "If Statements", meta: "Mosh 58:17" },
        code: `change = 4\nif change > 0:\n    print("up")\nelse:\n    print("down")`,
        hint: "Change 4 to a negative number and predict again.",
      },
      {
        id: "s1-9",
        title: "Loop + dict together",
        learn: `<p>Real data is a <b>list of dictionaries</b> — one per stock. Loop the list, pull a key each time. This pattern is behind almost every data tool.</p>`,
        watch: { start: 7550, label: "Lists + Dicts recap", meta: "Mosh 1:55 & 2:18" },
        code: `stocks = [{"t": "ENGRO"}, {"t": "LUCK"}]\nfor s in stocks:\n    print(s["t"])`,
        hint: "Predict the two printed lines.",
      },
      {
        id: "s1-10",
        title: "Review + checkpoint",
        learn: `<p>No new video. Predict 10 mixed snippets combining dicts, loops and ifs. Re-watch any weak chapter before the check.</p>`,
        quiz: [{ q: "<code>for i in range(2): print(i+1)</code> prints:", options: ["1 2", "0 1", "1 2 3", "2"], answer: 0, explain: "range(2) is 0,1; i+1 gives 1 then 2." }],
      },
    ],
  },
  {
    id: "s1c",
    kicker: "Stage 1 · Week C",
    title: "Read code — functions & bugs",
    weeks: "Week 4",
    lessons: [
      {
        id: "s1-11",
        title: "Functions",
        learn: `<p>A <b>function</b> is a named, reusable block. <code>def area(w, h):</code> takes two inputs; <code>return</code> hands a result back. Call it with <code>area(3,4)</code> → 12.</p>`,
        watch: { start: 9031, label: "Functions + Parameters", meta: "Mosh 2:30:31" },
        code: `def area(w, h):\n    return w * h\nprint(area(3, 4))`,
        hint: "Predict, then run.",
        quiz: [{ q: "A function is:", options: ["A type of file", "A reusable block that takes inputs and returns a result", "A website", "A database table"], answer: 1, explain: "The building block of every program." }],
      },
      {
        id: "s1-12",
        title: "Write your own",
        learn: `<p>You write one. % change is finance you know, in code: <code>(new − old) / old × 100</code>.</p>`,
        watch: { start: 9885, label: "Return + Reusable Function", meta: "Mosh 2:44:45" },
        code: `def percent_change(old, new):\n    return (new - old) / old * 100\nprint(percent_change(300, 312))`,
        hint: "Predict the % (4.0), then run.",
      },
      {
        id: "s1-13",
        title: "Spot the bug",
        learn: `<p>Reading code means catching errors. A <code>def</code> line must end with a colon <code>:</code> — the snippet below is missing it. Python says "SyntaxError". Fix it, run, and read the error it gave first.</p>`,
        watch: { start: 10422, label: "Exceptions / errors", meta: "Mosh 2:53:42" },
        code: `def add(a, b)\n    return a + b`,
        reveal: "Add a colon:  def add(a, b):  then print(add(2,3)) gives 5.",
        hint: "What's missing after (a, b)?",
      },
      {
        id: "s1-14",
        title: "Read your own real code",
        learn: `<p>The payoff. Open one of your Streamlit tools. Pick 15 lines, explain each in <code>notes.md</code>. Ask Claude only to <i>confirm</i>, never replace. You'll recognise variables, lists, loops, ifs and functions you couldn't see two weeks ago.</p>`,
        task: "Deliverable: 15 lines of your own code, each explained in one sentence in notes.md.",
      },
      {
        id: "s1-15",
        title: "Stage 1 final check",
        learn: `<p>Re-take all four diagnostic questions with no help and no AI. All correct? Your answer to "can you read code?" flips from <b>no</b> to <b>yes</b>.</p>`,
        quiz: [
          { q: "<code>nums=[1,2,3]; nums.append(4); print(len(nums))</code> →", options: ["3", "4", "7", "[1,2,3,4]"], answer: 1, explain: "4 items." },
          { q: "<code>for i in range(3): print(i*2)</code> →", options: ["0 2 4", "2 4 6", "4 8 12", "0 1 2"], answer: 0, explain: "i is 0,1,2 → 0,2,4." },
          { q: "Wrong with <code>def add(a,b)</code> ?", options: ["Nothing", "Missing a colon :", "Wrong name", "Needs a comma"], answer: 1, explain: "def must end with a colon." },
        ],
      },
    ],
  },
  {
    id: "s2",
    kicker: "Stage 2",
    title: "Write code + your first owned tool",
    weeks: "Weeks 4–7",
    lessons: [
      {
        id: "s2-1",
        title: "From reading to writing",
        learn: `<p>Stage 1 was reading; Stage 2 is writing and shipping one finance tool you understand fully. Warm up — write five tiny scripts from a blank file, no copy-paste:</p>
          <ul><li>Print your name and today's date.</li><li>Store 3 prices in a list, print the highest with <code>max()</code>.</li><li>Store a stock as a dict, print one f-string about it.</li><li>Loop 1–5, print each squared.</li><li>if/else printing "gain" or "loss" from a number.</li></ul>`,
        hint: "Struggling is the point. Write first, then check with AI — explain every fix.",
        quiz: [{ q: "Why write from a blank file instead of copying?", options: ["To waste time", "Producing code yourself is the skill Stage 2 builds", "More electricity", "AI requires it"], answer: 1, explain: "Producing code unaided is the new muscle." }],
      },
      {
        id: "s2-2",
        title: "Functions you write",
        learn: `<p>Package logic into functions you reuse. Write two: a % change, and one that labels a move and <i>calls</i> the first. Functions building on functions is how real tools are structured.</p>`,
        watch: { start: 9031, label: "Functions (recap)", meta: "Mosh 2:30:31" },
        code: `def pct(old, new):\n    return (new - old) / old * 100\n\ndef label(old, new):\n    change = pct(old, new)\n    if change > 0:\n        return "gain"\n    return "loss"\n\nprint(pct(300, 312), label(300, 312))`,
        hint: "Predict both outputs (4.0 and gain).",
      },
      {
        id: "s2-3",
        title: "Reading a CSV of prices",
        learn: `<p>Tools work on data files. A <b>CSV</b> is a plain spreadsheet. The easy path is <b>pandas</b>: one line reads the file into a table. Install once in VS Code's terminal: <code>pip install pandas</code>. Make <code>prices.csv</code> with columns <code>ticker,close</code>, then:</p>`,
        code: `import pandas as pd\ndf = pd.read_csv("prices.csv")\nprint(df)\nprint(df["close"].mean())`,
        hint: "df is the table; df['close'].mean() is the average. Ask AI to explain any line.",
        task: "Make prices.csv with 5 PSX tickers + closes, print the average.",
      },
      {
        id: "s2-4",
        title: "Loop the data, compute something",
        learn: `<p>Combine it all: loop the rows, compute, decide. This reads your CSV and prints which stocks closed above the average — your first real analysis in code.</p>`,
        code: `import pandas as pd\ndf = pd.read_csv("prices.csv")\navg = df["close"].mean()\nfor _, row in df.iterrows():\n    if row["close"] > avg:\n        print(row["ticker"], "above average")`,
        hint: "iterrows() hands one row at a time. Explain each line in notes.md.",
      },
      {
        id: "s2-5",
        title: "Project — rebuild one of your tools",
        learn: `<p>The big one. Pick one simple tool you already have (a gainers/losers screener is ideal) and rebuild it with AI — but explain <b>every line</b> as you go. That's the line between a tool you <i>have</i> and one you <i>own</i> — and owning it is what lets you fix it when it breaks (the core FDE skill).</p>`,
        task: "A working finance tool in your fde-track folder, where you can explain every line.",
      },
      {
        id: "s2-6",
        title: "Ship it — GitHub, README, demo",
        learn: `<p>Make it visible. Push to a GitHub repo, write a <code>README.md</code> in your words, and record a 2–3 min screen walkthrough. That video + repo is your <b>first portfolio asset</b> — proof you can build and explain.</p>`,
        task: "Public repo + README + a short demo video link in notes.md.",
        quiz: [{ q: "Why does the demo video matter as much as the code?", options: ["It doesn't", "It proves you understand and can explain your build", "Bigger repo", "GitHub requires it"], answer: 1, explain: "Explaining your build is the FDE differentiator." }],
      },
    ],
  },
  {
    id: "s3",
    kicker: "Stage 3 · outline",
    title: "APIs & LLMs",
    weeks: "Weeks 7–11",
    outline: true,
    lessons: [
      {
        id: "s3-o",
        title: "What this stage covers",
        learn: `<p>Turns you from "uses AI" into "builds with AI". Learn what an API is, call the Claude API from your own code, get structured JSON, and give the model a tool your code runs. Earning target: first paid work ($300–1,000).</p>
          <p><b>Topics (expanded to daily lessons when you reach here):</b> APIs &amp; JSON · Claude Messages API &amp; system prompts · structured output · tool use · shipping as a Streamlit app.</p>
          <p><b>Anchor courses:</b> <a href="https://docs.claude.com" target="_blank" rel="noopener">Claude API docs</a>, <a href="https://www.deeplearning.ai/courses/" target="_blank" rel="noopener">DeepLearning.AI</a>.</p>`,
      },
    ],
  },
  {
    id: "s4",
    kicker: "Stage 4 · outline",
    title: "RAG, agents & a real product",
    weeks: "Weeks 11–16",
    outline: true,
    lessons: [
      {
        id: "s4-o",
        title: "What this stage covers",
        learn: `<p>Build grounded document Q&amp;A (RAG) and a multi-step agent, then package it for real users. Earning target: pilot users or a contract ($1,000–3,000).</p>
          <p><b>Topics:</b> embeddings &amp; retrieval · the agent loop (reason → act → observe) · self-critique · getting 3 real users.</p>
          <p><b>Anchor courses:</b> <a href="https://huggingface.co/learn/agents-course" target="_blank" rel="noopener">Hugging Face AI Agents</a>, <a href="https://www.deeplearning.ai/courses/" target="_blank" rel="noopener">DeepLearning.AI</a>.</p>`,
      },
    ],
  },
  {
    id: "s5",
    kicker: "Stage 5 · outline",
    title: "Reliability, deploy & FDE delivery",
    weeks: "Weeks 16–22",
    outline: true,
    lessons: [
      {
        id: "s5-o",
        title: "What this stage covers",
        learn: `<p>The FDE finish: prove reliability, deploy properly, run discovery → scope → demo → iterate with a real stakeholder. Earning target: anchor client $2,000–5,000/mo, or FDE applications out.</p>
          <p><b>Topics:</b> evals (accuracy, cost, latency) · FastAPI + Docker + secrets + logging · one cloud cert · scoping and delivering a capstone + case study.</p>`,
      },
      {
        id: "roadmap",
        title: "Your earning roadmap",
        learn: `<p>Money checkpoints across the path, at ~3 hrs/day:</p>
          <ul>
            <li><b>~Week 4</b> — can read basic code. <i>$0, building.</i></li>
            <li><b>~Week 7</b> — first owned tool + demo. <i>First portfolio asset.</i></li>
            <li><b>~Week 11</b> — LLM finance tool shipped. <i>First paid work: $300–1,000.</i></li>
            <li><b>~Week 16</b> — Q&amp;A bot + agent, real users. <i>Pilot / contract: $1,000–3,000.</i></li>
            <li><b>~Week 22</b> — deployed capstone + outreach/FDE apps. <i>Anchor: $2,000–5,000/mo.</i></li>
            <li><b>Month 6+</b> — scale, remote FDE offer, or product. <i>$4,000–8,000+/mo or FDE salary.</i></li>
          </ul>
          <p>Honest caveat: targets depend on shipping + outreach, not finishing lessons. Fastest first win is likely automating something inside your own firm.</p>`,
      },
    ],
  },
];

export const ALL_LESSONS: { lesson: Lesson; stage: Stage }[] = STAGES.flatMap((stage) =>
  stage.lessons.map((lesson) => ({ lesson, stage })),
);
export const TOTAL_LESSONS = ALL_LESSONS.length;
