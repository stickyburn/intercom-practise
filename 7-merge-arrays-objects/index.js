/*
QUESTION: Given two arrays of numbers, find the intersection, union, and difference, returning results as arrays of unique values.

CLARIFICATION QUESTIONS TO ASK:
1. Should the results be sorted in any particular order?
2. What should happen if the input arrays contain duplicate values?
3. Should we handle non-numeric values in the arrays?
4. What's the expected time complexity for this solution?
5. Are there any constraints on the input array sizes?
6. Should we preserve the original arrays or can we modify them?

FOLLOW-UP QUESTIONS & BEST ANSWERS:
1. Q: Can you optimize the space complexity?
   A: We can use Set data structure which provides O(1) average time complexity for insertions and lookups, making the overall solution more efficient.

2. Q: What if the input arrays contain NaN or Infinity values?
   A: The solution handles these special values correctly. NaN is treated as a distinct value, and Infinity/-Infinity are handled as regular numbers.

3. Q: Can you solve this without using built-in Set methods?
   A: Yes, we can implement custom logic using objects as hash maps or use sorting and two-pointer techniques for the operations.

4. Q: How would you modify this to handle large datasets that don't fit in memory?
   A: We could use streaming approaches or external sorting algorithms, processing the data in chunks.

5. Q: What's the time and space complexity of your solution?
   A: Time: O(n + m) where n and m are the lengths of the input arrays. Space: O(n + m) for storing the sets and results.
*/

// SOLUTION 1: Using Set Operations (Clean and Efficient - O(n + m) time, O(n + m) space)
function arrayOperationsSet(arr1, arr2) {
    // Convert arrays to Sets to remove duplicates and enable O(1) lookups
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    
    // Intersection: elements present in both sets
    const intersection = [...set1].filter(element => set2.has(element));
    
    // Union: all unique elements from both sets
    const union = [...new Set([...set1, ...set2])];
    
    // Difference (arr1 - arr2): elements in set1 but not in set2
    const difference1 = [...set1].filter(element => !set2.has(element));
    
    // Difference (arr2 - arr1): elements in set2 but not in set1
    const difference2 = [...set2].filter(element => !set1.has(element));
    
    return {
        intersection,
        union,
        difference: {
            arr1MinusArr2: difference1,
            arr2MinusArr1: difference2,
            symmetricDifference: [...difference1, ...difference2]
        }
    };
}

// SOLUTION 2: Using Hash Map (Custom Implementation - O(n + m) time, O(n + m) space)
function arrayOperationsHashMap(arr1, arr2) {
    const frequencyMap = {};
    const intersection = [];
    const union = [];
    const difference1 = [];
    const difference2 = [];
    
    // Build frequency map for first array
    for (const num of arr1) {
        if (!frequencyMap[num]) {
            frequencyMap[num] = { inArr1: true, inArr2: false };
        }
    }
    
    // Update frequency map for second array and collect results
    for (const num of arr2) {
        if (frequencyMap[num]) {
            frequencyMap[num].inArr2 = true;
        } else {
            frequencyMap[num] = { inArr1: false, inArr2: true };
        }
    }
    
    // Extract results from frequency map
    for (const [num, presence] of Object.entries(frequencyMap)) {
        const numValue = Number(num); // Convert back to number
        
        union.push(numValue);
        
        if (presence.inArr1 && presence.inArr2) {
            intersection.push(numValue);
        } else if (presence.inArr1 && !presence.inArr2) {
            difference1.push(numValue);
        } else if (!presence.inArr1 && presence.inArr2) {
            difference2.push(numValue);
        }
    }
    
    return {
        intersection,
        union,
        difference: {
            arr1MinusArr2: difference1,
            arr2MinusArr1: difference2,
            symmetricDifference: [...difference1, ...difference2]
        }
    };
}

