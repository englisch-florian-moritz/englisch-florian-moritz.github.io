export default function getPrompt(input: string) {
  return `
    Theme:  
Immigration plays a huge role. America is traditionally shown as a place of freedom, fairness, opportunity, self-made success, and the American Dream: if people work hard, everyone can "make it" and become somebody. But immigration also shows America as a system of pressure: visas, papers, deadlines, legal fees, deportation risk, work rules, school forms, fear of officials, and unequal access make the dream difficult and uncertain. Discuss how American immigration is shown as both a dream and a system of pressure. How does this shift the traditional representation of America?

Time period / setting:  
~2007-2008

Base questions and situations to learn the style from. These examples are designed to support the operator "discuss": they show both sides, compare the traditional image of America with immigration reality, and give arguments for analysis. Keep the generated story concrete and immigration-system-focused, with attention to forms, evidence, law, documents, deportation, work authorization, school access, agency decisions, and the gap between promise and reality. Do not write mainly about feelings:  
[  
{  
"situation": "You arrive in New Jersey in 2007 with your family. The entry stamp allows you to stay only for a limited time, and the lawyer asks for rent records, school enrollment, medical papers, and proof of income. America is presented as open to people who work hard, but the first step is proving eligibility through documents that many new arrivals do not fully control.",  
"question": "Which action best addresses the first immigration-system barrier?",  
"answers": [  
"Organize every document",  
"Trust verbal promises",  
"Wait for clearer rules"  
]  
},  
{  
"situation": "In English class, the textbook says hard work leads to success in America. The same week, an employer refuses to schedule an interview without a Social Security number and work authorization. The immigration system turns the promise of equal opportunity into a gatekeeping process: before work can prove ability, legal status decides who may even compete.",  
"question": "What system-based argument should be raised in class?",  
"answers": [  
"Status controls access",  
"Work proves worth",  
"Employers decide fairness"  
]  
},  
{  
"situation": "A letter from immigration services gives 30 days to submit missing evidence. It asks for translated birth certificates, tax information, and proof of continuous residence. America is represented as a country of clear rights, but the letter shows that access to those rights depends on reading legal language, paying fees, and producing exact evidence on time.",  
"question": "How should the missing-evidence deadline be handled?",  
"answers": [  
"Send partial evidence",  
"Get legal help",  
"Miss the deadline"  
]  
},  
{  
"situation": "A classmate says immigrants only come to take jobs. At the same time, local restaurants and cleaning companies depend on immigrant labor but ask workers to avoid questions about documents. America is often described as a nation built by immigrants, yet the immigration system can make the same workers useful in the economy and vulnerable under the law.",  
"question": "Which response best connects labor to immigration policy?",  
"answers": [  
"Explain labor dependency",  
"Ignore the policy issue",  
"Blame individual workers"  
]  
},  
{  
"situation": "The school newspaper asks for an article about immigration policy after the 2008 election. Free speech is a central American value, but publishing names, workplaces, or addresses could expose families with uncertain status. The immigration system changes public speech into a legal-risk calculation instead of a simple civic right.",  
"question": "What is the strongest practical publishing choice?",  
"answers": [  
"Use anonymous examples",  
"Publish full names",  
"Avoid the topic"  
]  
},  
{  
"situation": "On the train after school, officers ask one passenger for identification and immigration papers. America is often imagined as a place of free movement, but enforcement can appear far from the national border. For immigrants, the border becomes a procedure inside daily life: ID checks, workplace audits, school forms, and agency appointments.",  
"question": "What is the most useful next step after the ID check?",  
"answers": [  
"Learn legal rights",  
"Avoid all transit",  
"Destroy documents"  
]  
},  
{  
"situation": "At a free legal clinic, families are sorted into different legal categories. One person can apply for adjustment of status, another must wait years, and another has no safe path unless a law changes. America is portrayed as equal before the law, but immigration law gives different options based on entry date, sponsor, income, and category.",  
"question": "Which issue should be checked first at the clinic?",  
"answers": [  
"Exact legal category",  
"General life goals",  
"Political opinions"  
]  
},  
{  
"situation": "You prepare for a class discussion on the American Dream and immigration. The evidence now includes work authorization, filing deadlines, legal categories, agency interviews, fees, and deportation risk. The traditional image says America rewards effort equally; the immigration system shows that effort is filtered through status and paperwork before success is even possible.",  
"question": "Which thesis best fits the system evidence?",  
"answers": [  
"The dream is conditional",  
"The system is irrelevant",  
"Papers guarantee success"  
]  
},  
{  
"situation": "A college program advertises itself as an equal opportunity. The application then asks for identity numbers, proof of income, residency information, and documents tied to family status. Even students who meet academic requirements can be blocked by administrative rules. Getting papers or entering school is not enough if every next step requires another form of proof.",  
"question": "How should the application barrier be handled?",  
"answers": [  
"Ask about alternatives",  
"Submit false numbers",  
"Quit the program"  
]  
},  
{  
"situation": "At the final school discussion, the class returns to the main question. The immigration examples show that America can offer education, work, and legal paths, but each promise is controlled by forms, status checks, fees, deadlines, and enforcement power. The traditional image of America as open and fair is not removed; it is narrowed by the immigration system.",  
"question": "What final conclusion best answers the discussion task?",  
"answers": [  
"The dream is conditional",  
"The dream is automatic",  
"The system proves equality"  
]  
}  
]

Previous generated questions and situations as JSON:  
${input}

Generate the next single situation, question, and three answer options.

Keep the situation concise: aim for 50 to 80 words, and never go above 100 words.

Use the theme, time period, and base questions as guidance. Continue the story from the previous JSON. Avoid repeating the same kind of situation or decision.

The full journey has a maximum of 10 generated questions. Count the previous JSON items to know which question comes next. If the next question is 8 or 9, move the story toward consequences and resolution. If the next question is 10, write a closing immigration-focused situation that ends the journey clearly instead of creating a cliffhanger.

Make the situation and question strongly connected to immigration, deportation risk, legal status, documents, official letters, court or agency decisions, work/school consequences, or community/legal support. Keep it generalized and system-focused: the player is involved in a hard decision, but the main point should be how the immigration system changes the meaning of American opportunity.

The generated situation should help the student later discuss the difference between the traditional representation of America and immigration reality. Include concrete contrasts such as: America promises equal opportunity, but access depends on papers; America praises hard work, but hard work does not remove deportation risk; America values freedom, but public speech can expose status; America offers education, but forms and status still limit access; getting papers helps, but does not automatically bring success, safety, or belonging.

Avoid writing the situation as emotional reflection. Do not use phrases like "this feels like," "you feel," "it feels," "you are hopeful," or "the dream feels." Instead, describe the rule, institution, document, deadline, or enforcement consequence and ask for a concrete decision.

Return only raw valid JSON that can be passed directly into JSON.parse.
`;
}
