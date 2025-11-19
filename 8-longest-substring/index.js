/*
QUESTION: Longest Substring Without Repeating Characters (LeetCode 3)

Given a string s, return the length of the longest substring without repeating characters.

EXAMPLES
1) s = "abcabcbb"  ->  3  (longest substring: "abc")
2) s = "bbbbb"     ->  1  (longest substring: "b")
3) s = "pwwkew"    ->  3  (longest substrings: "wke" or "kew")
4) s = ""          ->  0

CLARIFYING QUESTIONS TO ASK (SENIOR PRODUCT ENGINEER)
1. What are the input constraints? (Max length of s, character set limitations: ASCII vs full Unicode?)
2. Do you want the length only, the substring itself, or both? (I’ll start with length and can extend to return the substring.)
3. How should we handle edge cases like empty strings, null/undefined, or whitespace-only input?
4. Are we optimizing purely for time (latency) or also for memory, given typical production traffic?
5. Is this expected to be a pure function (no side effects) that can safely run in a hot path?

BEST APPROACH TO LEAD WITH
- Sliding window with a hash map (`Map`) to track the last index of each character.
- Time: O(n), Space: O(min(n, m)) where m is the character set size.
- Implemented as `lengthOfLongestSubstring` (Solution 1) — this is the version I would code first in the interview.

OTHER APPROACHES TO DISCUSS / IMPLEMENT IF ASKED
- Brute force: O(n²) with nested loops and a per-start-index set (good to mention as a baseline, not to implement first).
- ASCII-optimized: fixed-size array instead of `Map` (`lengthOfLongestSubstringOptimized`).
- Variants that:
  - Return the actual substring (`longestSubstring`).
  - Use a more functional style (`lengthOfLongestSubstringFunctional`, `lengthOfLongestSubstringComposed`, `lengthOfLongestSubstringPipeline`).
*/