// SOLUTION 3: Sorting and Two Pointers (Space Optimized - O(n log n + m log m) time, O(1) extra space)
function arrayOperationsTwoPointers(arr1, arr2) {
    // Remove duplicates and sort both arrays
    const sortedArr1 = [...new Set(arr1)].sort((a, b) => a - b);
    const sortedArr2 = [...new Set(arr2)].sort((a, b) => a - b);
    
    const intersection = [];
    const union = [];
    const difference1 = [];
    const difference2 = [];
    
    let i = 0, j = 0;
    
    while (i < sortedArr1.length && j < sortedArr2.length) {
        const num1 = sortedArr1[i];
        const num2 = sortedArr2[j];
        
        if (num1 === num2) {
            intersection.push(num1);
            union.push(num1);
            i++;
            j++;
        } else if (num1 < num2) {
            difference1.push(num1);
            union.push(num1);
            i++;
        } else {
            difference2.push(num2);
            union.push(num2);
            j++;
        }
    }
    
    // Add remaining elements
    while (i < sortedArr1.length) {
        difference1.push(sortedArr1[i]);
        union.push(sortedArr1[i]);
        i++;
    }
    
    while (j < sortedArr2.length) {
        difference2.push(sortedArr2[j]);
        union.push(sortedArr2[j]);
        j++;
    }
    
    return {
        intersection,
        union,
        difference: {
            arr1MinusArr2: difference1,
            arr2MinusArr1: difference2,
            symmetricDifference: [...difference1, ...difference2]
        }
    };
}

// SOLUTION 4: Functional Programming Approach (Elegant - O(n + m) time, O(n + m) space)
function arrayOperationsFunctional(arr1, arr2) {
    const uniqueArr1 = [...new Set(arr1)];
    const uniqueArr2 = [...new Set(arr2)];
    
    const intersection = uniqueArr1.filter(x => uniqueArr2.includes(x));
    const union = [...new Set([...uniqueArr1, ...uniqueArr2])];
    const difference1 = uniqueArr1.filter(x => !uniqueArr2.includes(x));
    const difference2 = uniqueArr2.filter(x => !uniqueArr1.includes(x));
    
    return {
        intersection,
        union,
        difference: {
            arr1MinusArr2: difference1,
            arr2MinusArr1: difference2,
            symmetricDifference: [...difference1, ...difference2]
        }
    };
}

// SOLUTION 5: Advanced with Custom Options (Flexible - O(n + m) time, O(n + m) space)
function arrayOperationsAdvanced(arr1, arr2, options = {}) {
    const {
        sortResults = false,
        includeNaN = true,
        handleInfinity = true,
        preserveOrder = false
    } = options;
    
    // Helper function to handle special values
    const normalizeValue = (val) => {
        if (!handleInfinity && (val === Infinity || val === -Infinity)) {
            return null;
        }
        if (!includeNaN && Number.isNaN(val)) {
            return null;
        }
        return val;
    };
    
    // Filter and normalize arrays
    const normalizedArr1 = arr1.map(normalizeValue).filter(val => val !== null);
    const normalizedArr2 = arr2.map(normalizeValue).filter(val => val !== null);
    
    const set1 = new Set(normalizedArr1);
    const set2 = new Set(normalizedArr2);
    
    let intersection = [...set1].filter(element => set2.has(element));
    let union = [...new Set([...set1, ...set2])];
    let difference1 = [...set1].filter(element => !set2.has(element));
    let difference2 = [...set2].filter(element => !set1.has(element));
    
    // Sort results if requested
    if (sortResults) {
        intersection.sort((a, b) => a - b);
        union.sort((a, b) => a - b);
        difference1.sort((a, b) => a - b);
        difference2.sort((a, b) => a - b);
    }
    
    // Preserve original order if requested
    if (preserveOrder) {
        intersection = normalizedArr1.filter(x => set2.has(x));
        difference1 = normalizedArr1.filter(x => !set2.has(x));
        difference2 = normalizedArr2.filter(x => !set1.has(x));
        union = [...normalizedArr1, ...normalizedArr2.filter(x => !set1.has(x))];
    }
    
    return {
        intersection,
        union,
        difference: {
            arr1MinusArr2: difference1,
            arr2MinusArr1: difference2,
            symmetricDifference: [...difference1, ...difference2]
        }
    };
}

