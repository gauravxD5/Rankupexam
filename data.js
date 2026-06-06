/* RankUpExam — data.js | 70-day SSC CGL plan + Hard Shifts */

// ── DATA ────────────────────────────────────────────────
/**
 * RankUpExam — data.js (Official SSC CGL Syllabus — 60+10 Day Plan)
 * Edit ONLY this file for: pdf, mock, yt, ytAnalysis links, topics, titles.
 * Never edit index.html for content changes.
 *
 * Fields per day:
 *   d          → Day number (1–70)
 *   topic      → Day topic heading
 *   sub        → Subtitle / short description
 *   subj       → quant | reasoning | english | ga | mix
 *   type       → normal | weekly-test | full-test | revision | analysis | strategy | pyq
 *   shortcut   → Key trick shown on Today card
 *   topics[]   → Checklist items (4 bullets)
 *   pdf        → Google Drive PDF link (or "#" = Coming Soon)
 *   mock       → Mock test HTML link (or "#" = Coming Soon)
 *   yt         → YouTube solution video link (or "#")
 *   ytAnalysis → YouTube PDF analysis lecture link (or "#")
 *   tags[]     → For filtering
 *   duration   → Estimated study time
 */

const DAYS = [

// ══════════════════════════════════════════════════
// WEEK 1 — QUANT: Number System, LCM/HCF, Surds, %, P&L, SI/CI
// ══════════════════════════════════════════════════
{d:1,topic:"Number System — Foundation",sub:"Types, Divisibility Rules 2–13, Unit Digits, Factorization",subj:"quant",type:"normal",
shortcut:"Digital root method: divide by 9 → sum of digits. Sabse fast divisibility trick!",
topics:["Natural, Whole, Integer, Rational, Irrational, Real number types","Divisibility rules for 2,3,4,5,6,7,8,9,10,11,12,13","Unit digit cyclicity for powers (1–9)","Prime factorization + SSC CGL 2022–24 PYQs"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["number-system","quant"],duration:"50 min"},

{d:2,topic:"LCM & HCF — Complete",sub:"Prime Factorization, Division Method, Word Problems",subj:"quant",type:"normal",
shortcut:"HCF × LCM = Product of two numbers. Always verify with this!",
topics:["Prime factorization method for LCM & HCF","Division method (Euclid algorithm) shortcut","Word problems: bells, ropes, tiles, races","3-number LCM/HCF + SSC PYQs 2019–2024"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["lcm","hcf","quant"],duration:"50 min"},

{d:3,topic:"Surds, Indices & BODMAS",sub:"Laws of Exponents, Simplification, Square/Cube Roots",subj:"quant",type:"normal",
shortcut:"aᵐ × aⁿ = aᵐ⁺ⁿ. Surd comparison: make same power, then compare bases!",
topics:["Laws of indices: product, quotient, power, zero, negative exponent","Surd simplification & rationalization of denominator","BODMAS: Bracket→Of→Div→Mul→Add→Sub strictly","Square root by division method + cube root shortcuts"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["surds","indices","bodmas","quant"],duration:"45 min"},

{d:4,topic:"Percentage — Complete",sub:"Basic %, Successive Change, Population, Depreciation",subj:"quant",type:"normal",
shortcut:"x% of y = y% of x. Swap trick = 3x faster! Successive: (a+b+ab/100)%",
topics:["Percentage basics: fraction↔percent conversion table (must memorize)","% increase/decrease, % change formula","Successive percentage change (one-shot formula)","Population growth, depreciation + SSC CGL 2023–24 PYQs"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["percentage","quant"],duration:"55 min"},

{d:5,topic:"Profit & Loss + Discount",sub:"CP/SP/MP, Successive Discount, Dishonest Trader",subj:"quant",type:"normal",
shortcut:"Profit% = (SP-CP)/CP × 100. Discount is always on MP, never on CP — common trap!",
topics:["CP, SP, MP relationships + profit/loss formula","Marked price, discount%, successive discount formula","Dishonest trader / false weight problems","Trader mix type + SSC CGL high-difficulty PYQs"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["profit-loss","discount","quant"],duration:"55 min"},

{d:6,topic:"Simple & Compound Interest",sub:"SI vs CI, Half-yearly, Population, Depreciation",subj:"quant",type:"normal",
shortcut:"2-yr CI−SI = SI²/100. Fastest for 'find P' questions!",
topics:["SI = PRT/100 — all 4 variable types","CI formula + compound frequency (yearly/half/quarterly)","CI−SI difference formula for 2 & 3 years","Population & depreciation word problems"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["si","ci","interest","quant"],duration:"50 min"},

{d:7,topic:"⚡ Week 1 Test — Number System Block",sub:"Number System + LCM/HCF + Surds + % + P&L + SI/CI | 25 Qs · 15 Min",subj:"mix",type:"weekly-test",
shortcut:"Target: 25 Qs in 15 min = 36 sec/Q. Skip stuck questions, return later!",
topics:["Number System + Divisibility 5 Qs","LCM/HCF + Surds/Indices 5 Qs","Percentage + P&L + Discount 8 Qs","SI + CI 7 Qs"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["weekly-test","quant"],duration:"15 min"},

// ══════════════════════════════════════════════════
// WEEK 2 — QUANT: Ratio, Average, T&W, SDT, Algebra
// ══════════════════════════════════════════════════
{d:8,topic:"Ratio, Proportion & Partnership",sub:"K-method, Compounded Ratio, Partnership Time-Based",subj:"quant",type:"normal",
shortcut:"K-method: a:b:c = ak:bk:ck. Partnership profit ∝ Capital × Time!",
topics:["Ratio basics, K-method for 3+ variable ratios","Proportion: direct, inverse, compound proportion","Partnership: equal time vs different time scenarios","Alligation cross method for mixture ratio"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["ratio","proportion","partnership","quant"],duration:"55 min"},

{d:9,topic:"Average & Mixture/Alligation",sub:"Weighted Avg, Age Problems, Alligation Rule",subj:"quant",type:"normal",
shortcut:"Alligation cross: (c−m):(m−c') ratio. One step = final answer!",
topics:["Average: sum÷count, weighted average, combined average","Replacement of member: ΔAvg = ΔSum/n trick","Mixture alligation: mean price rule (cross method)","Two-vessel mixing problems + SSC PYQs"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["average","mixture","alligation","quant"],duration:"50 min"},

{d:10,topic:"Time & Work + Pipes & Cisterns",sub:"LCM Method, Efficiency, Negative Work, Leak",subj:"quant",type:"normal",
shortcut:"LCM method: Assume total work = LCM. Daily work = LCM/days. Clearest approach!",
topics:["T&W: unitary method vs LCM method (LCM always faster)","Work & wages proportionality","Pipes & cisterns: filling + emptying = negative work","Leak in tank, 3+ pipe combined problems"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["time-work","pipes","cisterns","quant"],duration:"55 min"},

{d:11,topic:"Time, Speed & Distance",sub:"Relative Speed, Train Crossing, Boats & Streams",subj:"quant",type:"normal",
shortcut:"Train crossing: Length = speed × time. Boat: B=(D+U)/2, Stream=(D−U)/2.",
topics:["Basic SDT + unit conversion (km/h ↔ m/s × 5/18)","Relative speed: same dir |S1−S2|, opp dir S1+S2","Train crossing: pole, platform, another train","Boat & stream: upstream, downstream, still water"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["sdt","trains","boats","quant"],duration:"60 min"},

{d:12,topic:"Algebra Part 1 — Identities & Linear Equations",sub:"All 15 Algebraic Identities, 2-Variable Systems",subj:"quant",type:"normal",
shortcut:"(a+b)²=a²+2ab+b². If a+b=k & ab=m, then a²+b²=k²−2m. SSC favourite!",
topics:["All standard algebraic identities (full SSC CGL list)","Linear equation in 1 variable + word problems","Simultaneous equations: elimination & substitution","Graphs of linear equations (intercept form)"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["algebra","identities","quant"],duration:"55 min"},

{d:13,topic:"Algebra Part 2 — Quadratic & Number Series",sub:"Quadratic Roots, Nature of Roots, AP/GP Series",subj:"quant",type:"normal",
shortcut:"Sum of roots = −b/a, Product = c/a. Series: try +,−,×,²,³ in order!",
topics:["Quadratic equations: factorization + formula method","Nature of roots: discriminant D=b²−4ac","Arithmetic & Geometric Progression formulas","Number series patterns: SSC CGL type"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["algebra","quadratic","series","quant"],duration:"55 min"},

{d:14,topic:"⚡ Week 2 Test — Arithmetic Block 2",sub:"Ratio + Avg + T&W + SDT + Algebra | 25 Qs · 15 Min",subj:"mix",type:"weekly-test",
shortcut:"These topics = 30–35% of CGL Quant section. Nail this test!",
topics:["Ratio + Partnership + Mixture 6 Qs","Average + T&W + Pipes 7 Qs","SDT + Trains + Boats 6 Qs","Algebra + Series 6 Qs"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["weekly-test","quant"],duration:"15 min"},

// ══════════════════════════════════════════════════
// WEEK 3 — QUANT: Geometry + Mensuration (Complete)
// ══════════════════════════════════════════════════
{d:15,topic:"Geometry Part 1 — Lines, Angles & Triangles",sub:"Parallel Lines, Triangle Properties, Congruency, Similarity",subj:"quant",type:"normal",
shortcut:"Exterior angle = sum of 2 non-adjacent interior angles. Use this always!",
topics:["Lines, angles, parallel lines (alternate, co-interior, corresponding angles)","Triangle: types, angle sum, exterior angle theorem","Congruency: SSS, SAS, ASA, RHS criteria","Similarity + Midpoint Theorem + Basic Proportionality Theorem"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["geometry","triangles","quant"],duration:"60 min"},

{d:16,topic:"Geometry Part 2 — Triangle Centres & Special Theorems",sub:"Incentre, Circumcentre, Centroid, Orthocenter, Pythagoras",subj:"quant",type:"normal",
shortcut:"Centroid divides median 2:1 from vertex. Circumcentre = equidistant from all 3 vertices!",
topics:["4 triangle centres + their key properties","Pythagoras theorem + converse + Pythagorean triples (3-4-5, 5-12-13...)","Apollonius theorem (median length formula)","Angle bisector theorem basics"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["geometry","centres","pythagoras","quant"],duration:"60 min"},

{d:17,topic:"Geometry Part 3 — Circles, Chords & Tangents",sub:"Chord Theorems, Tangent Properties, Cyclic Quadrilateral",subj:"quant",type:"normal",
shortcut:"Angle in semicircle = 90°. Tangent ⊥ radius. Two tangents from external point are equal!",
topics:["Circle theorems: chord, arc, sector relationships","Angle subtended at centre = 2× angle at circumference","Tangent from external point + tangent-secant theorem","Cyclic quadrilateral: opposite angles sum = 180°"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["geometry","circles","tangents","quant"],duration:"60 min"},

{d:18,topic:"Geometry Part 4 — Quadrilaterals, Polygons & Coordinate",sub:"Parallelogram, Rhombus, Trapezium, Regular Polygons, Distance Formula",subj:"quant",type:"normal",
shortcut:"Interior angle of regular n-gon = (n−2)×180/n. Distance = √[(x₂−x₁)²+(y₂−y₁)²]",
topics:["Quadrilateral properties: parallelogram, rhombus, rectangle, square, trapezium","Regular polygon: interior/exterior angles, number of diagonals","Coordinate geometry: distance, midpoint, section formulas","Slope, collinearity, area of triangle by coordinates"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["geometry","quadrilaterals","coordinate","quant"],duration:"55 min"},

{d:19,topic:"Mensuration 2D — Complete",sub:"Triangle, Rectangle, Circle, Trapezium, Rhombus, Sector",subj:"quant",type:"normal",
shortcut:"Heron's formula: s=(a+b+c)/2, Area=√[s(s−a)(s−b)(s−c)]. Essential!",
topics:["Area & perimeter: Triangle (3 formulas), Rectangle, Square, Circle","Trapezium: ½(a+b)×h. Rhombus: ½d₁d₂","Sector area = θ/360 × πr², Arc length = θ/360 × 2πr","Combined/shaded region problems (SSC favourite type)"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["mensuration","2d","quant"],duration:"60 min"},

{d:20,topic:"Mensuration 3D — Complete",sub:"Cube, Cuboid, Cylinder, Cone, Sphere, Prism, Pyramid",subj:"quant",type:"normal",
shortcut:"Cylinder: V=πr²h, LSA=2πrh, TSA=2πr(r+h). Sphere: V=4/3πr³, SA=4πr².",
topics:["Cube & cuboid: volume, surface area, diagonal","Cylinder & cone: all formulas including slant height l=√(r²+h²)","Sphere, hemisphere, frustum of cone formulas","Melting & recasting (volume conservation) + water level problems"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["mensuration","3d","quant"],duration:"60 min"},

{d:21,topic:"⚡ Week 3 Test — Geometry + Mensuration",sub:"All Geometry + 2D + 3D Mensuration | 25 Qs · 15 Min",subj:"mix",type:"weekly-test",
shortcut:"Geometry = 25–30% of CGL Tier-2 Maths. Tier-1: 4–6 Q guaranteed each exam!",
topics:["Lines + Triangles + Centres 8 Qs","Circles + Quadrilaterals + Coordinate 6 Qs","2D Mensuration 6 Qs","3D Mensuration 5 Qs"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["weekly-test","geometry","mensuration"],duration:"15 min"},

// ══════════════════════════════════════════════════
// WEEK 4 — QUANT: Trigonometry, Statistics, DI + Revision
// ══════════════════════════════════════════════════
{d:22,topic:"Trigonometry Part 1 — Ratios, Identities & Standard Values",sub:"6 Ratios, 3 Identities, Standard Angle Table, Complementary Angles",subj:"quant",type:"normal",
shortcut:"sin²θ+cos²θ=1. 1+tan²θ=sec²θ. 1+cot²θ=cosec²θ. These 3 identities = everything!",
topics:["6 trig ratios + reciprocal relationships (sin↔cosec, cos↔sec, tan↔cot)","Standard angle table: 0°,30°,45°,60°,90° — must memorize","3 Pythagorean identities + all derived forms","Complementary angles: sin(90−θ)=cosθ, tan(90−θ)=cotθ etc."],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["trigonometry","identities","quant"],duration:"60 min"},

{d:23,topic:"Trigonometry Part 2 — Heights & Distances",sub:"Angle of Elevation, Depression, Two-Observation Problems",subj:"quant",type:"normal",
shortcut:"tanθ = Height/Base (for elevation). Always draw diagram first for 2-observation!",
topics:["Angle of elevation & depression definitions","Single observer: tower, hill, lighthouse problems","Two observer / two angle problems (advanced)","Moving object problems + SSC CGL PYQs 2021–2024"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["trigonometry","heights","distances","quant"],duration:"55 min"},

{d:24,topic:"Statistics & Probability",sub:"Mean, Median, Mode, Variance, SD, Basic Probability",subj:"quant",type:"normal",
shortcut:"Mean=ΣfX/Σf. Median=middle value (sort first!). Mode=most frequent value.",
topics:["Arithmetic mean, weighted mean, combined mean","Median for ungrouped & grouped data","Mode, bimodal data, relationship: Mode=3Median−2Mean","Simple probability: P(A)=favourable/total. P(A∪B) formula"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["statistics","probability","quant"],duration:"50 min"},

{d:25,topic:"Data Interpretation — Complete",sub:"Bar, Line, Pie, Table, Histogram, Frequency Polygon",subj:"quant",type:"normal",
shortcut:"DI: Find Base value first. % of X = (X/Base)×100. Never calculate fully!",
topics:["Bar graph & double bar graph reading + comparison","Line graph + pie chart (degrees ↔ percentage conversion)","Table DI: row+column intersections, % change","Histogram & frequency polygon interpretation"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["di","data-interpretation","quant"],duration:"55 min"},

{d:26,topic:"Quant — Ignored Topics Booster (SSC Traps)",sub:"Probability Deep Dive, Histogram, Frequency Polygon, Grouped Data",subj:"quant",type:"normal",
shortcut:"Students ignore these = easy marks for you! Probability at SSC level is simple.",
topics:["Probability: coins, dice, cards, balls — all classic SSC types","Histogram: class intervals, frequency density calculation","Frequency polygon: midpoint plotting technique","Grouped data: mean by assumed mean method"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["probability","histogram","statistics","quant"],duration:"50 min"},

{d:27,topic:"Quant Full Revision — PYQ Marathon",sub:"2021–2024 ke 50 Most Repeated Quant Questions",subj:"quant",type:"revision",
shortcut:"PYQs repeat 35–40% in SSC CGL! Solve these = guaranteed marks.",
topics:["Arithmetic PYQs (% + P&L + SI/CI + T&W) 15 Qs","Algebra + Series PYQs 10 Qs","Geometry + Mensuration PYQs 15 Qs","Trig + DI + Stats PYQs 10 Qs"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["pyq","revision","quant"],duration:"90 min"},

{d:28,topic:"⚡ Week 4 Test — Trig + DI + Stats + Full Quant",sub:"Complete Quant Section Simulation | 25 Qs · 15 Min",subj:"mix",type:"weekly-test",
shortcut:"Quant ka final dress-rehearsal. Target: 20+/25!",
topics:["Trigonometry (ratios + H&D) 6 Qs","Statistics + Probability 5 Qs","DI (bar/pie/table) 5 Qs","Mixed Arithmetic + Geometry 9 Qs"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["weekly-test","quant","full-mix"],duration:"15 min"},

// ══════════════════════════════════════════════════
// WEEK 5 — REASONING: Analogy, Classification, Series, Coding, Logical, Spatial
// ══════════════════════════════════════════════════
{d:29,topic:"Reasoning — Analogy & Classification",sub:"Semantic, Number, Symbolic, Figural Analogy + Classification",subj:"reasoning",type:"normal",
shortcut:"Analogy: find EXACT relationship first — don't guess. Classification: try multiple criteria!",
topics:["Semantic analogy: word-meaning relationships","Number analogy: operation patterns (+,×,²,factors)","Symbolic analogy: letter position (A=1, Z=26)","Figural analogy + semantic/number/figural classification"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["analogy","classification","reasoning"],duration:"45 min"},

{d:30,topic:"Reasoning — Series (All Types)",sub:"Number Series, Alphabet Series, Figural Series, Non-Verbal",subj:"reasoning",type:"normal",
shortcut:"Number series: try +n, ×n, n², alternating, prime, fibonacci — cover all 6 patterns!",
topics:["Number series: arithmetic, geometric, mixed, square, cube patterns","Alphabet series: position-based, skip patterns","Non-verbal series: shape, size, rotation, shading patterns","Missing term + wrong term detection in series"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["series","non-verbal","reasoning"],duration:"45 min"},

{d:31,topic:"Reasoning — Coding-Decoding (All Types)",sub:"Letter Coding, Number Coding, Symbol Coding, Matrix Coding",subj:"reasoning",type:"normal",
shortcut:"Letter coding: check +/− shift first. Number coding: find operation. Matrix: row+col!",
topics:["Letter substitution coding (+n, −n, reverse, key-based)","Number coding: alphabetical position operations","Symbol coding: pattern recognition","Matrix/table coding: row-column intersection method"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["coding-decoding","reasoning"],duration:"45 min"},

{d:32,topic:"Reasoning — Logical Reasoning",sub:"Syllogism, Venn Diagram, Statement-Conclusion, Decision Making",subj:"reasoning",type:"normal",
shortcut:"Syllogism: draw Venn diagram EVERY time. Never assume — only what LOGICALLY follows!",
topics:["Syllogism: all/some/no statements + possibility cases","Venn diagram problems (set-based)","Statement & conclusion, statement & assumption","Decision making + logical sequence of events"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["syllogism","logical","reasoning"],duration:"50 min"},

{d:33,topic:"Reasoning — Spatial & Visual (Non-Verbal)",sub:"Mirror/Water Image, Paper Folding/Cutting, Embedded Figures, Cube & Dice",subj:"reasoning",type:"normal",
shortcut:"Mirror: left-right flip. Water: top-bottom flip. Paper: trace ALL layers carefully!",
topics:["Mirror image (vertical axis) vs Water image (horizontal axis)","Paper folding & cutting: unfold step-by-step","Embedded figures: which figure contains the given shape","Cube & dice: opposite faces, counting dots, painting problems"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["spatial","non-verbal","mirror","cube","reasoning"],duration:"50 min"},

{d:34,topic:"Reasoning — Mathematical + Miscellaneous",sub:"Arithmetic Reasoning, Missing Number, Blood Relations, Direction Sense",subj:"reasoning",type:"normal",
shortcut:"Direction: always start from NORTH. Blood relation: draw tree diagram every time!",
topics:["Arithmetic reasoning + mathematical operators (*, @, # etc.)","Missing number in figure/matrix (row/col/diagonal patterns)","Blood relation: coding type + conversational type","Direction & distance: net displacement formula"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["arithmetic-reasoning","blood-relations","directions","reasoning"],duration:"50 min"},

{d:35,topic:"⚡ Week 5 Test — Full Reasoning Section",sub:"All Reasoning Topics | 25 Qs · 15 Min",subj:"mix",type:"weekly-test",
shortcut:"Reasoning = highest scoring section. Target: 22+/25!",
topics:["Analogy + Classification + Series 8 Qs","Coding-Decoding + Syllogism 6 Qs","Non-verbal + Spatial 6 Qs","Blood Relation + Direction + Misc 5 Qs"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["weekly-test","reasoning"],duration:"15 min"},

// ══════════════════════════════════════════════════
// WEEK 6 — REASONING ADVANCED: Ranking, Seating, Calendar, EI/SI, Space
// ══════════════════════════════════════════════════
{d:36,topic:"Reasoning — Ranking, Seating & Puzzles",sub:"Linear Arrangement, Circular Seating, Floor/Rank Problems",subj:"reasoning",type:"normal",
shortcut:"Seating: note ALL constraints first before placing anyone. Circular: fix one person!",
topics:["Ranking problems: position from both ends (L+R−1=Total)","Linear seating arrangement: one row + two rows facing","Circular arrangement: clockwise/anticlockwise","Floor-based puzzles + complex mixed constraint problems"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["ranking","seating","puzzles","reasoning"],duration:"55 min"},

{d:37,topic:"Reasoning — Calendar, Clock & Word Building",sub:"Day of Week, Clock Angles, Word Rearrangement",subj:"reasoning",type:"normal",
shortcut:"Clock angle = |30H − 5.5M|. Calendar odd days: Jan=3, Feb=0(28days)!",
topics:["Calendar: day/date calculation, odd days method","Clock: angle between hands, time when angle is given","Word building: meaningful words from scrambled letters","Address matching, date-code matching, observation type"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["calendar","clock","word-building","reasoning"],duration:"50 min"},

{d:38,topic:"Reasoning — Emotional & Social Intelligence",sub:"EI/SI Scenarios, Critical Thinking (Most Ignored = Easy Marks!)",subj:"reasoning",type:"normal",
shortcut:"EI/SI: choose the MOST EMPATHETIC or MOST PRACTICAL answer. Never extreme options!",
topics:["Emotional intelligence: identifying feelings, managing emotions in scenarios","Social intelligence: interpersonal situation choices","Critical thinking: what conclusion is logically valid","Observation, discrimination + relationship concepts"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["emotional-intelligence","social-intelligence","reasoning"],duration:"40 min"},

{d:39,topic:"Reasoning — Figure Completion & Space Visualization",sub:"Incomplete Figures, Space Orientation, 3D Unfolding",subj:"reasoning",type:"normal",
shortcut:"Space visualization: mentally rotate step by step. Figure completion: find the symmetry!",
topics:["Space visualization: identify 3D objects from 2D views","Spatial orientation: directions in 3D space","Figure completion: completing incomplete pattern figures","3D figure unfolding (dice nets, box nets)"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["space-visualization","figure-completion","reasoning"],duration:"45 min"},

{d:40,topic:"Reasoning — PYQ Drill 2021 to 2024",sub:"50 Real SSC CGL PYQs — All Reasoning Topics",subj:"reasoning",type:"revision",
shortcut:"Real PYQs show exact SSC pattern. Solve these = pattern pakad jaoge!",
topics:["Analogy + Series + Coding PYQs 2021–2022","Syllogism + Non-verbal PYQs 2022–2023","Blood Relation + Direction PYQs 2023–2024","EI/SI + Calendar + Clock PYQs (special topics)"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["pyq","revision","reasoning"],duration:"90 min"},

{d:41,topic:"Reasoning — Trends, Numerical Operations & Misc",sub:"Trends, Mathematical Operators, Missing Number in Matrix",subj:"reasoning",type:"normal",
shortcut:"Missing number in matrix: check row-wise, column-wise AND diagonal — all 3!",
topics:["Trends: pattern identification in visual data sequences","Numerical operations: BODMAS with symbols replacing operators","Mathematical operators: if * means + etc. (operator replacement)","Missing number in figure: all pattern directions"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["trends","numerical-operations","reasoning"],duration:"45 min"},

{d:42,topic:"⚡ Week 6 Test — Reasoning Advanced + Full Mix",sub:"All Advanced Reasoning | 25 Qs · 15 Min",subj:"mix",type:"weekly-test",
shortcut:"22+ score karo toh Reasoning mein set ho. Ab English par focus shift!",
topics:["Seating + Ranking + Puzzles 7 Qs","Calendar + Clock + Word Building 5 Qs","EI/SI + Figure Completion + Space 6 Qs","PYQ rapid fire mixed 7 Qs"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["weekly-test","reasoning","advanced"],duration:"15 min"},

// ══════════════════════════════════════════════════
// WEEK 7 — ENGLISH: Vocabulary, Grammar, Sentence Structure, Spelling
// ══════════════════════════════════════════════════
{d:43,topic:"English — Vocabulary Part 1",sub:"Synonyms, Antonyms, Root Word Method",subj:"english",type:"normal",
shortcut:"Root word method: 1 root = 10+ words. Learn roots, not individual words!",
topics:["High-frequency SSC CGL synonyms (top 100 list)","Antonyms: prefix method (un−, dis−, in−, im−, ir−)","Root word families: Latin + Greek roots","Context-based meaning: choose from options strategically"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["vocabulary","synonyms","antonyms","english"],duration:"50 min"},

{d:44,topic:"English — Vocabulary Part 2",sub:"One-Word Substitution, Idioms & Phrases, Homonyms",subj:"english",type:"normal",
shortcut:"OWS: learn the category (person who = ___). Idioms: meaning ≠ literal meaning!",
topics:["One-word substitution: top 150 SSC asked OWS list","Idioms & phrases: top 100 SSC list","Homonyms & homophones (ignored by students = easy marks!)","Commonly confused words: affect/effect, lie/lay, etc."],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["vocabulary","idioms","one-word","homonyms","english"],duration:"50 min"},

{d:45,topic:"English — Grammar Part 1 — Error Spotting",sub:"SVA, Tense Errors, Preposition, Article",subj:"english",type:"normal",
shortcut:"Error spotting order: find subject → check verb → tense → preposition → article!",
topics:["Subject-Verb Agreement: tricky collective nouns, either/neither/none","Tense errors: sequence of tenses rules","Preposition errors: in/on/at, for/since, between/among","Article errors: a/an/the usage rules + zero article"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["grammar","error-spotting","english"],duration:"55 min"},

{d:46,topic:"English — Grammar Part 2",sub:"Fill in the Blanks, Sentence Improvement, Active/Passive, Narration",subj:"english",type:"normal",
shortcut:"Passive: Object + is/am/are + V3 + by + Subject. Narration: tense shifts back one step!",
topics:["Fill in the blanks: grammatical + contextual clue approach","Sentence improvement: identify & fix the error option","Active ↔ Passive voice conversion (all tenses)","Direct ↔ Indirect speech (narration): reporting verb rules"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["grammar","active-passive","narration","english"],duration:"55 min"},

{d:47,topic:"English — Sentence Structure",sub:"Para Jumbles, Sentence Rearrangement, Cloze Test",subj:"english",type:"normal",
shortcut:"Para jumble: find TOPIC sentence first (no pronoun reference) = always sentence 1!",
topics:["Sentence rearrangement: PQRS type + numbered sentences","Para jumbles: topic sentence, connector words, logical flow","Cloze test: read full passage first, THEN fill (not while reading!)","Sentence shuffling with discourse markers: however/therefore/but"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["para-jumble","cloze-test","sentence-structure","english"],duration:"50 min"},

{d:48,topic:"English — Spelling & Misspelled Words",sub:"Top 200 SSC Misspelled Words, Spelling Rules",subj:"english",type:"normal",
shortcut:"Misspelled words: sound it out, check double letters, check 'ie vs ei' rule!",
topics:["Top 200 commonly misspelled words in SSC CGL","Spelling rules: 'i before e except after c'","Double consonant rules (occur→occurred, begin→beginning)","Silent letters + British vs American spelling traps"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["spelling","misspelled","english"],duration:"40 min"},

{d:49,topic:"⚡ Week 7 Test — Full English Section",sub:"All English Topics | 25 Qs · 15 Min",subj:"mix",type:"weekly-test",
shortcut:"English target: 20+/25. Vocabulary = fastest 8 marks. RC = careful 5 marks!",
topics:["Vocabulary (Syn + Ant + OWS + Idioms) 8 Qs","Grammar (Error + Fill + Improvement) 8 Qs","Sentence Structure (Para + Cloze) 5 Qs","Spelling + RC passage 4 Qs"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["weekly-test","english"],duration:"15 min"},

// ══════════════════════════════════════════════════
// WEEK 8 — ENGLISH RC + GA: History, Polity, Geography, Economy, Science
// ══════════════════════════════════════════════════
{d:50,topic:"English — Reading Comprehension (Complete Strategy)",sub:"RC Types, Inference, Tone, Context Meaning, Practice",subj:"english",type:"normal",
shortcut:"Read QUESTION first → skim passage → locate answer. 4th option trap = common in SSC!",
topics:["RC strategy: question-first approach vs passage-first","Inference questions: what 'must be true' vs 'can be inferred'","Tone & attitude: positive/negative/neutral/critical/satirical","Context vocabulary: word meaning from passage context"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["reading-comprehension","rc","english"],duration:"60 min"},

{d:51,topic:"GA — Indian History",sub:"Ancient, Medieval, Modern India, Freedom Movement",subj:"ga",type:"normal",
shortcut:"Modern history = highest SSC GA weightage! Freedom movement dates must memorize.",
topics:["Ancient India: Indus Valley, Vedic, Maurya, Gupta highlights","Medieval India: Delhi Sultanate, Mughal Empire key events & rulers","Modern India: British rule, reforms, acts, revolts","Freedom struggle: key events 1857–1947 + important personalities"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["history","ancient","modern","ga"],duration:"60 min"},

{d:52,topic:"GA — Indian Polity & Constitution",sub:"Constitution, Fundamental Rights, Parliament, Judiciary, Bodies",subj:"ga",type:"normal",
shortcut:"FR (Part 3) = justiciable. DPSP (Part 4) = NOT justiciable. Key SSC trap!",
topics:["Constitution: making, features, Preamble, schedules & parts","Fundamental Rights (Art 12–35) + Fundamental Duties","Parliament, President, PM, Governor, Judiciary","Constitutional & statutory bodies: CAG, UPSC, EC, NHRC"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["polity","constitution","ga"],duration:"60 min"},

{d:53,topic:"GA — Indian & World Geography",sub:"Physical Geography, Indian Rivers/Mountains, World GK",subj:"ga",type:"normal",
shortcut:"Indian rivers: east-flowing → Bay of Bengal. West-flowing → Arabian Sea!",
topics:["Physical geography: layers of earth, rocks, types of landforms","Indian geography: rivers, mountains, states, capitals, wildlife","Climate of India: seasons, monsoon, rainfall patterns","World geography: continents, oceans, important countries & facts"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["geography","india","world","ga"],duration:"55 min"},

{d:54,topic:"GA — Indian Economy",sub:"Budget, Banking, GDP, Inflation, Schemes, Economic Terms",subj:"ga",type:"normal",
shortcut:"GDP > GNP > NNP > NNP at FC. Always! Economic Survey comes before Budget.",
topics:["GDP, GNP, NNP, NI — relationships & differences","Banking system: RBI functions, types of banks, monetary policy","Inflation: CPI, WPI, repo rate, reverse repo, SLR, CRR","Government schemes: major PM schemes + economic programs"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["economy","banking","gdp","ga"],duration:"55 min"},

{d:55,topic:"GA — Science: Physics & Chemistry",sub:"Motion, Electricity, Heat, Light + Elements, Acids, Reactions",subj:"ga",type:"normal",
shortcut:"Newton's 3 laws + SI units + Ohm's law = 40% of Physics questions in SSC!",
topics:["Physics: Newton's laws, gravitation, electricity, magnetism, optics","Heat: conduction, convection, radiation + thermometers","Chemistry: elements, compounds, metals, non-metals, alloys","Acids, bases, pH scale, chemical reactions, common chemicals"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["physics","chemistry","science","ga"],duration:"60 min"},

{d:56,topic:"⚡ Week 8 Test — RC + GA Block 1",sub:"RC + History + Polity + Geography + Economy + Science | 25 Qs · 15 Min",subj:"mix",type:"weekly-test",
shortcut:"GA mein guess mat karo — negative marking 0.5! Sirf sure answers mark karo.",
topics:["RC passage 5 Qs","History + Polity 8 Qs","Geography + Economy 6 Qs","Science Physics + Chemistry 6 Qs"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["weekly-test","ga","rc","english"],duration:"15 min"},

// ══════════════════════════════════════════════════
// WEEK 9 — GA COMPLETION + CURRENT AFFAIRS + STATIC GK
// ══════════════════════════════════════════════════
{d:57,topic:"GA — Biology: Human Body & Life Sciences",sub:"Body Systems, Diseases, Nutrition, Plants & Animals",subj:"ga",type:"normal",
shortcut:"206 bones, 32 teeth, 4 blood groups (ABO+Rh), DNA double helix = SSC classics!",
topics:["Human body: skeleton, digestive, circulatory, respiratory systems","Endocrine glands + hormones (insulin, adrenaline etc.)","Diseases: viral, bacterial, deficiency diseases + vaccines","Nutrition: vitamins (A/B/C/D/E/K), minerals, proteins, fats"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["biology","human-body","diseases","ga"],duration:"60 min"},

{d:58,topic:"GA — Static GK Complete",sub:"Books/Authors, Awards, Sports, Art & Culture, Important Days, Organizations",subj:"ga",type:"normal",
shortcut:"Static GK = pure memory. Make flashcards! Awards + Sports + Org = 4–5 Qs guaranteed!",
topics:["Important books & their authors (Indian + International)","Awards: Bharat Ratna, Padma, Nobel, Oscars, Sports awards","Sports: major games, venues, trophies, India's records","Art & culture, important days & dates, international organizations"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["static-gk","awards","sports","culture","ga"],duration:"55 min"},

{d:59,topic:"GA — Biology Part 2 + Environment (Ignored Topics!)",sub:"Cell Biology, Genetics, Ecology, India & Neighbors",subj:"ga",type:"normal",
shortcut:"Environment & neighboring countries = ignored by students = easy 1–2 marks for you!",
topics:["Cell: structure, organelles, cell division (mitosis vs meiosis)","Genetics: DNA, RNA, Mendel's laws, heredity basics","Environment: ecosystem, food chain, biodiversity, conservation","India & neighboring countries: borders, rivers, organizations"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["biology","environment","genetics","ga"],duration:"55 min"},

{d:60,topic:"📚 GA — Current Affairs Mega Revision",sub:"Last 12 Months: National, International, Sports, Appointments",subj:"ga",type:"normal",
shortcut:"Current affairs = 8–10 Qs in CGL! Cover last 12 months. Summits + appointments first!",
topics:["National current affairs (schemes, policies, records 2025–26)","International affairs (summits, agreements, organizations 2025–26)","Sports current affairs (Olympics, World Cups, India records)","Awards, appointments, notable events 2025–26"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["current-affairs","national","international","sports","ga"],duration:"70 min"},

// ══════════════════════════════════════════════════
// D61–70: FULL LENGTH TEST ZONE (10 FLTs — Real CGL Simulation)
// ══════════════════════════════════════════════════
{d:61,topic:"🏆 FLT Zone — Full Test 1",sub:"100 Qs · 60 Min · All 4 Sections · CGL 2024 Pattern",subj:"mix",type:"full-test",
shortcut:"Attempt order: Reasoning (10min) → English (15min) → Quant (20min) → GA (10min) → Review (5min)",
topics:["General Intelligence & Reasoning — 25 Qs","General Awareness — 25 Qs","Quantitative Aptitude — 25 Qs","English Comprehension — 25 Qs"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["flt","full-test"],duration:"60 min"},

{d:62,topic:"🔍 FLT 1 Analysis + Weak Area Fix",sub:"Deep Error Analysis + Targeted Revision",subj:"mix",type:"analysis",
shortcut:"Categorize each wrong answer: (a) don't know, (b) silly mistake, (c) time ran out.",
topics:["Section-wise score breakdown + attempt rate analysis","Wrong answer pattern identification","Weak topic targeted revision (1.5 hours focus)","Time management correction plan for FLT 2"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["analysis","flt"],duration:"90 min"},

{d:63,topic:"🏆 FLT Zone — Full Test 2",sub:"100 Qs · 60 Min · Hard Shift Pattern Simulation",subj:"mix",type:"full-test",
shortcut:"Apply FLT 1 lessons: fix weak section, improve speed on strong sections!",
topics:["General Intelligence & Reasoning — 25 Qs","General Awareness — 25 Qs","Quantitative Aptitude — 25 Qs","English Comprehension — 25 Qs"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["flt","full-test"],duration:"60 min"},

{d:64,topic:"🏆 FLT Zone — Full Test 3",sub:"100 Qs · 60 Min · 2025 CGL Pattern Simulation",subj:"mix",type:"full-test",
shortcut:"Real exam environment: phone off, timer on, proper sitting. Full simulation!",
topics:["General Intelligence & Reasoning — 25 Qs","General Awareness — 25 Qs","Quantitative Aptitude — 25 Qs","English Comprehension — 25 Qs"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["flt","full-test"],duration:"60 min"},

{d:65,topic:"🏆 FLT Zone — Full Test 4 + Analysis",sub:"100 Qs · 60 Min + 30 Min Deep Analysis",subj:"mix",type:"full-test",
shortcut:"Target by now: 80+ attempts with 85%+ accuracy = 136+ marks = safe score!",
topics:["General Intelligence & Reasoning — 25 Qs","General Awareness — 25 Qs","Quantitative Aptitude — 25 Qs","English Comprehension — 25 Qs"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["flt","full-test","analysis"],duration:"90 min"},

{d:66,topic:"🏆 FLT Zone — Full Test 5",sub:"100 Qs · 60 Min · Highest Difficulty Simulation",subj:"mix",type:"full-test",
shortcut:"Mushkil test = best practice. Crack this = real exam will feel easy!",
topics:["General Intelligence & Reasoning — 25 Qs","General Awareness — 25 Qs","Quantitative Aptitude — 25 Qs","English Comprehension — 25 Qs"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["flt","full-test"],duration:"60 min"},

{d:67,topic:"🎯 Final Revision — Formula Sheet + GA Facts",sub:"All Formulas, Shortcuts, Static GK + Current Affairs Final Scan",subj:"mix",type:"revision",
shortcut:"Last 3 din: koi naya topic nahi. Sirf jo pata hai usse STRONG karo!",
topics:["Quant formula sheet: all 60+ formulas rapid scan","Reasoning tricks rapid revision (top 20)","English: top 50 vocab + critical grammar rules","GA: history dates + static GK + last 6 months CA"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["revision","formula","final"],duration:"90 min"},

{d:68,topic:"🏆 FLT Zone — Full Test 6 (Final Dress Rehearsal)",sub:"100 Qs · 60 Min · Exam Day Simulation",subj:"mix",type:"full-test",
shortcut:"Full simulation: proper breakfast, exam clothes, centre-like environment!",
topics:["General Intelligence & Reasoning — 25 Qs","General Awareness — 25 Qs","Quantitative Aptitude — 25 Qs","English Comprehension — 25 Qs"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["flt","full-test","final"],duration:"60 min"},

{d:69,topic:"🎯 Exam Eve — Light Revision + Confidence",sub:"No New Topics. Checklist, Mindset, Rest",subj:"mix",type:"strategy",
shortcut:"Aaj rest karo. Brain recharge karne do. Kal best performance ke liye!",
topics:["Admit card, ID, stationery, centre address checklist","Light 30-min GA facts review only","Top 20 shortcut tricks mental revision","Sleep by 10 PM — 8 hours mandatory!"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["strategy","final","exam-eve"],duration:"30 min"},

{d:70,topic:"🚀 Exam Day — You Are Ready!",sub:"Report Time, Hall Rules, Attempt Strategy, Confidence",subj:"mix",type:"strategy",
shortcut:"70 din ki mehnat aaj rang layegi. Confidence = your biggest weapon. Best of luck!",
topics:["Reach centre 30 min early — no last-minute study!","Attempt order: strongest section first","Mark uncertain questions for review — don't leave unattempted","Trust your 70-day preparation. RankUpExam ne aapko ready kar diya!"],
pdf:"#",mock:"#",yt:"https://youtube.com/@rankupexam",ytAnalysis:"#",tags:["exam-day","strategy","final"],duration:"0 min"},

]; // end DAYS

// ══════════════════════════════════════════════════
// HARD SHIFTS — 30 Hardest SSC CGL Real Exam Shifts (2021–2025)
// To update: change mock or yt links below. Don't touch other fields.
// ══════════════════════════════════════════════════
const SHIFTS = [
  {yr:'2021',date:'13 Aug 2021', shift:'Shift 2',rank:3,label:'CGL 2021',mock:'#',yt:'https://youtube.com/@rankupexam'},
  {yr:'2021',date:'16 Aug 2021', shift:'Shift 1',rank:2,label:'CGL 2021',mock:'#',yt:'https://youtube.com/@rankupexam'},
  {yr:'2021',date:'20 Aug 2021', shift:'Shift 3',rank:1,label:'CGL 2021',mock:'#',yt:'https://youtube.com/@rankupexam'},
  {yr:'2021',date:'23 Aug 2021', shift:'Shift 2',rank:2,label:'CGL 2021',mock:'#',yt:'https://youtube.com/@rankupexam'},
  {yr:'2021',date:'25 Aug 2021', shift:'Shift 1',rank:1,label:'CGL 2021',mock:'#',yt:'https://youtube.com/@rankupexam'},
  {yr:'2022',date:'2 Dec 2022',  shift:'Shift 3',rank:1,label:'CGL 2022',mock:'#',yt:'https://youtube.com/@rankupexam'},
  {yr:'2022',date:'5 Dec 2022',  shift:'Shift 1',rank:2,label:'CGL 2022',mock:'#',yt:'https://youtube.com/@rankupexam'},
  {yr:'2022',date:'8 Dec 2022',  shift:'Shift 2',rank:1,label:'CGL 2022',mock:'#',yt:'https://youtube.com/@rankupexam'},
  {yr:'2022',date:'9 Dec 2022',  shift:'Shift 3',rank:2,label:'CGL 2022',mock:'#',yt:'https://youtube.com/@rankupexam'},
  {yr:'2022',date:'12 Dec 2022', shift:'Shift 1',rank:3,label:'CGL 2022',mock:'#',yt:'https://youtube.com/@rankupexam'},
  {yr:'2023',date:'14 Jul 2023', shift:'Shift 3',rank:1,label:'CGL 2023',mock:'#',yt:'https://youtube.com/@rankupexam'},
  {yr:'2023',date:'17 Jul 2023', shift:'Shift 2',rank:2,label:'CGL 2023',mock:'#',yt:'https://youtube.com/@rankupexam'},
  {yr:'2023',date:'19 Jul 2023', shift:'Shift 1',rank:1,label:'CGL 2023',mock:'#',yt:'https://youtube.com/@rankupexam'},
  {yr:'2023',date:'21 Jul 2023', shift:'Shift 3',rank:3,label:'CGL 2023',mock:'#',yt:'https://youtube.com/@rankupexam'},
  {yr:'2023',date:'26 Jul 2023', shift:'Shift 2',rank:2,label:'CGL 2023',mock:'#',yt:'https://youtube.com/@rankupexam'},
  {yr:'2023',date:'27 Jul 2023', shift:'Shift 1',rank:1,label:'CGL 2023',mock:'#',yt:'https://youtube.com/@rankupexam'},
  {yr:'2024',date:'9 Sept 2024', shift:'Shift 2',rank:1,label:'CGL 2024',mock:'#',yt:'https://youtube.com/@rankupexam'},
  {yr:'2024',date:'10 Sept 2024',shift:'Shift 1',rank:3,label:'CGL 2024',mock:'#',yt:'https://youtube.com/@rankupexam'},
  {yr:'2024',date:'11 Sept 2024',shift:'Shift 1',rank:2,label:'CGL 2024',mock:'#',yt:'https://youtube.com/@rankupexam'},
  {yr:'2024',date:'12 Sept 2024',shift:'Shift 3',rank:2,label:'CGL 2024',mock:'#',yt:'https://youtube.com/@rankupexam'},
  {yr:'2024',date:'13 Sept 2024',shift:'Shift 3',rank:1,label:'CGL 2024',mock:'#',yt:'https://youtube.com/@rankupexam'},
  {yr:'2024',date:'16 Sept 2024',shift:'Shift 2',rank:3,label:'CGL 2024',mock:'#',yt:'https://youtube.com/@rankupexam'},
  {yr:'2024',date:'19 Sept 2024',shift:'Shift 3',rank:1,label:'CGL 2024',mock:'#',yt:'https://youtube.com/@rankupexam'},
  {yr:'2025',date:'12 Sept 2025',shift:'Shift 3',rank:1,label:'CGL 2025',mock:'shifts/cgl2025-12-sept-shift3.html',yt:'https://youtube.com/@rankupexam'},
  {yr:'2025',date:'13 Sept 2025',shift:'Shift 2',rank:3,label:'CGL 2025',mock:'#',yt:'https://youtube.com/@rankupexam'},
  {yr:'2025',date:'15 Sept 2025',shift:'Shift 3',rank:2,label:'CGL 2025',mock:'#',yt:'https://youtube.com/@rankupexam'},
  {yr:'2025',date:'16 Sept 2025',shift:'Shift 2',rank:2,label:'CGL 2025',mock:'#',yt:'https://youtube.com/@rankupexam'},
  {yr:'2025',date:'18 Sept 2025',shift:'Shift 1',rank:3,label:'CGL 2025',mock:'#',yt:'https://youtube.com/@rankupexam'},
  {yr:'2025',date:'18 Sept 2025',shift:'Shift 3',rank:1,label:'CGL 2025',mock:'#',yt:'https://youtube.com/@rankupexam'},
  {yr:'2025',date:'20 Sept 2025',shift:'Shift 1',rank:2,label:'CGL 2025',mock:'#',yt:'https://youtube.com/@rankupexam'},
];




window.DAYS = DAYS;
window.SHIFTS = SHIFTS;

window.DAYS = DAYS;
window.SHIFTS = SHIFTS;