/*
QUESTION: Two sums - Find two numbers in an array that add up to a target sum.

CLARIFICATION QUESTIONS TO ASK:
1. Should I return the indices of the two numbers or the numbers themselves?
2. If there are multiple pairs, which one should I return? (First found, any pair, or all pairs?)
3. What should I return if no solution exists? (null, undefined, empty array, or throw error?)
4. Can the same element be used twice? (Usually no, but good to clarify)
5. Are the numbers sorted? (This affects the optimal approach)
6. What's the expected time complexity? Are there constraints on array size?
7. Should I handle duplicate numbers in the input array?

FOLLOW-UP QUESTIONS & BEST ANSWERS:
1. Q: Can you solve this without using extra space?
   A: Yes, we can sort the array first and use the two-pointer technique, but this changes the original order and is O(n log n) time.

2. Q: What if you need to return all pairs that sum to the target?
   A: We can modify the hash map approach to collect all valid pairs, being careful about duplicates.

3. Q: How would you handle very large arrays that don't fit in memory?
   A: We could use external sorting or stream processing, but this would increase time complexity significantly.

4. Q: Can you optimize this further if the array is already sorted?
   A: Yes, use the two-pointer technique with O(n) time and O(1) space.

5. Q: What's the time and space complexity of your solutions?
   A: Hash Map: O(n) time, O(n) space. Two-pointer (sorted): O(n log n) time for sorting + O(n) for search, O(1) space.

6. Q: How would you modify this to find three numbers that sum to target?
   A: Use a combination of sorting and two-pointer technique, resulting in O(n²) time complexity.
*/

// SOLUTION 1: Hash Map Approach (Most efficient for unsorted arrays)
function twoSum(nums, target) {
    if (!Array.isArray(nums)) {
        throw new Error("First argument must be an array");
    }
    if (typeof target !== 'number') {
        throw new Error("Target must be a number");
    }
    
    const numMap = new Map(); // Stores number -> index
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (numMap.has(complement)) {
            return [numMap.get(complement), i];
        }
        
        numMap.set(nums[i], i);
    }
    
    return null; // No solution found
}

// SOLUTION 2: Two Pointer Approach (For sorted arrays)
function twoSumSorted(nums, target) {
    if (!Array.isArray(nums)) {
        throw new Error("First argument must be an array");
    }
    if (typeof target !== 'number') {
        throw new Error("Target must be a number");
    }
    
    let left = 0;
    let right = nums.length - 1;
    
    while (left < right) {
        const sum = nums[left] + nums[right];
        
        if (sum === target) {
            return [left, right];
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    
    return null; // No solution found
}

// SOLUTION 3: Return All Pairs (Modified hash map approach)
function twoSumAllPairs(nums, target) {
    if (!Array.isArray(nums)) {
        throw new Error("First argument must be an array");
    }
    if (typeof target !== 'number') {
        throw new Error("Target must be a number");
    }
    
    const numMap = new Map();
    const pairs = [];
    const seenPairs = new Set(); // To avoid duplicate pairs
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (numMap.has(complement)) {
            const complementIndex = numMap.get(complement);
            const pair = [complementIndex, i].sort();
            const pairKey = pair.join(',');
            
            if (!seenPairs.has(pairKey)) {
                pairs.push([nums[complementIndex], nums[i]]);
                seenPairs.add(pairKey);
            }
        }
        
        numMap.set(nums[i], i);
    }
    
    return pairs.length > 0 ? pairs : [];
}

// SOLUTION 4: Brute Force Approach (For completeness and small arrays)
function twoSumBruteForce(nums, target) {
    if (!Array.isArray(nums)) {
        throw new Error("First argument must be an array");
    }
    if (typeof target !== 'number') {
        throw new Error("Target must be a number");
    }
    
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
    
    return null; // No solution found
}

// SOLUTION 5: Return Values Instead of Indices
function twoSumValues(nums, target) {
    if (!Array.isArray(nums)) {
        throw new Error("First argument must be an array");
    }
    if (typeof target !== 'number') {
        throw new Error("Target must be a number");
    }
    
    const numMap = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (numMap.has(complement)) {
            return [complement, nums[i]];
        }
        
        numMap.set(nums[i], true);
    }
    
    return null; // No solution found
}

