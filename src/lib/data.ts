import type { Question, Stat, Tier } from './types';

// ---------------------------------------------------------------------------
// §3 — the question bank. Choices are written correct-first; `answerIndex` is
// always 0 here and the app shuffles at render. Difficulty selects the level
// clock (safe quiz.ts LEVELS): 1 = the gimme, 2 = the squeeze, 3 = the
// reckoning. 67 items — 22 gimme / 23 squeeze / 22 reckoning — including a
// current-events set (review those periodically; they are the ones that age).
// ---------------------------------------------------------------------------

const USCIS = 'https://www.uscis.gov/sites/default/files/document/questions-and-answers/OoC_100_Questions_2008_Civics_Test_V1.pdf';
const CONST = 'https://constitution.congress.gov/constitution/';
const SCOTUS_BIO = 'https://www.supremecourt.gov/about/biographies.aspx';

export const QUESTIONS: Question[] = [
	// --- structure — the gimme -------------------------------------------------
	{ id: 'q01-supreme-law', prompt: 'What is the supreme law of the land?', choices: ['the Constitution', 'the Declaration of Independence', 'the Bill of Rights', 'the Federalist Papers'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-structure', difficulty: 1 },
	{ id: 'q06-congress-parts', prompt: 'What are the two parts of the U.S. Congress?', choices: ['the Senate and the House of Representatives', 'the House and the Cabinet', 'the Senate and the Supreme Court', 'the Executive and the Judicial'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-structure', difficulty: 1 },
	{ id: 'q07-senators', prompt: 'How many U.S. Senators are there?', choices: ['100', '50', '435', '270'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-structure', difficulty: 1 },
	{ id: 'q09-president-term', prompt: 'We elect a President for how many years?', choices: ['4', '6', '2', '8'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-structure', difficulty: 1 },
	{ id: 'q12-commander', prompt: 'Who is the Commander in Chief of the military?', choices: ['the President', 'the Secretary of Defense', 'the Speaker of the House', 'the Chief Justice'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-structure', difficulty: 1 },
	{ id: 'q14-highest-court', prompt: 'What is the highest court in the United States?', choices: ['the Supreme Court', 'the Court of Appeals', 'the Federal District Court', 'the Congressional Court'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-structure', difficulty: 1 },
	{ id: 'q26-makes-laws', prompt: 'Which branch of the federal government makes the laws?', choices: ['the legislative', 'the executive', 'the judicial', 'the administrative'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-structure', difficulty: 1 },
	{ id: 'q27-signs-bills', prompt: 'Who signs bills so they become law?', choices: ['the President', 'the Chief Justice', 'the Speaker of the House', 'the Attorney General'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-structure', difficulty: 1 },
	{ id: 'q29-executive-head', prompt: 'Who is the head of the executive branch?', choices: ['the President', 'the Speaker of the House', 'the Chief Justice', 'the Vice President'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-structure', difficulty: 1 },
	{ id: 'q35-three-branches', prompt: 'How many branches does the U.S. government have?', choices: ['3', '2', '4', '5'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-structure', difficulty: 1 },

	// --- structure — the squeeze ----------------------------------------------
	{ id: 'q02-amendments', prompt: 'How many amendments does the Constitution have?', choices: ['27', '25', '10', '50'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-structure', difficulty: 2 },
	{ id: 'q08-house-members', prompt: 'How many voting members does the House of Representatives have?', choices: ['435', '100', '50', '535'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-structure', difficulty: 2 },
	{ id: 'q10-senator-term', prompt: 'We elect a U.S. Senator for how many years?', choices: ['6', '4', '2', '10'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-structure', difficulty: 2 },
	{ id: 'q11-checks', prompt: 'What stops one branch of government from becoming too powerful?', choices: ['checks and balances', 'the electoral college', 'the Bill of Rights', 'the two-party system'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-structure', difficulty: 2 },
	{ id: 'q13-succession', prompt: 'If the President can no longer serve, who becomes President?', choices: ['the Vice President', 'the Speaker of the House', 'the Chief Justice', 'the Senate Majority Leader'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-structure', difficulty: 2 },
	{ id: 'q15-judicial', prompt: 'What does the judicial branch do?', choices: ['reviews and explains laws', 'writes new laws', 'signs bills into law', 'commands the military'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-structure', difficulty: 2 },
	{ id: 'q25-congress-total', prompt: 'How many voting members serve in Congress in total?', choices: ['535', '435', '100', '538'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-structure', difficulty: 2 },
	{ id: 'q28-cabinet', prompt: 'What does the President\u2019s Cabinet do?', choices: ['advises the President', 'writes the laws', 'judges the laws', 'elects the President'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-structure', difficulty: 2 },
	{ id: 'q30-house-term', prompt: 'How long is a term for a member of the House of Representatives?', choices: ['2 years', '4 years', '6 years', '8 years'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-structure', difficulty: 2 },
	{ id: 'q33-speaker-role', prompt: 'What is the role of the Speaker of the House?', choices: ['leads the House of Representatives', 'leads the Senate', 'leads the Supreme Court', 'leads the Cabinet'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-structure', difficulty: 2 },
	{ id: 'q38-term-limits', prompt: 'How many times can a person be elected President?', choices: ['twice', 'once', 'three times', 'unlimited'], answerIndex: 0, sourceUrl: CONST, category: 'civics-structure', difficulty: 2 },

	// --- structure — the reckoning --------------------------------------------
	{ id: 'q24-justices', prompt: 'How many justices currently sit on the Supreme Court?', choices: ['9', '7', '11', '13'], answerIndex: 0, sourceUrl: SCOTUS_BIO, category: 'civics-structure', difficulty: 3 },
	{ id: 'q31-seventeenth', prompt: 'Which amendment says U.S. Senators are elected directly by the people?', choices: ['the Seventeenth', 'the Thirteenth', 'the Nineteenth', 'the Twenty-Sixth'], answerIndex: 0, sourceUrl: 'https://constitution.congress.gov/constitution/amendment-17/', category: 'civics-structure', difficulty: 3 },
	{ id: 'q32-ambassadors', prompt: 'Who represents the United States in other countries?', choices: ['ambassadors', 'governors', 'senators', 'federal judges'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-structure', difficulty: 3 },
	{ id: 'q36-line-of-succession', prompt: 'If both the President and Vice President can no longer serve, who becomes President?', choices: ['the Speaker of the House', 'the Chief Justice', 'the Senate Majority Leader', 'the Secretary of State'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-structure', difficulty: 3 },
	{ id: 'q37-president-age', prompt: 'What is the minimum age to be President?', choices: ['35', '25', '30', '40'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-structure', difficulty: 3 },
	{ id: 'q39-22nd-amendment', prompt: 'Which amendment limits a President to two terms?', choices: ['the Twenty-Second', 'the Twentieth', 'the Twenty-Fifth', 'the Twelfth'], answerIndex: 0, sourceUrl: 'https://constitution.congress.gov/constitution/amendment-22/', category: 'civics-structure', difficulty: 3 },

	// --- rights — the gimme ----------------------------------------------------
	{ id: 'q03-first-ten', prompt: 'What do we call the first ten amendments to the Constitution?', choices: ['the Bill of Rights', 'the Federalist Papers', 'the Articles of Confederation', 'the Emancipation Proclamation'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-rights', difficulty: 1 },
	{ id: 'q04-first-amendment', prompt: 'Name one right guaranteed by the First Amendment.', choices: ['freedom of speech', 'the right to bear arms', 'the right to a jury trial', 'the right to vote at 18'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-rights', difficulty: 1 },
	{ id: 'q43-bill-of-rights-count', prompt: 'How many amendments are in the Bill of Rights?', choices: ['10', '12', '7', '27'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-rights', difficulty: 1 },

	// --- rights — the squeeze --------------------------------------------------
	{ id: 'q05-bear-arms', prompt: 'Which amendment protects the right to bear arms?', choices: ['the Second', 'the First', 'the Fourth', 'the Tenth'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-rights', difficulty: 2 },
	{ id: 'q40-13th-amendment', prompt: 'Which amendment abolished slavery?', choices: ['the Thirteenth', 'the Fourteenth', 'the Fifteenth', 'the Nineteenth'], answerIndex: 0, sourceUrl: 'https://constitution.congress.gov/constitution/amendment-13/', category: 'civics-rights', difficulty: 2 },
	{ id: 'q41-19th-amendment', prompt: 'Which amendment gave women the right to vote?', choices: ['the Nineteenth', 'the Fifteenth', 'the Twenty-First', 'the Twenty-Sixth'], answerIndex: 0, sourceUrl: 'https://constitution.congress.gov/constitution/amendment-19/', category: 'civics-rights', difficulty: 2 },

	// --- rights — the reckoning ------------------------------------------------
	{ id: 'q42-26th-amendment', prompt: 'Which amendment gave 18-year-olds the right to vote?', choices: ['the Twenty-Sixth', 'the Nineteenth', 'the Twenty-First', 'the Twenty-Fourth'], answerIndex: 0, sourceUrl: 'https://constitution.congress.gov/constitution/amendment-26/', category: 'civics-rights', difficulty: 3 },
	{ id: 'q44-4th-amendment', prompt: 'Which amendment protects against unreasonable searches and seizures?', choices: ['the Fourth', 'the First', 'the Fifth', 'the Eighth'], answerIndex: 0, sourceUrl: 'https://constitution.congress.gov/constitution/amendment-4/', category: 'civics-rights', difficulty: 3 },
	{ id: 'q45-5th-amendment', prompt: 'Which amendment protects a person from being forced to incriminate themselves?', choices: ['the Fifth', 'the Fourth', 'the Sixth', 'the Seventh'], answerIndex: 0, sourceUrl: 'https://constitution.congress.gov/constitution/amendment-5/', category: 'civics-rights', difficulty: 3 },
	{ id: 'q46-6th-amendment', prompt: 'Which amendment guarantees the right to a speedy and public trial?', choices: ['the Sixth', 'the Fifth', 'the Seventh', 'the Eighth'], answerIndex: 0, sourceUrl: 'https://constitution.congress.gov/constitution/amendment-6/', category: 'civics-rights', difficulty: 3 },
	{ id: 'q47-21st-amendment', prompt: 'Which amendment repealed the prohibition of alcohol?', choices: ['the Twenty-First', 'the Eighteenth', 'the Nineteenth', 'the Twenty-Second'], answerIndex: 0, sourceUrl: 'https://constitution.congress.gov/constitution/amendment-21/', category: 'civics-rights', difficulty: 3 },
	{ id: 'q48-14th-amendment', prompt: 'Which amendment guarantees equal protection under the law?', choices: ['the Fourteenth', 'the Thirteenth', 'the Fifteenth', 'the Fifth'], answerIndex: 0, sourceUrl: 'https://constitution.congress.gov/constitution/amendment-14/', category: 'civics-rights', difficulty: 3 },

	// --- history — the gimme ---------------------------------------------------
	{ id: 'q16-declaration-author', prompt: 'Who wrote the Declaration of Independence?', choices: ['Thomas Jefferson', 'George Washington', 'Benjamin Franklin', 'James Madison'], answerIndex: 0, sourceUrl: USCIS, category: 'history', difficulty: 1 },
	{ id: 'q19-civil-war', prompt: 'Name the U.S. war between the North and the South.', choices: ['the Civil War', 'the Revolutionary War', 'World War I', 'the War of 1812'], answerIndex: 0, sourceUrl: USCIS, category: 'history', difficulty: 1 },
	{ id: 'q50-first-president', prompt: 'Who was the first President of the United States?', choices: ['George Washington', 'Thomas Jefferson', 'John Adams', 'James Madison'], answerIndex: 0, sourceUrl: USCIS, category: 'history', difficulty: 1 },
	{ id: 'q52-we-the-people', prompt: 'Which document begins with the words \u201cWe the People\u201d?', choices: ['the Constitution', 'the Declaration of Independence', 'the Bill of Rights', 'the Gettysburg Address'], answerIndex: 0, sourceUrl: USCIS, category: 'history', difficulty: 1 },
	{ id: 'q58-revolutionary-war', prompt: 'Which country did the United States fight in the Revolutionary War?', choices: ['Britain', 'France', 'Spain', 'Mexico'], answerIndex: 0, sourceUrl: USCIS, category: 'history', difficulty: 1 },

	// --- history — the squeeze -------------------------------------------------
	{ id: 'q17-declaration-date', prompt: 'When was the Declaration of Independence adopted?', choices: ['July 4, 1776', 'September 17, 1787', 'July 4, 1789', 'December 15, 1791'], answerIndex: 0, sourceUrl: USCIS, category: 'history', difficulty: 2 },
	{ id: 'q20-emancipation', prompt: 'What did the Emancipation Proclamation do?', choices: ['freed slaves in the Confederate states', 'ended World War I', 'gave women the right to vote', 'created the Bill of Rights'], answerIndex: 0, sourceUrl: USCIS, category: 'history', difficulty: 2 },
	{ id: 'q54-nixon-resigns', prompt: 'Which President resigned from office, in 1974?', choices: ['Richard Nixon', 'Lyndon Johnson', 'Gerald Ford', 'Jimmy Carter'], answerIndex: 0, sourceUrl: USCIS, category: 'history', difficulty: 2 },
	{ id: 'q57-cold-war', prompt: 'What was the Cold War?', choices: ['a decades-long U.S.\u2013Soviet rivalry', 'a war fought in Europe', 'a trade dispute with China', 'an American civil war'], answerIndex: 0, sourceUrl: USCIS, category: 'history', difficulty: 2 },

	// --- history — the reckoning ----------------------------------------------
	{ id: 'q18-constitution-written', prompt: 'When was the Constitution written?', choices: ['1787', '1776', '1791', '1803'], answerIndex: 0, sourceUrl: USCIS, category: 'history', difficulty: 3 },
	{ id: 'q21-louisiana', prompt: 'What territory did the United States buy from France in 1803?', choices: ['the Louisiana Territory', 'the Oregon Territory', 'the Alaska Territory', 'the Florida Territory'], answerIndex: 0, sourceUrl: USCIS, category: 'history', difficulty: 3 },
	{ id: 'q49-marbury', prompt: 'Which Supreme Court case established the power of judicial review?', choices: ['Marbury v. Madison', 'Brown v. Board of Education', 'Dred Scott v. Sandford', 'Plessy v. Ferguson'], answerIndex: 0, sourceUrl: 'https://www.uscourts.gov/about-federal-courts/educational-resources/supreme-court-landmarks/marbury-v-madison-petitioner', category: 'history', difficulty: 3 },
	{ id: 'q51-civil-war-end', prompt: 'In what year did the Civil War end?', choices: ['1865', '1863', '1861', '1870'], answerIndex: 0, sourceUrl: USCIS, category: 'history', difficulty: 3 },
	{ id: 'q53-federalist-papers', prompt: 'What were the Federalist Papers?', choices: ['essays arguing for ratifying the Constitution', 'the first federal laws', 'anti-slavery pamphlets', 'the first ten amendments'], answerIndex: 0, sourceUrl: 'https://guides.loc.gov/federalist-papers', category: 'history', difficulty: 3 },
	{ id: 'q55-first-impeachment', prompt: 'Who was the first President to be impeached?', choices: ['Andrew Johnson', 'Bill Clinton', 'Richard Nixon', 'Andrew Jackson'], answerIndex: 0, sourceUrl: 'https://www.senate.gov/about/powers-procedures/impeachment/impeachment-list.htm', category: 'history', difficulty: 3 },
	{ id: 'q56-women-suffrage-year', prompt: 'In what year did the Nineteenth Amendment give women the vote nationwide?', choices: ['1920', '1865', '1918', '1933'], answerIndex: 0, sourceUrl: 'https://constitution.congress.gov/constitution/amendment-19/', category: 'history', difficulty: 3 },

	// --- symbols & geography ---------------------------------------------------
	{ id: 'q22-911', prompt: 'What major event happened on September 11, 2001?', choices: ['terrorists attacked the United States', 'the stock market crashed', 'the Berlin Wall fell', 'the Persian Gulf War began'], answerIndex: 0, sourceUrl: USCIS, category: 'symbols-geography', difficulty: 1 },
	{ id: 'q23-anthem', prompt: 'What is the name of the national anthem?', choices: ['The Star-Spangled Banner', 'America the Beautiful', 'God Bless America', 'My Country, \'Tis of Thee'], answerIndex: 0, sourceUrl: USCIS, category: 'symbols-geography', difficulty: 1 },
	{ id: 'q59-capital', prompt: 'What is the capital of the United States?', choices: ['Washington, D.C.', 'New York City', 'Philadelphia', 'Boston'], answerIndex: 0, sourceUrl: USCIS, category: 'symbols-geography', difficulty: 1 },
	{ id: 'q60-flag-stars', prompt: 'How many stars are on the U.S. flag?', choices: ['50', '13', '48', '52'], answerIndex: 0, sourceUrl: USCIS, category: 'symbols-geography', difficulty: 1 },
	{ id: 'q61-flag-stripes', prompt: 'What do the stripes on the U.S. flag represent?', choices: ['the original 13 colonies', 'the 50 states', 'the three branches', 'the amendments'], answerIndex: 0, sourceUrl: USCIS, category: 'symbols-geography', difficulty: 2 },

	// --- current events (refresh these — they are the ones that age) ----------
	{ id: 'q62-chief-justice', prompt: 'Who is the Chief Justice of the United States?', choices: ['John Roberts', 'Clarence Thomas', 'Sonia Sotomayor', 'Elena Kagan'], answerIndex: 0, sourceUrl: SCOTUS_BIO, category: 'current', difficulty: 2 },
	{ id: 'q64-first-black-woman-justice', prompt: 'Who was the first Black woman to serve on the Supreme Court?', choices: ['Ketanji Brown Jackson', 'Sonia Sotomayor', 'Kamala Harris', 'Thurgood Marshall'], answerIndex: 0, sourceUrl: SCOTUS_BIO, category: 'current', difficulty: 2 },
	{ id: 'q65-us-population', prompt: 'Roughly what is the population of the United States?', choices: ['about 330 million', 'about 100 million', 'about 500 million', 'about 30 million'], answerIndex: 0, sourceUrl: 'https://www.census.gov/popclock/', category: 'current', difficulty: 2 },
	{ id: 'q68-january-6', prompt: 'What happened at the U.S. Capitol on January 6, 2021?', choices: ['a mob attacked the Capitol', 'a fire broke out', 'a new President was sworn in', 'a treaty was signed'], answerIndex: 0, sourceUrl: 'https://www.justice.gov/usao-dc/capitol-breach-cases', category: 'current', difficulty: 2 },
	{ id: 'q63-dobbs', prompt: 'In what year did the Supreme Court overturn Roe v. Wade?', choices: ['2022', '2018', '2020', '2024'], answerIndex: 0, sourceUrl: 'https://www.supremecourt.gov/opinions/21pdf/19-1392_6j37.pdf', category: 'current', difficulty: 3 },
	{ id: 'q66-largest-population', prompt: 'Which country has the largest population in the world?', choices: ['India', 'China', 'the United States', 'Indonesia'], answerIndex: 0, sourceUrl: 'https://population.un.org/wpp/', category: 'current', difficulty: 3 },
	{ id: 'q67-afghanistan', prompt: 'In what year did the United States complete its withdrawal from Afghanistan?', choices: ['2021', '2019', '2023', '2016'], answerIndex: 0, sourceUrl: 'https://www.state.gov/u-s-relations-with-afghanistan/', category: 'current', difficulty: 3 }
];


// ---------------------------------------------------------------------------
// §4 — the statistics inventory (24 stats, 4 per section, 6 sections).
// ---------------------------------------------------------------------------

export const STATS: Stat[] = [
	// Civics
	{ id: 's01-branches', section: 'civics', figure: '35%', claim: 'of U.S. adults cannot name all three branches of government.', dryLine: 'one in three adults doesn\'t know the system has three parts. it has had three parts since 1789.', sourceOutlet: 'Annenberg Public Policy Center', sourceYear: 2026, sourceUrl: 'https://www.annenbergpublicpolicycenter.org/a-third-of-americans-cannot-name-the-three-branches-of-government/' },
	{ id: 's02-first-amendment', section: 'civics', figure: '73%', claim: 'name freedom of speech as a First Amendment right; only 29% name freedom of the press.', dryLine: 'the amendment has five rights. most people can produce exactly one of them on command.', sourceOutlet: 'Annenberg Public Policy Center', sourceYear: 2026, sourceUrl: 'https://www.annenbergpublicpolicycenter.org/a-third-of-americans-cannot-name-the-three-branches-of-government/' },
	{ id: 's03-second-amendment', section: 'civics', figure: '25%', claim: 'of Americans incorrectly believe the right to bear arms is protected by the First Amendment.', dryLine: 'it\'s the second amendment. it has been the second amendment for 235 years.', sourceOutlet: 'Annenberg Public Policy Center', sourceYear: 2026, sourceUrl: 'https://www.annenbergpublicpolicycenter.org/a-third-of-americans-cannot-name-the-three-branches-of-government/' },
	{ id: 's04-citizenship', section: 'civics', figure: '36%', claim: 'of Americans could pass a multiple-choice version of the U.S. citizenship test, which has a passing score of 60%.', dryLine: 'that\'s the test people applying for citizenship have to pass. two out of three native-born adults wouldn\'t.', sourceOutlet: 'Woodrow Wilson National Fellowship Foundation / Citizens & Scholars', sourceYear: 2018, sourceUrl: 'https://citizensandscholars.org/resource/national-survey-finds-just-1-in-3-americans-would-pass-citizenship-test/' },

	// Reading & literacy
	{ id: 's05-literacy-level1', section: 'literacy', figure: '19%', claim: 'of U.S. adults score at the lowest literacy proficiency level (Level 1 or below).', dryLine: 'roughly one in five adults reads at a level built for early instruction, not daily life.', sourceOutlet: 'National Center for Education Statistics', sourceYear: 2017, sourceUrl: 'https://nces.ed.gov/fastfacts/display.asp?id=69' },
	{ id: 's06-literacy-international', section: 'literacy', figure: '48%', claim: 'of U.S. adults reach high literacy proficiency (Level 3+), compared with 72% in Japan and 63% in Finland.', dryLine: 'japan clears the same bar at a rate of nearly three in four. we clear it at under half.', sourceOutlet: 'NCES / OECD', sourceYear: 2015, sourceUrl: 'https://nces.ed.gov/fastfacts/display.asp?id=69' },
	{ id: 's07-fourth-grade-reading', section: 'literacy', figure: '31%', claim: 'of fourth-graders read at or above NAEP Proficient in 2024, down 4 points from 2019.', dryLine: 'fewer than a third of ten-year-olds read at grade-appropriate proficiency, and the number is still falling.', sourceOutlet: 'NCES', sourceYear: 2024, sourceUrl: 'https://www.nationsreportcard.gov/reports/reading/2024/g4_8/?grade=4' },
	{ id: 's08-twelfth-grade-reading', section: 'literacy', figure: '32%', claim: 'of twelfth-graders scored below NAEP Basic in reading in 2024 — the largest share ever recorded.', dryLine: 'these are students twelve months from a diploma. this is the worst the test has ever measured them.', sourceOutlet: 'National Assessment Governing Board', sourceYear: 2024, sourceUrl: 'https://www.nagb.gov/news-and-events/news-releases/2025/nations-report-card-decline-in-reading-progress-in-math.html' },

	// Science & trust in expertise
	{ id: 's09-scientist-confidence', section: 'science', figure: '77%', claim: 'of U.S. adults have at least a fair amount of confidence in scientists, down from 87% in April 2020.', dryLine: 'confidence in scientists dropped ten points in six years. the science didn\'t change that much.', sourceOutlet: 'Pew Research Center', sourceYear: 2026, sourceUrl: 'https://www.pewresearch.org/science/2026/01/15/americans-confidence-in-scientists/' },
	{ id: 's10-scientist-partisan', section: 'science', figure: '90% vs 65%', claim: 'of Democrats versus Republicans express at least a fair amount of confidence in scientists.', dryLine: 'whether you trust a chemist now depends on how you vote. chemistry did not used to be a ballot line.', sourceOutlet: 'Pew Research Center', sourceYear: 2026, sourceUrl: 'https://www.pewresearch.org/science/2026/01/15/americans-confidence-in-scientists/' },
	{ id: 's11-eighth-grade-science', section: 'science', figure: '31%', claim: 'of eighth-graders scored at or above NAEP Proficient in science in 2024; 38% scored below Basic.', dryLine: 'students below NAEP Basic likely can\'t recall that plants need sunlight. that\'s not a proficiency gap. that\'s the floor giving out.', sourceOutlet: 'National Assessment Governing Board', sourceYear: 2024, sourceUrl: 'https://www.nagb.gov/news-and-events/news-releases/2025/declines-in-8th-grade-science-and-12th-grade-math-and-reading.html' },
	{ id: 's12-media-trust', section: 'science', figure: '31%', claim: 'of Americans trust mass media to report the news "fully, accurately, and fairly" — tied for the lowest ever recorded.', dryLine: 'less than a third of the country trusts the one institution whose entire job is telling them what\'s true.', sourceOutlet: 'Gallup', sourceYear: 2024, sourceUrl: 'https://news.gallup.com/poll/651977/americans-trust-media-remains-historically-low.aspx' },

	// Education system
	{ id: 's13-graduation-rate', section: 'education', figure: '87%', claim: 'was the national high school graduation rate in 2021–22.', dryLine: '87% of students leave high school with a diploma. 35% leave able to read at a proficient level. the diploma and the skill are not the same claim.', sourceOutlet: 'NCES', sourceYear: 2024, sourceUrl: 'https://nces.ed.gov/programs/coe/indicator/coi/high-school-graduation-rates' },
	{ id: 's14-civics-proficiency', section: 'education', figure: '22%', claim: 'of eighth-graders scored at or above NAEP Proficient in civics in 2022 — statistically unchanged since 1998.', dryLine: 'twenty-four years of civics instruction, testing, and hand-wringing, and the proficiency rate hasn\'t moved.', sourceOutlet: 'NCES', sourceYear: 2022, sourceUrl: 'https://www.nationsreportcard.gov/civics/results/achievement/' },
	{ id: 's15-math-proficiency', section: 'education', figure: '22%', claim: 'of twelfth-graders scored at or above NAEP Proficient in math in 2024; 45% scored below Basic.', dryLine: 'nearly half of graduating seniors can\'t clear the basic bar in math. they will still graduate.', sourceOutlet: 'National Assessment Governing Board', sourceYear: 2024, sourceUrl: 'https://www.nagb.gov/news-and-events/news-releases/2025/declines-in-8th-grade-science-and-12th-grade-math-and-reading.html' },
	{ id: 's16-enrollment', section: 'education', figure: '−15%', claim: 'was the fall in undergraduate enrollment between 2010 and 2021, from 18.1 million to 15.4 million.', dryLine: '2.7 million fewer people decided a degree was worth finishing. some of them were right to skip it. not all of them.', sourceOutlet: 'NCES', sourceYear: 2021, sourceUrl: 'https://nces.ed.gov/programs/coe/indicator/cha' },

	// Media & information
	{ id: 's17-fact-vs-opinion', section: 'media', figure: '26%', claim: 'of Americans correctly classified all five factual statements as factual in a mixed set.', dryLine: 'a quarter of the country can reliably tell a fact from an opinion when both are printed side by side.', sourceOutlet: 'Pew Research Center', sourceYear: 2018, sourceUrl: 'https://www.pewresearch.org/journalism/2018/06/18/distinguishing-between-factual-and-opinion-statements-in-the-news/' },
	{ id: 's18-opinion-vs-fact', section: 'media', figure: '35%', claim: 'correctly classified all five opinion statements as opinion in the same study.', dryLine: 'people are slightly better at spotting someone else\'s opinion than at spotting a plain fact. draw your own conclusion carefully.', sourceOutlet: 'Pew Research Center', sourceYear: 2018, sourceUrl: 'https://www.pewresearch.org/journalism/2018/06/18/distinguishing-between-factual-and-opinion-statements-in-the-news/' },
	{ id: 's19-news-influencers', section: 'media', figure: '21%', claim: 'of U.S. adults regularly get news from social media "news influencers," unchanged from 2024 to 2025.', dryLine: 'one in five adults gets their news from someone with a ring light and no editor.', sourceOutlet: 'Pew Research Center', sourceYear: 2024, sourceUrl: 'https://www.pewresearch.org/journalism/2024/11/18/americas-news-influencers/' },
	{ id: 's20-print-news', section: 'media', figure: '7%', claim: 'of U.S. adults often get news from printed newspapers or magazines as of 2025.', dryLine: 'printed news is a niche habit now, not a default one. the shift happened faster than most people noticed, which is the point.', sourceOutlet: 'Pew Research Center', sourceYear: 2025, sourceUrl: 'https://www.pewresearch.org/journalism/fact-sheet/news-platform-fact-sheet/' },

	// The overall picture
	{ id: 's21-overall-civics', section: 'overall', figure: '35 / 22 / 31', claim: 'can\'t name the three branches; 22% of eighth-graders are proficient in civics; 31% trust the media.', dryLine: 'none of these numbers happened this year. all of them have been sitting here for a while.', sourceOutlet: 'Annenberg / NCES / Gallup', sourceYear: 2026, sourceUrl: 'https://www.annenbergpublicpolicycenter.org/a-third-of-americans-cannot-name-the-three-branches-of-government/' },
	{ id: 's22-overall-reading', section: 'overall', figure: '87 / 35 / 22', claim: 'graduation vs. proficiency: 87% graduate, 35% read at proficient level, 22% do math at proficient level.', dryLine: 'the diploma rate went up. the proficiency rate did not follow it.', sourceOutlet: 'NCES / NAGB', sourceYear: 2024, sourceUrl: 'https://nces.ed.gov/programs/coe/indicator/coi/high-school-graduation-rates' },
	{ id: 's23-overall-immigrants', section: 'overall', figure: '36% vs 91%', claim: 'of Americans could pass the civics test required of immigrants — who pass the oral exam at a rate around 91%.', dryLine: 'the people studying for citizenship pass at a higher rate than the people who already have it.', sourceOutlet: 'Woodrow Wilson National Fellowship Foundation', sourceYear: 2018, sourceUrl: 'https://citizensandscholars.org/resource/national-survey-finds-just-1-in-3-americans-would-pass-citizenship-test/' },
	{ id: 's24-overall-trust', section: 'overall', figure: '77% → 31%', claim: 'confidence in scientists fell 10 points since 2020; trust in media sits at 31%, tied for an all-time low.', dryLine: 'the institutions built to tell you what\'s true are trusted by roughly a third of the country. that\'s not a coincidence. that\'s a pattern.', sourceOutlet: 'Pew Research Center / Gallup', sourceYear: 2026, sourceUrl: 'https://www.pewresearch.org/science/2026/01/15/americans-confidence-in-scientists/' }
];

// ---------------------------------------------------------------------------
// §1 — the lesson, seven beats.
// ---------------------------------------------------------------------------

export interface Beat {
	lines: string[];
	emphatic?: number; // line index rendered in accent type (0-based) where applicable
	cta?: boolean; // last beat — carries the START button
}

export const LESSON_BEATS: Beat[] = [
	{ lines: ['idiot.', 'we have it backwards.', 'it never named the man who didn\'t know.', 'it named the man who didn\'t show up.'] },
	{ lines: ['the idiot kept his gate shut.', 'blinds down, porch light off, nothing in the flag bracket.', 'didn\'t vote. didn\'t serve. didn\'t show up.', 'tended his own yard, and nothing else.'], emphatic: 0 },
	{ lines: ['here\'s the part almost everyone gets wrong.', 'they did not think the idiot was stupid.', 'the idiot knew exactly what was on the agenda — could have walked you through it, in detail.', 'just didn\'t care to be there.'] },
	{ lines: ['and the country did not find it quaint.', 'a republic runs on the people who show up — who vote, who serve, who pay attention when it\'s boring.', 'the idiot took the protection and gave nothing back.', 'that was never a personality type. that was a citizen in name only.'], emphatic: 2 },
	{ lines: ['so the word drifted. it always does.', 'showing up got cheaper to skip — fewer meetings to sit through, fewer consequences for not knowing.', 'from the man who wouldn\'t participate, to the man who didn\'t know, to the man who plainly didn\'t care to.', 'same contempt. softer target.'] },
	{ lines: ['which brings us to now.', 'the modern american idiot is not the citizen who doesn\'t know the answer.', 'it\'s the citizen who is certain of it, wrong about it, and completely unbothered by either fact.'], emphatic: 2 },
	{ lines: ['you\'re about to find out which one you are.'], cta: true }
];

export const SKIP_LINE = 'skip →';
export const SKIP_COPY = 'you skipped the one part that would have helped';
export const REENTRY_LINK = "what's an idiot, actually? ↗";

// Image id per beat (index-aligned with LESSON_BEATS), per IMAGE-BRIEF.md §2.
// Decorative texture — never content, always rendered alt="" / aria-hidden.
export const BEAT_IMAGE_IDS: string[] = [
	'beat-1',
	'beat-2',
	'beat-3',
	'beat-4',
	'beat-5',
	'beat-6',
	'beat-7'
];

// ---------------------------------------------------------------------------
// §2 — copy banks.
// ---------------------------------------------------------------------------

// §2.1 — wrong-answer shame lines (15).
export const WRONG_LINES: string[] = [
	'you said that like you were sure',
	'confident. also wrong',
	'that answer had a lot of conviction behind it',
	'you picked fast. you picked wrong',
	'not even close, but you didn\'t hesitate',
	'that was a guess wearing a suit',
	'the founders did not consult you on this one',
	'bold pick. bad pick',
	'you have never been more sure of anything less true',
	'wrong, and you knew it a half-second too late',
	'that\'s not it. it was never going to be it',
	'you answered like the clock was the real enemy',
	'a swing. a miss. a shrug',
	'you\'ll defend that answer at a party tonight. don\'t',
	'he noticed'
];

// §2.2 — timeout lines (5).
export const TIMEOUT_LINES: string[] = [
	'the silence said enough',
	'that quiet was the answer',
	'time ran out before you did',
	'nothing, and nothing counts',
	'you let the clock decide. it decided against you'
];

export const NO_ANSWER_LABEL = 'no answer';

// §2.3 — escalating correct-answer lines, by ordinal position (1st–5th).
export const CORRECT_LINES: string[] = [
	'correct. that one\'s easy',
	'two right. still watching',
	'three. you\'re doing better than most',
	'four for four so far. huh',
	'five for five. that\'s not luck'
];

// §2.4 — tier labels and descriptions.
export const TIER_DETAILS: Record<Tier, { label: string; description: string }> = {
	CITIZEN: { label: 'CITIZEN', description: 'you know the thing. genuinely. no notes. go be insufferable about it to a friend who scored a two.' },
	RESIDENT: { label: 'RESIDENT', description: 'close. you clearly know how this works — you just tripped once. that happens to people who actually pay attention.' },
	'IDIŌTĒS': { label: 'IDIŌTĒS', description: 'the original meaning. not stupid, just not here. you know some of it, and you\'ve been coasting on the rest.' },
	IDIOT: { label: 'IDIOT', description: 'we don\'t say it lightly, and we\'re not saying it lightly now. you weren\'t unlucky. you were unbothered, and it showed.' }
};

// §2.5 — the patriotic pep talk (identical pass or fail).
export const PEP_TALK: string[] = [
	'here\'s what you were promised: a country that answers to you, not the other way around. not a king, not a priesthood of experts, not a party — a system built so the people running it work for the people living under it. that\'s the whole idea. it has never once run on autopilot.',
	'it costs something to keep. not blood, most years — just attention. knowing which branch does what. knowing what the first amendment actually protects, so you notice when someone tells you it doesn\'t. showing up to the small, boring elections, not just the loud ones. none of it is hard. all of it is optional, which is exactly why it keeps slipping.',
	'you didn\'t have to get a perfect score today. nobody hands you this knowledge at birth — you have to go get it, and most people don\'t, and that\'s a fixable problem, not a character flaw. it is not too late, and it is not hard. read one more thing. ask one more question. show up once more than you were planning to. that\'s the whole job. that\'s always been the whole job.'
];

