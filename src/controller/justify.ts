function justifyText(plainText: string): string {
  const lines: string[] = plainText.split('\n');
  const newLines: string[] = [];
  lines.forEach((line) => {
    newLines.push(justifyLine(line))
  })
  return newLines.join('\n');
}

function justifyLine(plainText: string): string {
  const MAX_CHAR_LINE = 80;
  const words = plainText.split(' ');
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

  // Add space for each line if line length < MAX_CHAR_LINE
  const justifiedLines: string[] = [];
  lines.forEach((line : string, key) => {
    if (key == lines.length-1) {
      justifiedLines.push(line)
    }
    else if (line.length < MAX_CHAR_LINE) {
      let space_to_add = MAX_CHAR_LINE - line.length
      let words = line.split(" ")
      let word_to_add = 0
      while (space_to_add > 0) {
        words[word_to_add] = words[word_to_add] + " "
        space_to_add -= 1
        word_to_add += 1
        if (word_to_add > words.length - 1) {
          word_to_add = 0
        }
      }
      justifiedLines.push(words.join(" "))
    } else {
      justifiedLines.push(line);
    }
  });
  return justifiedLines.join('\n');
}

module.exports = justifyText;