// SOLUTION 1: Sliding Window with Hash Map (Efficient - O(n) time, O(min(n,m)) space)
function lengthOfLongestSubstring(s) {
    const charMap = new Map();
    let left = 0;
    let maxLength = 0;
    
    for (let right = 0; right < s.length; right++) {
        const currentChar = s[right];
        
        // If character is already in the window, move left pointer
        if (charMap.has(currentChar) && charMap.get(currentChar) >= left) {
            left = charMap.get(currentChar) + 1;
        }
        
        // Update character position
        charMap.set(currentChar, right);
        
        // Update maximum length
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}

// SOLUTION 2: Optimized Sliding Window with Fixed Array (Most Optimal for ASCII)
function lengthOfLongestSubstringOptimized(s) {
    // Assuming ASCII character set (256 characters)
    const charIndex = new Array(256).fill(-1);
    let left = 0;
    let maxLength = 0;
    
    for (let right = 0; right < s.length; right++) {
        const charCode = s.charCodeAt(right);
        
        if (charIndex[charCode] >= left) {
            left = charIndex[charCode] + 1;
        }
        
        charIndex[charCode] = right;
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}

// SOLUTION 3: Return the actual longest substring instead of just length
/**
 * @param {string} s 
 * @returns 
 */
function longestSubstring(s) {
    const charMap = new Map();
    let left = 0;
    let maxLength = 0;
    let longestSubstr = "";
    
    for (let right = 0; right < s.length; right++) {
        const currentChar = s[right];
        
        // If character is already in the window, move left pointer
        if (charMap.has(currentChar) && charMap.get(currentChar) >= left) {
            left = charMap.get(currentChar) + 1;
        }
        
        // Update character position
        charMap.set(currentChar, right);
        
        // Update maximum length and substring if we found a longer one
        if (right - left + 1 > maxLength) {
            maxLength = right - left + 1;
            longestSubstr = s.substring(left, right + 1);
        }
    }
    
    return longestSubstr;
}

// SOLUTION 4: Functional Programming with Reduce (Declarative approach)
const lengthOfLongestSubstringFunctional = (s) => {
    if (typeof s !== 'string') {
        throw new Error("Input must be a string");
    }
    
    return s.split('').reduce((acc, char, index) => {
        const charIndex = acc.charMap.get(char);
        
        if (charIndex >= acc.left) {
            acc.left = charIndex + 1;
        }
        
        acc.charMap.set(char, index);
        acc.maxLength = Math.max(acc.maxLength, index - acc.left + 1);
        
        return acc;
    }, { left: 0, maxLength: 0, charMap: new Map() }).maxLength;
};

// SOLUTION 5: Functional with Composition (Composable functions)
const createCharMap = () => new Map();

const updateWindow = (state, char, index) => {
    const charIndex = state.charMap.get(char);
    const newLeft = charIndex >= state.left ? charIndex + 1 : state.left;
    
    return {
        left: newLeft,
        maxLength: Math.max(state.maxLength, index - newLeft + 1),
        charMap: new Map(state.charMap).set(char, index)
    };
};

const lengthOfLongestSubstringComposed = (s) => {
    if (typeof s !== 'string') {
        throw new Error("Input must be a string");
    }
    
    const initialState = { left: 0, maxLength: 0, charMap: createCharMap() };
    
    return s.split('').reduce((state, char, index) =>
        updateWindow(state, char, index), initialState
    ).maxLength;
};

// SOLUTION 6: Functional Pipeline with Early Termination
const lengthOfLongestSubstringPipeline = (s) => {
    if (typeof s !== 'string') {
        throw new Error("Input must be a string");
    }
    
    const validateString = (str) => {
        if (str.length === 0) return { valid: true, result: 0 };
        return { valid: true, result: null };
    };
    
    const processString = (str) => {
        const charMap = new Map();
        let left = 0;
        let maxLength = 0;
        
        for (let right = 0; right < str.length; right++) {
            const char = str[right];
            const charIndex = charMap.get(char);
            
            if (charIndex >= left) {
                left = charIndex + 1;
            }
            
            charMap.set(char, right);
            maxLength = Math.max(maxLength, right - left + 1);
        }
        
        return maxLength;
    };
    
    const validation = validateString(s);
    return validation.result !== null ? validation.result : processString(s);
};

// Test cases
function runTests() {
    const testCases = [
        { input: "abcabcbb", expected: 3, expectedStr: "abc", description: "Example 1" },
        { input: "bbbbb", expected: 1, expectedStr: "b", description: "Example 2" },
        { input: "pwwkew", expected: 3, expectedStr: "wke", description: "Example 3" },
        { input: "", expected: 0, expectedStr: "", description: "Empty string" },
        { input: " ", expected: 1, expectedStr: " ", description: "Single space" },
        { input: "au", expected: 2, expectedStr: "au", description: "Two different characters" },
        { input: "dvdf", expected: 3, expectedStr: "vdf", description: "Repeated character with gap" },
        { input: "abba", expected: 2, expectedStr: "ab", description: "Palindrome pattern" }
    ];
    
    console.log("=== Testing Solution 1: Sliding Window with Hash Map ===");
    testCases.forEach((test, index) => {
        const result = lengthOfLongestSubstring(test.input);
        const status = result === test.expected ? "✅ PASS" : "❌ FAIL";
        console.log(`Test ${index + 1} (${test.description}): ${status}`);
        console.log(`  Input: "${test.input}"`);
        console.log(`  Expected: ${test.expected}, Got: ${result}`);
        console.log();
    });
    
    console.log("=== Testing Solution 2: Optimized with Fixed Array ===");
    testCases.forEach((test, index) => {
        const result = lengthOfLongestSubstringOptimized(test.input);
        const status = result === test.expected ? "✅ PASS" : "❌ FAIL";
        console.log(`Test ${index + 1} (${test.description}): ${status}`);
        console.log(`  Input: "${test.input}"`);
        console.log(`  Expected: ${test.expected}, Got: ${result}`);
        console.log();
    });
    
    console.log("=== Testing Solution 3: Return Longest Substring ===");
    testCases.forEach((test, index) => {
        const result = longestSubstring(test.input);
        const resultLength = result.length;
        const status = resultLength === test.expected && result === test.expectedStr ? "✅ PASS" : "❌ FAIL";
        console.log(`Test ${index + 1} (${test.description}): ${status}`);
        console.log(`  Input: "${test.input}"`);
        console.log(`  Expected: "${test.expectedStr}" (length ${test.expected}), Got: "${result}" (length ${resultLength})`);
        console.log();
    });
}

// Run the tests
console.log("Question 1: Longest substring without repeating characters");
console.log("=========================================================");
runTests();

// Example usage
console.log("Example usage:");
console.log(`lengthOfLongestSubstring("abcabcbb") = ${lengthOfLongestSubstring("abcabcbb")}`);
console.log(`lengthOfLongestSubstringOptimized("abcabcbb") = ${lengthOfLongestSubstringOptimized("abcabcbb")}`);
console.log(`longestSubstring("abcabcbb") = "${longestSubstring("abcabcbb")}"`);