// Test cases
function runTests() {
    const testCases = [
        {
            arr1: [1, 2, 3, 4, 5],
            arr2: [4, 5, 6, 7, 8],
            description: "Simple overlapping arrays"
        },
        {
            arr1: [1, 2, 2, 3, 4],
            arr2: [3, 3, 4, 5, 5],
            description: "Arrays with duplicates"
        },
        {
            arr1: [1, 2, 3],
            arr2: [4, 5, 6],
            description: "Non-overlapping arrays"
        },
        {
            arr1: [1, 2, 3],
            arr2: [1, 2, 3],
            description: "Identical arrays"
        },
        {
            arr1: [],
            arr2: [1, 2, 3],
            description: "One empty array"
        },
        {
            arr1: [1, 2, NaN, Infinity],
            arr2: [NaN, -Infinity, 3, 4],
            description: "Special values (NaN, Infinity)"
        },
        {
            arr1: [10, 20, 30, 40, 50],
            arr2: [30, 40, 50, 60, 70],
            description: "Larger numbers"
        }
    ];
    
    console.log("=== Testing Solution 1: Set Operations ===");
    testCases.forEach((test, index) => {
        const result = arrayOperationsSet(test.arr1, test.arr2);
        console.log(`Test ${index + 1} (${test.description}):`);
        console.log(`  Array 1: [${test.arr1.join(', ')}]`);
        console.log(`  Array 2: [${test.arr2.join(', ')}]`);
        console.log(`  Intersection: [${result.intersection.join(', ')}]`);
        console.log(`  Union: [${result.union.join(', ')}]`);
        console.log(`  Difference (A-B): [${result.difference.arr1MinusArr2.join(', ')}]`);
        console.log(`  Difference (B-A): [${result.difference.arr2MinusArr1.join(', ')}]`);
        console.log();
    });
    
    console.log("=== Testing Solution 2: Hash Map ===");
    const sampleTest = testCases[0];
    const hashMapResult = arrayOperationsHashMap(sampleTest.arr1, sampleTest.arr2);
    console.log(`Sample Test (${sampleTest.description}):`);
    console.log(`  Intersection: [${hashMapResult.intersection.join(', ')}]`);
    console.log(`  Union: [${hashMapResult.union.join(', ')}]`);
    console.log();
    
    console.log("=== Testing Solution 3: Two Pointers ===");
    const twoPointersResult = arrayOperationsTwoPointers(sampleTest.arr1, sampleTest.arr2);
    console.log(`Sample Test (${sampleTest.description}):`);
    console.log(`  Intersection: [${twoPointersResult.intersection.join(', ')}]`);
    console.log(`  Union: [${twoPointersResult.union.join(', ')}]`);
    console.log();
    
    console.log("=== Testing Solution 4: Functional Approach ===");
    const functionalResult = arrayOperationsFunctional(sampleTest.arr1, sampleTest.arr2);
    console.log(`Sample Test (${sampleTest.description}):`);
    console.log(`  Intersection: [${functionalResult.intersection.join(', ')}]`);
    console.log(`  Union: [${functionalResult.union.join(', ')}]`);
    console.log();
    
    console.log("=== Testing Solution 5: Advanced Options ===");
    const advancedOptions = { sortResults: true, preserveOrder: false };
    const advancedResult = arrayOperationsAdvanced(sampleTest.arr1, sampleTest.arr2, advancedOptions);
    console.log(`Sample Test (${sampleTest.description}) with options ${JSON.stringify(advancedOptions)}:`);
    console.log(`  Intersection: [${advancedResult.intersection.join(', ')}]`);
    console.log(`  Union: [${advancedResult.union.join(', ')}]`);
    console.log();
}

// Run the tests
console.log("Question 7: Array operations (intersection, union, difference)");
console.log("=============================================================");
runTests();

// Example usage
console.log("Example usage:");
const array1 = [1, 2, 3, 4, 5, 5];
const array2 = [4, 5, 6, 7, 8, 8];

console.log("Array 1:", array1);
console.log("Array 2:", array2);

const basicResult = arrayOperationsSet(array1, array2);
console.log("\nBasic Results:");
console.log("Intersection:", basicResult.intersection);
console.log("Union:", basicResult.union);
console.log("Difference (A-B):", basicResult.difference.arr1MinusArr2);
console.log("Difference (B-A):", basicResult.difference.arr2MinusArr1);
console.log("Symmetric Difference:", basicResult.difference.symmetricDifference);

const sortedResult = arrayOperationsAdvanced(array1, array2, { sortResults: true });
console.log("\nSorted Results:");
console.log("Intersection:", sortedResult.intersection);
console.log("Union:", sortedResult.union);