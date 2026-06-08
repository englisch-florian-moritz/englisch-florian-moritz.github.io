export default function getPrompt(input: string) {
  return `
Answered story questions as JSON:
${input}

Generate the final result for the player.

The Jonga overlap percentage should say how strongly the player's story path overlaps with the Jonga family's themes from Behold the Dreamers.

The success confidence percentage should say how likely the player's story path seems to succeed inside this simulation, based on their decisions.

Return only raw valid JSON that can be passed directly into JSON.parse.
`;
}
