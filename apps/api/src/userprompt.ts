export default function getPrompt(input: string) {
  return `
    Theme:  
Immigration plays a huge role. America is a place of hope and promise, a place where you can "become somebody," but immigration policy, deportation risk, paperwork, court dates, work rules, school forms, and legal status make the road uncertain. Discuss how American immigration is shown as both a dream and a system of pressure. How does this shift the traditional representation of America?

Time period / setting:  
~2007-2008

Base questions and situations to learn the style from. Keep the generated story slightly more general and immigration-focused than these examples, with less private emotion and more attention to systems, law, documents, deportation, work, school, and public pressure:  
[  
{  
"situation": "You are 17 and arrive in New Jersey in 2007 with your mother and little brother. Your uncle says America is where people can become somebody if they work hard. At night, your mother hides a folder with visas, letters, bills, and old promises from a lawyer. The apartment is small, but the city lights make your brother smile. You feel hope, but you also feel that the dream already has locked doors.",  
"question": "How do you choose to understand your first days in America?",  
"answers": [  
"As a fresh start",  
"As a test",  
"As both"  
]  
},  
{  
"situation": "You are in English class, reading about the American Dream. The teacher asks why America is often shown as a place of freedom. You think of your mother cleaning offices at night and your uncle saying not to talk to police. The book says anyone can rise, but your family keeps checking dates on papers. You notice the story of America sounds bright, while real life feels unclear.",  
"question": "What idea do you bring into the class discussion?",  
"answers": [  
"America gives chances",  
"America sets barriers",  
"America does both"  
]  
},  
{  
"situation": "You are helping your mother translate a letter from immigration services. It uses polite words, but the meaning is hard to follow. There is a deadline, a fee, and a warning about missing documents. Your mother asks if the letter is good news. You want to say yes, but you are not sure. The promise of citizenship feels less like a path and more like a machine.",  
"question": "How do you handle the letter?",  
"answers": [  
"Explain only the basics",  
"Read every detail",  
"Ask for outside help"  
]  
},  
{  
"situation": "You are at school when a classmate says immigrants come only to take jobs. You know your uncle works in a kitchen, pays rent, and sends money to his daughter abroad. You also know he uses a different name at work because he is afraid. The classmate is not shouting, but the words make your family sound like a problem, not like people.",  
"question": "How do you respond to the classmate?",  
"answers": [  
"Tell your family story",  
"Ask what he means",  
"Say nothing in public"  
]  
},  
{  
"situation": "You are invited to join the school newspaper. The first topic is the 2008 election and what America should become. You want to write about immigrant families, but your mother worries that names and stories can travel. A teacher says your voice matters. At home, silence has also kept people safe. You see that America invites speech, but fear can make speech expensive.",  
"question": "What article do you choose to write?",  
"answers": [  
"A personal story",  
"A general opinion",  
"No article yet"  
]  
},  
{  
"situation": "You are on the train with your uncle after his shift. Two officers walk through the carriage and ask one man questions. Nothing happens to you, but your uncle stops talking and looks at the floor. You used to think borders were only lines on maps. Now you notice a border can appear in a train, a workplace, or a school form.",  
"question": "What do you do after the train ride?",  
"answers": [  
"Talk with your uncle",  
"Research your rights",  
"Try to forget it"  
]  
},  
{  
"situation": "You are at a free legal clinic in a church basement. Families sit with folders like yours. A volunteer explains that some people have a path to citizenship, some must wait for years, and some have almost no clear path at all. Your brother whispers that America is supposed to be fair. You do not know how to answer, because the rules sound official but not simple.",  
"question": "What question do you ask the volunteer?",  
"answers": [  
"What can we do now?",  
"Why is it so hard?",  
"What should we avoid?"  
]  
},  
{  
"situation": "You are writing your final essay. The question asks how immigration changes the traditional image of America. You remember flags, school speeches, and the idea that effort brings success. You also remember fees, fear, waiting rooms, and adults who worked hard but stayed invisible. You want your essay to be fair, not only angry and not only hopeful.",  
"question": "What argument shapes your essay?",  
"answers": [  
"The dream remains strong",  
"The dream is broken",  
"The dream is uneven"  
]  
},  
{  
"situation": "You are accepted into a summer college program. The form asks for family income, identity numbers, and documents your mother may not have. The counselor says education is your way forward. Your mother says one wrong step can hurt the whole family. America is offering you a door, but the handle seems connected to many other locks.",  
"question": "How do you deal with the college program?",  
"answers": [  
"Apply with guidance",  
"Delay the program",  
"Look for another route"  
]  
},  
{  
"situation": "You are at graduation practice in 2008. Your brother waves a small flag, and your mother takes photos on an old phone. You feel proud, but you also know your family is still waiting for answers from a system that moves slowly and speaks coldly. America no longer looks like only a promised land. It looks like hope inside a hard machine, and you must decide how to live with that truth.",  
"question": "What future do you begin to build?",  
"answers": [  
"Rise quietly",  
"Speak publicly",  
"Balance both"  
]  
}  
]

Previous generated questions and situations as JSON:  
${input}

Generate the next single situation, question, and three answer options.

Use the theme, time period, and base questions as guidance. Continue the story from the previous JSON. Avoid repeating the same kind of situation or decision.

The full journey has a maximum of 10 generated questions. Count the previous JSON items to know which question comes next. If the next question is 8 or 9, move the story toward consequences and resolution. If the next question is 10, write a closing immigration-focused situation that ends the journey clearly instead of creating a cliffhanger.

Make the situation and question strongly connected to immigration, deportation risk, legal status, documents, official letters, court or agency decisions, work/school consequences, or community/legal support. Keep it a little generalized: the player is involved, but the situation should also show the wider immigrant experience and not only private personal feelings.

Return only raw valid JSON that can be passed directly into JSON.parse.
`;
}
