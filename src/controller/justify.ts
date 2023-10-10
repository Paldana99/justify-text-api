const MAX_CHAR_LINE = 80;

/**
 * Justifies the given plain line by adding spaces between words to make
 * a maximum length of 80 characters.
 * @param plainLine - The plain text to justify.
 * @returns The justified text.
 */
function justifyLine(plainLine: string): string {
  const words = plainLine.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  words.forEach((word) => {
    if (currentLine.length + word.length <= MAX_CHAR_LINE) {
      currentLine += `${word} `;
    } else {
      lines.push(currentLine.trim());
      currentLine = `${word} `;
    }
  });
  lines.push(currentLine.trim());

  const justifiedLines: string[] = [];
  lines.forEach((line : string, key) => {
    if (key == lines.length - 1) {
      justifiedLines.push(line);
    } else if (line.length < MAX_CHAR_LINE) {
      let space_to_add = MAX_CHAR_LINE - line.length;
      const words = line.split(' ');
      let word_to_add = 0;
      while (space_to_add > 0) {
        words[word_to_add] = `${words[word_to_add]} `;
        space_to_add -= 1;
        word_to_add += 1;
        if (word_to_add > words.length - 1) {
          word_to_add = 0;
        }
      }
      justifiedLines.push(words.join(' '));
    } else {
      justifiedLines.push(line);
    }
  });
  return justifiedLines.join('\n');
}

/**
 * Takes in a plain text and justifies each line the same length.
 * @param plainText - The input plain text to be justified
 * @returns The justified text with each line having the same length
 */
function justifyText(plainText: string): string {
  const lines: string[] = plainText.split('\n');
  const newLines: string[] = [];
  lines.forEach((line) => {
    newLines.push(justifyLine(line));
  });
  return newLines.join('\n');
}

module.exports = justifyText;
