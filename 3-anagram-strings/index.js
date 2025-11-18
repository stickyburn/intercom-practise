/*
QUESTION: Given array of strings, return array where anagram strings are adjacent.

CLARIFICATION QUESTIONS TO ASK:
1. Should the order of anagram groups matter? (Alphabetical, by first occurrence, or any order?)
2. Should the order within each anagram group be preserved? (Original order or sorted?)
3. Should I handle case sensitivity? (Is "Listen" the same as "listen"?)
4. What about empty strings or strings with spaces/punctuation?
5. Should I return a new array or modify the original array?
6. What's the expected time complexity for this solution?

FOLLOW-UP QUESTIONS & BEST ANSWERS:
1. Q: Can you optimize the space complexity?
   A: We can sort the array in-place using a custom comparator, but this would be O(n²) time. 
      The hash map approach with O(n) time and O(n) space is usually preferred.

2. Q: How would you handle Unicode characters or different character encodings?
   A: The sorting approach works with Unicode, but we need to be consistent with locale-specific sorting rules.

3. Q: What if the input is very large and memory is constrained?
   A: We could use an external sorting approach or stream processing, but this would increase time complexity.

4. Q: Can you solve this without sorting each string?
   A: We could use character frequency counts as the key instead of sorted strings, which might be faster for short strings.

5. Q: What's the time and space complexity of your solution?
   A: Time: O(n * k log k) where n is number of strings and k is average string length. 
      Space: O(n * k) for the hash map and result.

6. Q: How would you modify this to group by anagram size (groups with same number of strings together)?
   A: After grouping, we could sort the groups by their length before flattening the result.
*/

// SOLUTION 1: Hash Map with Sorted String Keys (Most common approach)
function groupAnagrams(strings) {
    if (!Array.isArray(strings)) {
        throw new Error("Input must be an array");
    }
    
    const anagramGroups = new Map();
    
    for (const str of strings) {
        // Sort the string to create a canonical key
        const sortedKey = str.split('').sort().join('');
        
        if (!anagramGroups.has(sortedKey)) {
            anagramGroups.set(sortedKey, []);
        }
        
        anagramGroups.get(sortedKey).push(str);
    }
    
    // Convert map values to array and flatten
    return Array.from(anagramGroups.values()).flat();
}

// SOLUTION 2: Character Frequency as Key (Optimized for short strings)
function groupAnagramsByFrequency(strings) {
    if (!Array.isArray(strings)) {
        throw new Error("Input must be an array");
    }
    
    const anagramGroups = new Map();
    
    for (const str of strings) {
        // Create frequency count as key
        const freqKey = getFrequencyKey(str);
        
        if (!anagramGroups.has(freqKey)) {
            anagramGroups.set(freqKey, []);
        }
        
        anagramGroups.get(freqKey).push(str);
    }
    
    return Array.from(anagramGroups.values()).flat();
}

// Helper function to create frequency key
function getFrequencyKey(str) {
    const freq = new Array(26).fill(0); // Assuming lowercase English letters
    
    for (const char of str) {
        const charCode = char.charCodeAt(0);
        if (charCode >= 97 && charCode <= 122) { // a-z
            freq[charCode - 97]++;
        } else if (charCode >= 65 && charCode <= 90) { // A-Z
            freq[charCode - 65]++;
        }
        // For simplicity, ignoring other characters in this example
    }
    
    return freq.join('#');
}

// SOLUTION 3: In-place Grouping (Space optimized, time trade-off)
function groupAnagramsInPlace(strings) {
    if (!Array.isArray(strings)) {
        throw new Error("Input must be an array");
    }
    
    const used = new Array(strings.length).fill(false);
    const result = [];
    
    for (let i = 0; i < strings.length; i++) {
        if (used[i]) continue;
        
        const currentGroup = [strings[i]];
        used[i] = true;
        
        for (let j = i + 1; j < strings.length; j++) {
            if (!used[j] && areAnagrams(strings[i], strings[j])) {
                currentGroup.push(strings[j]);
                used[j] = true;
            }
        }
        
        result.push(...currentGroup);
    }
    
    return result;
}

// Helper function to check if two strings are anagrams
function areAnagrams(str1, str2) {
    if (str1.length !== str2.length) return false;
    
    const freq = new Map();
    
    for (const char of str1) {
        freq.set(char, (freq.get(char) || 0) + 1);
    }
    
    for (const char of str2) {
        if (!freq.has(char) || freq.get(char) === 0) return false;
        freq.set(char, freq.get(char) - 1);
    }
    
    return true;
}