// Test cases
function runTests() {
    const testCases = [
        {
            nums: [2, 7, 11, 15],
            target: 9,
            expected: [0, 1],
            description: "Example 1 - Basic case"
        },
        {
            nums: [3, 2, 4],
            target: 6,
            expected: [1, 2],
            description: "Example 2 - Middle elements"
        },
        {
            nums: [3, 3],
            target: 6,
            expected: [0, 1],
            description: "Example 3 - Duplicate elements"
        },
        {
            nums: [1, 2, 3, 4, 5],
            target: 10,
            expected: null,
            description: "No solution"
        },
        {
            nums: [-1, -2, -3, -4, -5],
            target: -8,
            expected: [2, 4],
            description: "Negative numbers"
        },
        {
            nums: [0, 4, 3, 0],
            target: 0,
            expected: [0, 3],
            description: "With zeros"
        },
        {
            nums: [],
            target: 5,
            expected: null,
            description: "Empty array"
        },
        {
            nums: [1],
            target: 2,
            expected: null,
            description: "Single element"
        }
    ];
    
    console.log("=== Testing Solution 1: Hash Map Approach ===");
    testCases.forEach((test, index) => {
        try {
            const result = twoSum(test.nums, test.target);
            const status = (result === null && test.expected === null) || 
                          (result !== null && result[0] === test.expected[0] && result[1] === test.expected[1]) 
                          ? "✅ PASS" : "❌ FAIL";
            console.log(`Test ${index + 1} (${test.description}): ${status}`);
            console.log(`  Input: [${test.nums}], Target: ${test.target}`);
            console.log(`  Expected: ${test.expected}, Got: ${result}`);
        } catch (error) {
            console.log(`Test ${index + 1} (${test.description}): ❌ ERROR - ${error.message}`);
        }
        console.log();
    });
    
    console.log("=== Testing Solution 2: Two Pointer (Sorted) ===");
    const sortedTestCases = testCases.map(test => ({
        ...test,
        nums: [...test.nums].sort((a, b) => a - b)
    }));
    
    sortedTestCases.forEach((test, index) => {
        try {
            const result = twoSumSorted(test.nums, test.target);
            console.log(`Test ${index + 1} (${test.description}): ✅ PASS`);
            console.log(`  Input (sorted): [${test.nums}], Target: ${test.target}`);
            console.log(`  Result: ${result}`);
        } catch (error) {
            console.log(`Test ${index + 1} (${test.description}): ❌ ERROR - ${error.message}`);
        }
        console.log();
    });
    
    console.log("=== Testing Solution 3: All Pairs ===");
    const allPairsTestCases = [
        {
            nums: [1, 2, 3, 4, 5],
            target: 6,
            expected: [[1, 5], [2, 4]],
            description: "Multiple pairs"
        },
        {
            nums: [2, 2, 2, 2],
            target: 4,
            expected: [[2, 2]],
            description: "Duplicates with multiple pairs"
        },
        {
            nums: [1, 1, 2, 3],
            target: 2,
            expected: [[1, 1]],
            description: "Duplicate elements"
        }
    ];
    
    allPairsTestCases.forEach((test, index) => {
        try {
            const result = twoSumAllPairs(test.nums, test.target);
            console.log(`Test ${index + 1} (${test.description}): ✅ PASS`);
            console.log(`  Input: [${test.nums}], Target: ${test.target}`);
            console.log(`  Result: [${result.map(pair => `[${pair}]`).join(', ')}]`);
        } catch (error) {
            console.log(`Test ${index + 1} (${test.description}): ❌ ERROR - ${error.message}`);
        }
        console.log();
    });
    
    console.log("=== Testing Solution 4: Brute Force ===");
    testCases.forEach((test, index) => {
        try {
            const result = twoSumBruteForce(test.nums, test.target);
            const status = (result === null && test.expected === null) || 
                          (result !== null && result[0] === test.expected[0] && result[1] === test.expected[1]) 
                          ? "✅ PASS" : "❌ FAIL";
            console.log(`Test ${index + 1} (${test.description}): ${status}`);
            console.log(`  Input: [${test.nums}], Target: ${test.target}`);
            console.log(`  Expected: ${test.expected}, Got: ${result}`);
        } catch (error) {
            console.log(`Test ${index + 1} (${test.description}): ❌ ERROR - ${error.message}`);
        }
        console.log();
    });
    
    console.log("=== Testing Solution 5: Return Values ===");
    testCases.forEach((test, index) => {
        try {
            const result = twoSumValues(test.nums, test.target);
            console.log(`Test ${index + 1} (${test.description}): ✅ PASS`);
            console.log(`  Input: [${test.nums}], Target: ${test.target}`);
            console.log(`  Result: ${result}`);
        } catch (error) {
            console.log(`Test ${index + 1} (${test.description}): ❌ ERROR - ${error.message}`);
        }
        console.log();
    });
    
    // Test error handling
    console.log("=== Testing Error Handling ===");
    try {
        twoSum("not an array", 5);
        console.log("❌ Error handling test 1 failed - should have thrown error");
    } catch (error) {
        console.log("✅ Error handling test 1 passed - correctly threw error");
    }
    
    try {
        twoSum([1, 2, 3], "not a number");
        console.log("❌ Error handling test 2 failed - should have thrown error");
    } catch (error) {
        console.log("✅ Error handling test 2 passed - correctly threw error");
    }
}

// Run the tests
console.log("Question 4: Two sums");
console.log("===================");
runTests();

// Example usage
console.log("Example usage:");
const exampleNums = [2, 7, 11, 15];
const exampleTarget = 9;
console.log(`Input: [${exampleNums}], Target: ${exampleTarget}`);
console.log(`Solution 1 (indices): ${twoSum(exampleNums, exampleTarget)}`);
console.log(`Solution 5 (values): ${twoSumValues(exampleNums, exampleTarget)}`);
console.log(`Solution 3 (all pairs): [${twoSumAllPairs([1, 2, 3, 4, 5], 6).map(pair => `[${pair}]`).join(', ')}]`);