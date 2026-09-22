import type { Question, Stat, Tier } from './types';

// ---------------------------------------------------------------------------
// §3 — the question bank. Prompts are the official USCIS civics test questions
// (2008 version, the 100-question set) verbatim; the four-choice distractors are
// ours. Choices are written correct-first, `answerIndex` is always 0, and the
// app shuffles at render. Difficulty selects the level clock and length (see
// quiz.ts LEVELS): 1 = the rally, 2 = the echo chamber, 3 = not maga. 107 items —
// 35 / 49 / 23 — where level 3 deliberately adds questions harder than the
// citizenship test. The `current` set ages: re-check it periodically.
// ---------------------------------------------------------------------------

const USCIS = 'https://www.uscis.gov/sites/default/files/document/questions-and-answers/OoC_100_Questions_2008_Civics_Test_V1.pdf';
const CONST = 'https://constitution.congress.gov/constitution/';
const SCOTUS_BIO = 'https://www.supremecourt.gov/about/biographies.aspx';

export const QUESTIONS: Question[] = [
	{ id: 'q01-supreme-law', prompt: 'What is the supreme law of the land?', choices: ['the Constitution', 'the Declaration of Independence', 'the Bill of Rights', 'the Articles of Confederation'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-structure', difficulty: 1 },
	{ id: 'q02-constitution-purpose', prompt: 'What does the Constitution do?', choices: ['sets up the government', 'elects the President', 'collects taxes', 'declares war'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-structure', difficulty: 1 },
	{ id: 'q03-self-government', prompt: 'The idea of self-government is in the first three words of the Constitution.  What are these words?', choices: ['We the People', 'All Men Are', 'United States of', 'One Nation Under'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-structure', difficulty: 1 },
	{ id: 'q04-amendment', prompt: 'What is an amendment?', choices: ['a change to the Constitution', 'a new law passed by Congress', 'a Supreme Court ruling', 'a presidential order'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-structure', difficulty: 2 },
	{ id: 'q05-bill-of-rights', prompt: 'What do we call the first ten amendments to the Constitution?', choices: ['the Bill of Rights', 'the Articles of Confederation', 'the Federalist Papers', 'the Declaration of Independence'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-rights', difficulty: 1 },
	{ id: 'q06-first-amendment', prompt: 'What is one right or freedom from the First Amendment?', choices: ['speech', 'the right to bear arms', 'the right to a jury trial', 'the right to vote'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-rights', difficulty: 1 },
	{ id: 'q07-amendments', prompt: 'How many amendments does the Constitution have?', choices: ['27', '25', '10', '33'], answerIndex: 0, sourceUrl: CONST, category: 'civics-structure', difficulty: 2 },
	{ id: 'q08-declaration', prompt: 'What did the Declaration of Independence do?', choices: ['announced our independence from Great Britain', 'established the Constitution', 'ended the Civil War', 'founded the first political party'], answerIndex: 0, sourceUrl: USCIS, category: 'history', difficulty: 2 },
	{ id: 'q09-declaration-rights', prompt: 'What are two rights in the Declaration of Independence?', choices: ['life', 'voting', 'owning property', 'a fair trial'], answerIndex: 0, sourceUrl: USCIS, category: 'history', difficulty: 2 },
	{ id: 'q10-freedom-religion', prompt: 'What is freedom of religion?', choices: ['You can practice any religion, or not practice a religion.', 'You must follow the state religion.', 'Only one religion is allowed.', 'Religion is banned in public.'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-rights', difficulty: 2 },
	{ id: 'q11-economic-system', prompt: 'What is the economic system in the United States?', choices: ['capitalist economy', 'socialist economy', 'communist economy', 'feudal economy'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-structure', difficulty: 2 },
	{ id: 'q12-rule-of-law', prompt: 'What is the “rule of law”?', choices: ['Everyone must follow the law.', 'Only citizens must follow the law.', 'Only the President must follow the law.', 'Laws apply only to the government.'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-structure', difficulty: 3 },
	{ id: 'q13-branch-government', prompt: 'Name one branch or part of the government.', choices: ['Congress', 'the Cabinet', 'the Supreme Court clerks', 'the Federal Reserve'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-structure', difficulty: 1 },
	{ id: 'q14-checks-balances', prompt: 'What stops one branch of government from becoming too powerful?', choices: ['checks and balances', 'the electoral college', 'term limits', 'popular vote'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-structure', difficulty: 2 },
	{ id: 'q15-executive-branch', prompt: 'Who is in charge of the executive branch?', choices: ['the President', 'the Chief Justice', 'the Speaker of the House', 'the Secretary of State'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-structure', difficulty: 1 },
	{ id: 'q16-federal-laws', prompt: 'Who makes federal laws?', choices: ['Congress', 'the President', 'the Supreme Court', 'the states'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-structure', difficulty: 1 },
	{ id: 'q17-congress-parts', prompt: 'What are the two parts of the U.S. Congress?', choices: ['the Senate and House of Representatives', 'the President and Cabinet', 'the Supreme Court and lower courts', 'the Senate and the President'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-structure', difficulty: 1 },
	{ id: 'q18-senators', prompt: 'How many U.S. Senators are there?', choices: ['100', '50', '435', '200'], answerIndex: 0, sourceUrl: CONST, category: 'civics-structure', difficulty: 2 },
	{ id: 'q19-senator-term', prompt: 'We elect a U.S. Senator for how many years?', choices: ['6', '4', '2', '8'], answerIndex: 0, sourceUrl: CONST, category: 'civics-structure', difficulty: 2 },
	{ id: 'q21-house-members', prompt: 'The House of Representatives has how many voting members?', choices: ['435', '100', '50', '538'], answerIndex: 0, sourceUrl: CONST, category: 'civics-structure', difficulty: 2 },
	{ id: 'q22-representative-term', prompt: 'We elect a U.S. Representative for how many years?', choices: ['2', '4', '6', '8'], answerIndex: 0, sourceUrl: CONST, category: 'civics-structure', difficulty: 2 },
	{ id: 'q24-senator-represents', prompt: 'Who does a U.S. Senator represent?', choices: ['all people of the state', 'only the voters who elected them', 'the President', 'the federal government'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-structure', difficulty: 3 },
	{ id: 'q25-representatives-population', prompt: 'Why do some states have more Representatives than other states?', choices: ["the state's population", "the state's size", "the state's age", "the state's wealth"], answerIndex: 0, sourceUrl: USCIS, category: 'civics-structure', difficulty: 2 },
	{ id: 'q26-president-years', prompt: 'We elect a President for how many years?', choices: ['4', '6', '2', '8'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-structure', difficulty: 1 },
	{ id: 'q27-vote-month', prompt: 'In what month do we vote for President?', choices: ['November', 'January', 'March', 'August'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-structure', difficulty: 1 },
	{ id: 'q30-succession', prompt: 'If the President can no longer serve, who becomes President?', choices: ['the Vice President', 'the Speaker of the House', 'the Secretary of State', 'the Chief Justice'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-structure', difficulty: 1 },
	{ id: 'q31-succession-speaker', prompt: 'If both the President and the Vice President can no longer serve, who becomes President?', choices: ['the Speaker of the House', 'the Vice President', 'the Secretary of State', 'the Chief Justice'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-structure', difficulty: 2 },
	{ id: 'q32-commander-in-chief', prompt: 'Who is the Commander in Chief of the military?', choices: ['the President', 'the Vice President', 'the Secretary of Defense', 'the Speaker of the House'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-structure', difficulty: 1 },
	{ id: 'q33-signs-bills', prompt: 'Who signs bills to become laws?', choices: ['the President', 'the Vice President', 'the Speaker of the House', 'the Chief Justice'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-structure', difficulty: 1 },
	{ id: 'q34-vetoes-bills', prompt: 'Who vetoes bills?', choices: ['the President', 'the Vice President', 'the Speaker of the House', 'the Chief Justice'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-structure', difficulty: 1 },
	{ id: 'q35-cabinet', prompt: 'What does the President’s Cabinet do?', choices: ['advises the President', 'makes the laws', 'declares war', 'appoints judges'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-structure', difficulty: 2 },
	{ id: 'q36-cabinet-positions', prompt: 'What are two Cabinet-level positions?', choices: ['Secretary of State', 'Speaker of the House', 'Senate Majority Leader', 'Chief Justice'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-structure', difficulty: 2 },
	{ id: 'q37-judicial-branch', prompt: 'What does the judicial branch do?', choices: ['reviews laws', 'makes laws', 'enforces laws', 'signs bills'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-structure', difficulty: 2 },
	{ id: 'q38-highest-court', prompt: 'What is the highest court in the United States?', choices: ['the Supreme Court', 'the Court of Appeals', 'the District Court', 'the Federal Circuit Court'], answerIndex: 0, sourceUrl: SCOTUS_BIO, category: 'civics-structure', difficulty: 1 },
	{ id: 'q41-federal-powers', prompt: 'Under our Constitution, some powers belong to the federal government. What is one power of the federal government?', choices: ['to print money', 'to provide schooling', 'to give driver’s licenses', 'to approve zoning'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-structure', difficulty: 2 },
	{ id: 'q42-state-powers', prompt: 'Under our Constitution, some powers belong to the states. What is one power of the states?', choices: ['provide schooling and education', 'to print money', 'to declare war', 'to make treaties'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-structure', difficulty: 2 },
	{ id: 'q45-political-parties', prompt: 'What are the two major political parties in the United States?', choices: ['Democratic and Republican', 'Federalist and Whig', 'Green and Libertarian', 'Socialist and Communist'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-structure', difficulty: 1 },
	{ id: 'q48-vote-amendments', prompt: 'There are four amendments to the Constitution about who can vote. Describe one of them.', choices: ['Citizens eighteen and older can vote', 'Citizens must own property to vote', 'Only landowners can vote', 'Citizens must pay a poll tax to vote'], answerIndex: 0, sourceUrl: CONST, category: 'civics-rights', difficulty: 2 },
	{ id: 'q49-citizen-responsibility', prompt: 'What is one responsibility that is only for United States citizens?', choices: ['serve on a jury', 'pay taxes', 'obey the law', 'attend school'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-rights', difficulty: 2 },
	{ id: 'q50-citizen-right', prompt: 'Name one right only for United States citizens.', choices: ['vote in a federal election', 'freedom of speech', 'right to bear arms', 'right to a fair trial'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-rights', difficulty: 1 },
	{ id: 'q51-rights-everyone', prompt: 'What are two rights of everyone living in the United States?', choices: ['freedom of expression', 'freedom to vote', 'freedom to own property', 'freedom to travel abroad'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-rights', difficulty: 2 },
	{ id: 'q52-pledge-loyalty', prompt: 'What do we show loyalty to when we say the Pledge of Allegiance?', choices: ['the United States', 'the President', 'the Constitution', 'the state government'], answerIndex: 0, sourceUrl: USCIS, category: 'symbols-geography', difficulty: 1 },
	{ id: 'q53-citizen-promise', prompt: 'What is one promise you make when you become a United States citizen?', choices: ['give up loyalty to other countries', 'pay taxes every year', 'vote in every election', 'learn a second language'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-rights', difficulty: 2 },
	{ id: 'q54-vote-age', prompt: 'How old do citizens have to be to vote for President?', choices: ['18', '21', '16', '25'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-rights', difficulty: 1 },
	{ id: 'q55-participate-democracy', prompt: 'What are two ways that Americans can participate in their democracy?', choices: ['vote', 'pay income taxes', 'serve in the military', 'watch the news'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-rights', difficulty: 2 },
	{ id: 'q56-tax-deadline', prompt: 'When is the last day you can send in federal income tax forms?', choices: ['April 15', 'March 15', 'May 15', 'December 31'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-rights', difficulty: 3 },
	{ id: 'q57-selective-service', prompt: 'When must all men register for the Selective Service?', choices: ['at age 18', 'at age 21', 'at age 16', 'at age 30'], answerIndex: 0, sourceUrl: USCIS, category: 'civics-rights', difficulty: 3 },
	{ id: 'q58-colonists-reason', prompt: 'What is one reason colonists came to America?', choices: ['freedom', 'to find gold', 'to start a monarchy', 'to escape cold weather'], answerIndex: 0, sourceUrl: USCIS, category: 'history', difficulty: 2 },
	{ id: 'q59-before-europeans', prompt: 'Who lived in America before the Europeans arrived?', choices: ['American Indians', 'the Pilgrims', 'the Vikings', 'Spanish settlers'], answerIndex: 0, sourceUrl: USCIS, category: 'history', difficulty: 1 },
	{ id: 'q60-sold-as-slaves', prompt: 'What group of people was taken to America and sold as slaves?', choices: ['Africans', 'Europeans', 'Asians', 'Native Americans'], answerIndex: 0, sourceUrl: USCIS, category: 'history', difficulty: 1 },
	{ id: 'q61-colonists-fight-british', prompt: 'Why did the colonists fight the British?', choices: ['because of high taxes', 'because they wanted a king', 'because of the French', 'because they wanted to join Spain'], answerIndex: 0, sourceUrl: USCIS, category: 'history', difficulty: 2 },
	{ id: 'q62-declaration-author', prompt: 'Who wrote the Declaration of Independence?', choices: ['Thomas Jefferson', 'George Washington', 'Benjamin Franklin', 'John Adams'], answerIndex: 0, sourceUrl: USCIS, category: 'history', difficulty: 1 },
	{ id: 'q63-declaration-date', prompt: 'When was the Declaration of Independence adopted?', choices: ['July 4, 1776', 'July 4, 1787', 'July 4, 1770', 'January 1, 1776'], answerIndex: 0, sourceUrl: USCIS, category: 'history', difficulty: 2 },
	{ id: 'q64-original-states', prompt: 'There were 13 original states. Name three.', choices: ['New Hampshire', 'Ohio', 'California', 'Texas'], answerIndex: 0, sourceUrl: USCIS, category: 'history', difficulty: 2 },
	{ id: 'q65-constitutional-convention', prompt: 'What happened at the Constitutional Convention?', choices: ['The Constitution was written.', 'The Declaration of Independence was signed.', 'The Civil War ended.', 'The Bill of Rights was abolished.'], answerIndex: 0, sourceUrl: USCIS, category: 'history', difficulty: 2 },
	{ id: 'q66-constitution-written', prompt: 'When was the Constitution written?', choices: ['1787', '1776', '1791', '1803'], answerIndex: 0, sourceUrl: USCIS, category: 'history', difficulty: 2 },
	{ id: 'q67-federalist-writer', prompt: 'The Federalist Papers supported the passage of the U.S. Constitution. Name one of the writers.', choices: ['James Madison', 'George Washington', 'Thomas Jefferson', 'Benjamin Franklin'], answerIndex: 0, sourceUrl: USCIS, category: 'history', difficulty: 3 },
	{ id: 'q68-franklin-famous', prompt: 'What is one thing Benjamin Franklin is famous for?', choices: ['U.S. diplomat', 'first President', 'wrote the Declaration of Independence', 'invented the telephone'], answerIndex: 0, sourceUrl: USCIS, category: 'history', difficulty: 2 },
	{ id: 'q69-father-of-country', prompt: 'Who is the “Father of Our Country”?', choices: ['George Washington', 'Thomas Jefferson', 'Abraham Lincoln', 'Benjamin Franklin'], answerIndex: 0, sourceUrl: USCIS, category: 'history', difficulty: 1 },
	{ id: 'q70-first-president', prompt: 'Who was the first President?', choices: ['George Washington', 'Thomas Jefferson', 'John Adams', 'Abraham Lincoln'], answerIndex: 0, sourceUrl: USCIS, category: 'history', difficulty: 1 },
	{ id: 'q71-louisiana-purchase', prompt: 'What territory did the United States buy from France in 1803?', choices: ['the Louisiana Territory', 'the Oregon Territory', 'Alaska', 'Florida'], answerIndex: 0, sourceUrl: USCIS, category: 'history', difficulty: 2 },
	{ id: 'q72-war-1800s', prompt: 'Name one war fought by the United States in the 1800s.', choices: ['War of 1812', 'World War I', 'Korean War', 'Revolutionary War'], answerIndex: 0, sourceUrl: USCIS, category: 'history', difficulty: 2 },
	{ id: 'q73-civil-war', prompt: 'Name the U.S. war between the North and the South.', choices: ['the Civil War', 'the Revolutionary War', 'the War of 1812', 'World War I'], answerIndex: 0, sourceUrl: USCIS, category: 'history', difficulty: 1 },
	{ id: 'q74-civil-war-cause', prompt: 'Name one problem that led to the Civil War.', choices: ['slavery', 'high tariffs on tea', 'the Louisiana Purchase', 'the gold rush'], answerIndex: 0, sourceUrl: USCIS, category: 'history', difficulty: 2 },
	{ id: 'q75-lincoln-did', prompt: 'What was one important thing that Abraham Lincoln did?', choices: ['freed the slaves', 'wrote the Declaration of Independence', 'was the first President', 'purchased Alaska'], answerIndex: 0, sourceUrl: USCIS, category: 'history', difficulty: 2 },
	{ id: 'q76-emancipation', prompt: 'What did the Emancipation Proclamation do?', choices: ['freed the slaves', 'ended the Civil War', 'freed prisoners of war', 'abolished slavery everywhere'], answerIndex: 0, sourceUrl: USCIS, category: 'history', difficulty: 2 },
	{ id: 'q77-susan-anthony', prompt: 'What did Susan B. Anthony do?', choices: ["fought for women's rights", 'served as the first woman in Congress', 'founded the American Red Cross', 'wrote the Declaration of Independence'], answerIndex: 0, sourceUrl: USCIS, category: 'history', difficulty: 2 },
	{ id: 'q78-war-1900s', prompt: 'Name one war fought by the United States in the 1900s.', choices: ['World War I', 'the Civil War', 'the Revolutionary War', 'the War of 1812'], answerIndex: 0, sourceUrl: USCIS, category: 'history', difficulty: 1 },
	{ id: 'q79-wwi-president', prompt: 'Who was President during World War I?', choices: ['Woodrow Wilson', 'Franklin Roosevelt', 'Harry Truman', 'Theodore Roosevelt'], answerIndex: 0, sourceUrl: USCIS, category: 'history', difficulty: 2 },
	{ id: 'q80-wwii-president', prompt: 'Who was President during the Great Depression and World War II?', choices: ['Franklin Roosevelt', 'Woodrow Wilson', 'Harry Truman', 'Herbert Hoover'], answerIndex: 0, sourceUrl: USCIS, category: 'history', difficulty: 2 },
	{ id: 'q81-wwii-foes', prompt: 'Who did the United States fight in World War II?', choices: ['Japan, Germany, and Italy', 'China, Russia, and France', 'England, France, and Spain', 'Mexico, Canada, and Brazil'], answerIndex: 0, sourceUrl: USCIS, category: 'history', difficulty: 2 },
	{ id: 'q82-eisenhower', prompt: 'Before he was President, Eisenhower was a general. What war was he in?', choices: ['World War II', 'the Korean War', 'World War I', 'the Vietnam War'], answerIndex: 0, sourceUrl: USCIS, category: 'history', difficulty: 2 },
	{ id: 'q83-cold-war', prompt: 'During the Cold War, what was the main concern of the United States?', choices: ['Communism', 'terrorism', 'inflation', 'immigration'], answerIndex: 0, sourceUrl: USCIS, category: 'history', difficulty: 2 },
	{ id: 'q84-civil-rights', prompt: 'What movement tried to end racial discrimination?', choices: ['civil rights movement', 'the abolition movement', 'the suffrage movement', 'the labor movement'], answerIndex: 0, sourceUrl: USCIS, category: 'history', difficulty: 1 },
	{ id: 'q85-mlk', prompt: 'What did Martin Luther King, Jr. do?', choices: ['fought for civil rights', "fought for women's rights", "fought for workers' rights", 'fought for independence from Britain'], answerIndex: 0, sourceUrl: USCIS, category: 'history', difficulty: 3 },
	{ id: 'q86-september-11', prompt: 'What major event happened on September 11, 2001, in the United States?', choices: ['Terrorists attacked the United States', 'the stock market crashed', 'a hurricane hit New Orleans', 'the United States entered World War II'], answerIndex: 0, sourceUrl: USCIS, category: 'history', difficulty: 1 },
	{ id: 'q87-tribe', prompt: 'Name one American Indian tribe in the United States.', choices: ['Cherokee', 'the Aztec', 'the Mayan', 'the Inca'], answerIndex: 0, sourceUrl: USCIS, category: 'history', difficulty: 3 },
	{ id: 'q88-longest-rivers', prompt: 'Name one of the two longest rivers in the United States.', choices: ['Missouri River', 'the Colorado River', 'the Hudson River', 'the Rio Grande'], answerIndex: 0, sourceUrl: USCIS, category: 'symbols-geography', difficulty: 2 },
	{ id: 'q89-west-coast-ocean', prompt: 'What ocean is on the West Coast of the United States?', choices: ['Pacific Ocean', 'the Atlantic Ocean', 'the Indian Ocean', 'the Arctic Ocean'], answerIndex: 0, sourceUrl: USCIS, category: 'symbols-geography', difficulty: 1 },
	{ id: 'q90-east-coast-ocean', prompt: 'What ocean is on the East Coast of the United States?', choices: ['Atlantic Ocean', 'the Pacific Ocean', 'the Indian Ocean', 'the Arctic Ocean'], answerIndex: 0, sourceUrl: USCIS, category: 'symbols-geography', difficulty: 1 },
	{ id: 'q91-territory', prompt: 'Name one U.S. territory.', choices: ['Puerto Rico', 'Hawaii', 'Alaska', 'Cuba'], answerIndex: 0, sourceUrl: USCIS, category: 'symbols-geography', difficulty: 2 },
	{ id: 'q92-borders-canada', prompt: 'Name one state that borders Canada.', choices: ['Maine', 'Florida', 'Texas', 'California'], answerIndex: 0, sourceUrl: USCIS, category: 'symbols-geography', difficulty: 2 },
	{ id: 'q93-borders-mexico', prompt: 'Name one state that borders Mexico.', choices: ['California', 'Oregon', 'Nevada', 'Colorado'], answerIndex: 0, sourceUrl: USCIS, category: 'symbols-geography', difficulty: 2 },
	{ id: 'q94-capital', prompt: 'What is the capital of the United States?', choices: ['Washington, D.C.', 'New York City', 'Philadelphia', 'Boston'], answerIndex: 0, sourceUrl: USCIS, category: 'symbols-geography', difficulty: 1 },
	{ id: 'q95-statue-of-liberty', prompt: 'Where is the Statue of Liberty?', choices: ['New York Harbor', 'Boston Harbor', 'San Francisco Bay', 'the Potomac River'], answerIndex: 0, sourceUrl: USCIS, category: 'symbols-geography', difficulty: 1 },
	{ id: 'q96-flag-stripes', prompt: 'Why does the flag have 13 stripes?', choices: ['because there were 13 original colonies', 'because there were 13 presidents', 'because there were 13 amendments', 'because there were 13 wars'], answerIndex: 0, sourceUrl: USCIS, category: 'symbols-geography', difficulty: 2 },
	{ id: 'q97-flag-stars', prompt: 'Why does the flag have 50 stars?', choices: ['because there is one star for each state', 'because there are 50 presidents', 'because there are 50 amendments', 'because there were 50 original colonies'], answerIndex: 0, sourceUrl: USCIS, category: 'symbols-geography', difficulty: 2 },
	{ id: 'q98-national-anthem', prompt: 'What is the name of the national anthem?', choices: ['The Star-Spangled Banner', 'America the Beautiful', 'God Bless America', 'The Battle Hymn of the Republic'], answerIndex: 0, sourceUrl: USCIS, category: 'symbols-geography', difficulty: 1 },
	{ id: 'q99-independence-day', prompt: 'When do we celebrate Independence Day?', choices: ['July 4', 'June 14', 'September 11', 'December 25'], answerIndex: 0, sourceUrl: USCIS, category: 'symbols-geography', difficulty: 1 },
	{ id: 'q100-national-holidays', prompt: 'Name two national U.S. holidays.', choices: ["New Year's Day and Martin Luther King, Jr. Day", 'Easter and Halloween', "Valentine's Day and St. Patrick's Day", "Groundhog Day and April Fools' Day"], answerIndex: 0, sourceUrl: USCIS, category: 'symbols-geography', difficulty: 3 },
	{ id: 'x01-article-i', prompt: 'which branch of government does article i of the constitution establish?', choices: ['the legislative branch', 'the executive branch', 'the judicial branch', 'the federal reserve'], answerIndex: 0, sourceUrl: CONST, category: 'civics-structure', difficulty: 3 },
	{ id: 'x02-article-ii', prompt: 'which branch of government does article ii of the constitution establish?', choices: ['the executive branch', 'the legislative branch', 'the judicial branch', 'the cabinet'], answerIndex: 0, sourceUrl: CONST, category: 'civics-structure', difficulty: 3 },
	{ id: 'x03-article-iii', prompt: 'which branch of government does article iii of the constitution establish?', choices: ['the judicial branch', 'the executive branch', 'the legislative branch', 'the military'], answerIndex: 0, sourceUrl: CONST, category: 'civics-structure', difficulty: 3 },
	{ id: 'x04-tenth-amendment', prompt: 'what does the tenth amendment reserve to the states and the people?', choices: ['powers not delegated to the federal government', 'the power to coin money', 'the power to declare war', 'the power to regulate interstate commerce'], answerIndex: 0, sourceUrl: CONST, category: 'civics-rights', difficulty: 3 },
	{ id: 'x05-electoral-votes', prompt: 'how many electoral votes are there in total in the electoral college?', choices: ['538', '435', '100', '270'], answerIndex: 0, sourceUrl: CONST, category: 'civics-structure', difficulty: 3 },
	{ id: 'x06-electoral-tie', prompt: 'what happens if no candidate wins a majority of electoral votes for president?', choices: ['the house of representatives chooses the president', 'the senate chooses the president', 'a runoff election is held', 'the supreme court chooses the president'], answerIndex: 0, sourceUrl: CONST, category: 'civics-structure', difficulty: 3 },
	{ id: 'x07-twenty-fifth-amendment', prompt: 'what does the twenty-fifth amendment address?', choices: ['presidential succession and incapacity', 'the abolition of poll taxes', 'the direct election of senators', 'presidential term limits'], answerIndex: 0, sourceUrl: CONST, category: 'civics-structure', difficulty: 3 },
	{ id: 'x08-twenty-second-amendment', prompt: 'what does the twenty-second amendment limit?', choices: ['the president to two terms in office', 'the number of supreme court justices', 'the size of the house of representatives', 'the length of a senate term'], answerIndex: 0, sourceUrl: CONST, category: 'civics-structure', difficulty: 3 },
	{ id: 'x09-twenty-fourth-amendment', prompt: 'what did the twenty-fourth amendment abolish?', choices: ['poll taxes in federal elections', 'slavery', 'the military draft', 'property requirements for voting'], answerIndex: 0, sourceUrl: CONST, category: 'civics-rights', difficulty: 3 },
	{ id: 'x10-twenty-seventh-amendment', prompt: 'what does the twenty-seventh amendment address?', choices: ['congressional pay raises', 'the electoral college', 'presidential succession', 'the right to bear arms'], answerIndex: 0, sourceUrl: CONST, category: 'civics-structure', difficulty: 3 },
	{ id: 'x11-filibuster', prompt: 'what is a filibuster in the senate?', choices: ['an extended debate used to delay a vote', 'a vote to end debate', 'a committee hearing', 'a presidential veto'], answerIndex: 0, sourceUrl: CONST, category: 'civics-structure', difficulty: 3 },
	{ id: 'x12-commerce-clause', prompt: 'what does the commerce clause give congress the power to regulate?', choices: ['interstate commerce', 'state elections', 'local zoning', 'public schools'], answerIndex: 0, sourceUrl: CONST, category: 'civics-structure', difficulty: 3 },
	{ id: 'x13-habeas-corpus', prompt: 'when may habeas corpus be suspended?', choices: ['in cases of rebellion or invasion when public safety requires it', 'during any economic crisis', 'whenever congress chooses', 'during a presidential election'], answerIndex: 0, sourceUrl: CONST, category: 'civics-rights', difficulty: 3 },
	{ id: 'x14-three-fifths', prompt: 'what did the three-fifths compromise count for purposes of representation and taxation?', choices: ['three-fifths of the enslaved population', 'three-fifths of all citizens', 'three-fifths of the states', 'three-fifths of the electoral vote'], answerIndex: 0, sourceUrl: CONST, category: 'history', difficulty: 3 },
	{ id: 'x15-judicial-review', prompt: 'which supreme court case established the power of judicial review?', choices: ['Marbury v. Madison', 'McCulloch v. Maryland', 'Brown v. Board of Education', 'Plessy v. Ferguson'], answerIndex: 0, sourceUrl: SCOTUS_BIO, category: 'civics-structure', difficulty: 3 },
	{ id: 'q39-scotus-count', prompt: 'How many justices are on the Supreme Court?', choices: ['9', '7', '11', '13'], answerIndex: 0, sourceUrl: SCOTUS_BIO, category: 'current', difficulty: 2 },
	{ id: 'q40-chief-justice', prompt: 'Who is the Chief Justice of the United States now?', choices: ['John Roberts', 'Clarence Thomas', 'Samuel Alito', 'Sonia Sotomayor'], answerIndex: 0, sourceUrl: SCOTUS_BIO, category: 'current', difficulty: 2 }
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
	{ lines: ['the idiot kept his gate shut.', 'porch light off, flag bracket empty, curtains drawn.', 'didn\'t vote. didn\'t serve. didn\'t bother to find out.', 'tended his own yard, and nothing else.'], emphatic: 0 },
	{ lines: ['here\'s the part almost everyone gets wrong.', 'they did not think the idiot was stupid.', 'he knew exactly what was on the agenda — could have walked you through it, in detail.', 'he just didn\'t care to be there.'], emphatic: 0 },
	{ lines: ['and the country did not find it quaint.', 'a republic runs on the people who show up — who vote, who serve, who pay attention when it is tedious.', 'the idiot took the protection and gave nothing back.', 'that was never a personality type. that was a citizen in name only.'], emphatic: 2 },
	{ lines: ['so the word drifted. it always does.', 'showing up got cheaper to skip — fewer meetings, fewer consequences, nobody checking.', 'from the man who wouldn\'t participate, to the man who didn\'t know, to the man who was fine not knowing.', 'a downgrade in three easy steps.'], emphatic: 2 },
	{ lines: ['which brings us to the current model.', 'the old idiot didn\'t know, and that was forgivable — nobody is born knowing this.', 'the new one doesn\'t know, is certain he does, and gets louder the less he can prove.', 'confidence in your own ignorance used to be embarrassing. now it is the whole personality.'], emphatic: 3 },
	{ lines: ['you\'re about to find out which one you are.'], cta: true }
];

export const SKIP_LINE = 'skip →';
export const SKIP_COPY = 'you skipped the one part that would have helped. you will feel it shortly';
export const REENTRY_LINK = "what's an idiot, actually? ↗";

// Comments the home hero's thought bubble cycles through (the v2 figure art).
// Short and dumb on purpose — the bubble is small, so keep each entry brief.
// Lowercase to match the app voice. Change this array to change the rotation.
export const HERO_THOUGHTS: string[] = [
	"they're eating the dogs..",
	"they're eating the cats..",
	'covfefe.. what does it mean...',
	"i'm a very stable genius",
	'smart people hate me',
	'stupid people love me'
];

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

// §2.1 — wrong-answer shame lines. The bit is a shaming machine, so these are
// meant to sting: confidence is the target, not the person's luck.
export const WRONG_LINES: string[] = [
	'wrong. and you said it like it was obvious',
	'you answered in a blink. that is the whole tell',
	'confidence. no content. classic',
	'wrong, fast, and certain — the full trifecta',
	'you didn\'t think. you performed',
	'a guess wearing a suit. again',
	'the founders would have enjoyed watching that',
	'you have never been more sure of anything less true',
	'wrong. you\'ll still argue about it tonight',
	'not close, and you never doubted it for a second',
	'that is the answer of someone who has never read past a headline',
	'you swung hard at something you could not see',
	'wrong. the certainty is what makes it sad',
	'picked without a flicker of doubt. remarkable',
	'you were loud about it, at least'
];

// §2.2 — timeout lines (5).
export const TIMEOUT_LINES: string[] = [
	'you froze. the clock did not',
	'nothing. an honest answer, for once',
	'too slow to even guess',
	'the clock ran out while you decided whether to think',
	'silence. it counted'
];

export const NO_ANSWER_LABEL = 'no answer';

// §2.3 — correct-answer lines. Count-agnostic (runs are 5–12 questions now), so
// the quiz pulls distinct ones as it goes. Even praise here has teeth.
export const CORRECT_LINES: string[] = [
	'correct. the bar was on the floor',
	'right. do not get used to it',
	'yes. now do it when it is hard',
	'correct again. suspicious',
	'right. you will want to tell someone about that',
	'fine. correct',
	'that one you knew. good for you',
	'right. the easy part is over',
	'correct. keep going, it gets worse',
	'right, and you were sure this time. noted'
];

// §2.4 — tier labels and descriptions. Mean on purpose.
export const TIER_DETAILS: Record<Tier, { label: string; description: string }> = {
	CITIZEN: { label: 'CITIZEN', description: 'you actually know it. which puts you in a minority small enough to be embarrassing for everyone else. go be insufferable about it — you earned it.' },
	RESIDENT: { label: 'RESIDENT', description: 'close, which is the most dangerous place to be. you knew just enough to feel sure, and you were sure, and you were wrong. fix the gap or keep being this.' },
	'IDIŌTĒS': { label: 'IDIŌTĒS', description: 'the original word, and you have been living it — not stupid, just not here. you know some of it and coasted on the rest for years. this is the bill for that.' },
	IDIOT: { label: 'IDIOT', description: 'you were not unlucky. you were unbothered. every one of these was free to learn and you spent that time on something dumber. this is not a verdict on your soul — it is a verdict on your attention, and it is accurate.' }
};

// §2.5 — the closer. Same every run. Still the honest part — but no more soft landings.
export const PEP_TALK: string[] = [
	'here is what you were promised: a country that answers to you. not a king, not a party, not a guy on a podcast telling you it is all rigged exactly the way you want to hear. the system does not protect you out of kindness. it protects you because enough people learned how it works and refused to stop paying attention. that is the entire mechanism, and it does not clean itself.',
	'nobody handed you a single one of these facts. that is not the tragedy. the price of knowing them is an afternoon, and you still did not pay it. attention is the whole job — knowing which branch does what, knowing what the first amendment actually protects so you catch it when someone lies to you about it, showing up to the small elections and not just the loud ones.',
	'you did not have to score perfectly. but this number came from a choice you made and kept making. it is fixable, and it was always fixable, and it costs less than almost anything else you did this week. the only reason it has not happened is you. read one more thing. ask one more question. stop being the person this page just described.'
];

// §2.7 — landing teaser line. The figure renders separately (big, gold), so this
// sentence must not repeat it.
export const LANDING_TEASER = 'of americans can\'t name all three branches of government. the other numbers are worse. find out which one you are.';