// SOLUTION 4: Optimized with Custom Sorting (Preserve original order within groups)
function groupAnagramsPreserveOrder(strings) {
    if (!Array.isArray(strings)) {
        throw new Error("Input must be an array");
    }
    
    const anagramGroups = new Map();
    const orderMap = new Map(); // Track first occurrence order
    
    for (let i = 0; i < strings.length; i++) {
        const str = strings[i];
        const sortedKey = str.split('').sort().join('');
        
        if (!anagramGroups.has(sortedKey)) {
            anagramGroups.set(sortedKey, []);
            orderMap.set(sortedKey, i); // Record first occurrence
        }
        
        anagramGroups.get(sortedKey).push(str);
    }
    
    // Sort groups by first occurrence order
    const sortedGroups = Array.from(anagramGroups.entries())
        .sort((a, b) => orderMap.get(a[0]) - orderMap.get(b[0]))
        .map(entry => entry[1]);
    
    return sortedGroups.flat();
}

// Test cases
function runTests() {
    const testCases = [
        {
            input: ["eat", "tea", "tan", "ate", "nat", "bat"],
            description: "Example with multiple anagram groups"
        },
        {
            input: ["", "b", ""],
            description: "With empty strings"
        },
        {
            input: ["abc", "def", "ghi"],
            description: "No anagrams"
        },
        {
            input: ["listen", "silent", "enlist", "google"],
            description: "Mixed anagrams and non-anagrams"
        },
        {
            input: ["a", "b", "c", "a"],
            description: "Single character strings with duplicates"
        },
        {
            input: [],
            description: "Empty array"
        }
    ];
    
    console.log("=== Testing Solution 1: Hash Map with Sorted Keys ===");
    testCases.forEach((test, index) => {
        try {
            const result = groupAnagrams(test.input);
            console.log(`Test ${index + 1} (${test.description}): ✅ PASS`);
            console.log(`  Input: [${test.input.map(s => `"${s}"`).join(", ")}]`);
            console.log(`  Output: [${result.map(s => `"${s}"`).join(", ")}]`);
        } catch (error) {
            console.log(`Test ${index + 1} (${test.description}): ❌ ERROR - ${error.message}`);
        }
        console.log();
    });
    
    console.log("=== Testing Solution 2: Character Frequency Keys ===");
    testCases.forEach((test, index) => {
        try {
            const result = groupAnagramsByFrequency(test.input);
            console.log(`Test ${index + 1} (${test.description}): ✅ PASS`);
            console.log(`  Input: [${test.input.map(s => `"${s}"`).join(", ")}]`);
            console.log(`  Output: [${result.map(s => `"${s}"`).join(", ")}]`);
        } catch (error) {
            console.log(`Test ${index + 1} (${test.description}): ❌ ERROR - ${error.message}`);
        }
        console.log();
    });
    
    console.log("=== Testing Solution 3: In-place Grouping ===");
    testCases.forEach((test, index) => {
        try {
            const result = groupAnagramsInPlace(test.input);
            console.log(`Test ${index + 1} (${test.description}): ✅ PASS`);
            console.log(`  Input: [${test.input.map(s => `"${s}"`).join(", ")}]`);
            console.log(`  Output: [${result.map(s => `"${s}"`).join(", ")}]`);
        } catch (error) {
            console.log(`Test ${index + 1} (${test.description}): ❌ ERROR - ${error.message}`);
        }
        console.log();
    });
    
    console.log("=== Testing Solution 4: Preserve Order ===");
    testCases.forEach((test, index) => {
        try {
            const result = groupAnagramsPreserveOrder(test.input);
            console.log(`Test ${index + 1} (${test.description}): ✅ PASS`);
            console.log(`  Input: [${test.input.map(s => `"${s}"`).join(", ")}]`);
            console.log(`  Output: [${result.map(s => `"${s}"`).join(", ")}]`);
        } catch (error) {
            console.log(`Test ${index + 1} (${test.description}): ❌ ERROR - ${error.message}`);
        }
        console.log();
    });
    
    // Test error handling
    console.log("=== Testing Error Handling ===");
    try {
        groupAnagrams("not an array");
        console.log("❌ Error handling test failed - should have thrown error");
    } catch (error) {
        console.log("✅ Error handling test passed - correctly threw error");
    }
}

// Run the tests
console.log("Question 3: Anagram strings adjacency");
console.log("=====================================");
runTests();

// Example usage
console.log("Example usage:");
const example = ["eat", "tea", "tan", "ate", "nat", "bat"];
console.log(`Input: [${example.map(s => `"${s}"`).join(", ")}]`);
console.log(`Solution 1: [${groupAnagrams(example).map(s => `"${s}"`).join(", ")}]`);
console.log(`Solution 2: [${groupAnagramsByFrequency(example).map(s => `"${s}"`).join(", ")}]`);
console.log(`Solution 4: [${groupAnagramsPreserveOrder(example).map(s => `"${s}"`).join(", ")}]`);