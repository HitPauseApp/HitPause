// Global functions used on more than one page, revealed by the 'h' variable.
// Import using: import h from '<path>/globals';

let tallyOutputFlags = (flags) => {
  let outputFlags = {};
  let modifiers = [];
  // For each object in the array of flags
  for (const key in flags) {
    // For each property in the flag object
    for (const flagKey in flags[key]) {
      // If we are affecting the highest flags
      if (flagKey.includes('_highest_')) {
        let count = parseInt(flagKey.replace('_highest_', ''));
        modifiers.push({ type: 'high', count: count, amount: parseFloat(flags[key][flagKey]) });
      }
      // If we are affecting the lowest flags
      else if (flagKey.includes('_lowest_')) {
        let count = parseInt(flagKey.replace('_lowest_', ''));
        modifiers.push({ type: 'low', count: count, amount: parseFloat(flags[key][flagKey]) });
      }
      // If flags of this type already exist, sum them
      else if (Object.keys(flags).includes(flagKey)) {
        outputFlags[flagKey] = parseFloat(flags[flagKey]) + parseFloat(flags[key][flagKey]);
      }
      // Otherwise, add normally
      else outputFlags[flagKey] = parseFloat(flags[key][flagKey]);
    }
  }

  // For all of our special cases
  for (const key in modifiers) {
    let modifiedFlags = {};
    // Depending on type of case, grab relevant flags
    if (modifiers[key].type == 'high') {
      modifiedFlags = getHighsAndLows(outputFlags, modifiers[key].count, 0)[0];
    } else if (modifiers[key].type == 'low') {
      modifiedFlags = getHighsAndLows(outputFlags, 0, modifiers[key].count)[1];
    }
    // Apply changes to those flags
    for (const flagKey in modifiedFlags) modifiedFlags[flagKey] = modifiedFlags[flagKey] + modifiers[key].amount;
    outputFlags = { ...outputFlags, ...modifiedFlags };
  }
  return outputFlags;
}

// TODO: Incomplete... will probably want to move this into summary screen
// TODO: Ties are unfair, as lower keys will always be chosen... need a way to randomly select when there are ties
let getHighsAndLows = (flags, numHighs, numLows) => {
  let highValues = [], lowValues = [];
  let sortedFlags = Object.entries(flags).sort((a, b) => (a[1] < b[1]));
  if (numHighs > 0) highValues = sortedFlags.slice(0, numHighs);
  if (numLows > 0) lowValues = sortedFlags.slice(sortedFlags - 1 - numLows, sortedFlags.length - 1);
  return [Object.fromEntries(highValues), Object.fromEntries(lowValues)];
}

let randomizeSuggestions = (flags) => {
  let n = 0;
  for (const key in flags) {
    let integerFlag = parseInt(flags[key] * 10);
    flags[key] = integerFlag + n;
    n = integerFlag + n;
  }
  let randomInt = Math.floor(Math.random() * n);
  for (const key in flags) {
    if (flags[key] > randomInt) {
      delete flags[key];
      // TODO: Verify this actually works correctly
      let remainingKeys = Object.keys(flags).length > 0 ? randomizeSuggestions(flags) : [];
      return [key, ...remainingKeys];
    };
  }
  return null;
}

let titleCase = (str, del) => {
  return str.split(del || ' ').map(i => i[0].toUpperCase() + i.slice(1)).join(' ');
}

let getDate = (timestamp) => {
  let date = new Date(timestamp);
  return `${date.getMonth() + 1}/${date.getDate()}/${String(date.getFullYear()).substr(2)}`;
}

let getTime = (timestamp) => {
  let date = new Date(timestamp);
  let timeString = `${date.getHours() == 0 ? '12' : (date.getHours() % 12)}:${String(date.getMinutes()).padStart(2, '0')}`;
  let amPmString = date.getHours() < 12 ? 'AM' : 'PM';
  return `${timeString} ${amPmString}`;
}

let colors = {
  primary: '#00095e',
  secondary: '#deedfa',
  accent: '#15B097'
}

var h = {
  tallyOutputFlags,
  getHighsAndLows,
  randomizeSuggestions,
  titleCase,
  getDate,
  getTime,
  colors
}

export default h;