export default function getPrompt(input: string) {
  return `
Answered story questions as JSON:
${input}

Generate the final result for the player.

The Jonga overlap percentage should say how strongly the player's story path overlaps with the Jonga family's themes from Behold the Dreamers.

The success confidence percentage should say how likely the player's story path seems to succeed inside this simulation, based on their decisions.

Return only the two percentages and their two short explanations. Do not add a separate summary or bottom conclusion.

Return only raw valid JSON that can be passed directly into JSON.parse. Do not wrap it in markdown or code fences. Never write \`\`\`json or \`\`\`.
`;
}
