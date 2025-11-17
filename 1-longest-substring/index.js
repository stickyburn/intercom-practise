/*
QUESTION: Implement a function to find the longest substring without repeating characters.

CLARIFICATION QUESTIONS TO ASK:
1. What should be returned if the input string is empty? (Return 0 or empty string?)
2. Should I return the length of the longest substring or the substring itself?
3. Are we considering case sensitivity? (Is 'a' different from 'A'?)
4. What about Unicode characters? Should we handle multi-byte characters?
5. What's the expected time complexity for this solution?
6. Are there any constraints on the input size?

FOLLOW-UP QUESTIONS & BEST ANSWERS:
1. Q: Can you optimize the space complexity?
   A: The sliding window approach already uses O(min(n, m)) space where m is the character set size. 
      If we know the character set is limited (e.g., only ASCII), we can use a fixed-size array instead of a hash map.

2. Q: What if the input contains spaces or special characters?
   A: The solution handles all characters uniformly. Spaces and special characters are treated like any other character.

3. Q: Can you solve this without using extra data structures?
   A: We could use a brute-force O(n²) approach with nested loops, but this would be less efficient than the sliding window approach.

4. Q: How would you modify this to return all longest substrings if there are multiple?
   A: We can track all substrings of maximum length in an array during the sliding window process.

5. Q: What's the time and space complexity of your solution?
   A: Time: O(n) where n is the length of the string. Space: O(min(n, m)) where m is the size of the character set.
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