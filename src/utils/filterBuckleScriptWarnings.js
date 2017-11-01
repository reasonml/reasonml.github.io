const warningStartRegex = /^File /;
const warningEndRegex = /^$/;
const warningToExcludeRegex = /Warning 40/;

let accumulatedWarnings = [];
export default function filterBuckleScriptWarnings(warningLine) {
  if (warningStartRegex.test(warningLine)) {
    accumulatedWarnings = [];
  }
  accumulatedWarnings.push(warningLine);
  if (warningEndRegex.test(warningLine)) {
    if (accumulatedWarnings.some(line => warningToExcludeRegex.test(line))) {
      return [];
    } else {
      return accumulatedWarnings;
    }
  } else {
    return [];
  }
}
